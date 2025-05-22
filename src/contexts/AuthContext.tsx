
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: any) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Set up the auth listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        // Fetch profile data if user is logged in
        if (currentSession?.user) {
          // Use setTimeout to avoid potential deadlock
          setTimeout(() => fetchUserProfile(currentSession.user.id), 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Got existing session:', currentSession ? 'yes' : 'no');
      
      setSession(currentSession);
      setUser(currentSession?.user ?? null);

      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch the user's profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        console.log('Profile data retrieved:', data);
        setProfile(data);
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log('Signing in with:', email);
      
      // Check for specific admin credentials
      if (email === 'admin@example.com' && password === 'Lucky@0716') {
        // Special handling for admin login
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) {
          // If admin user doesn't exist yet, create it
          if (error.message.includes("Invalid login credentials")) {
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
              email,
              password,
              options: {
                data: {
                  full_name: 'System Administrator',
                }
              }
            });
            
            if (signUpError) {
              toast({
                variant: "destructive",
                title: "Admin setup failed",
                description: signUpError.message,
              });
              return;
            }
            
            // If admin user created successfully, try logging in again
            if (signUpData.user) {
              const { data: adminData, error: adminError } = await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', signUpData.user.id);
                
              if (adminError) {
                console.error('Error setting admin role:', adminError);
              }
              
              // Now sign in as admin
              const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email,
                password
              });
              
              if (signInError) {
                toast({
                  variant: "destructive",
                  title: "Admin login failed",
                  description: signInError.message,
                });
                return;
              }
              
              // Admin successfully created and signed in
              toast({
                title: "Admin account created",
                description: "Administrator account has been created and logged in.",
              });
              
              navigate('/admin');
              return;
            }
          } else {
            toast({
              variant: "destructive",
              title: "Login failed",
              description: error.message,
            });
            return;
          }
        }
        
        // Admin login successful
        if (data.user) {
          // Check if user has admin role, if not, update it
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();
            
          if (!profileError && profileData && profileData.role !== 'admin') {
            // Update user role to admin
            await supabase
              .from('profiles')
              .update({ role: 'admin' })
              .eq('id', data.user.id);
          }
          
          setProfile({ ...profileData, role: 'admin' });
          navigate('/admin');
          
          toast({
            title: "Admin login successful",
            description: "Welcome back, Administrator!",
          });
          return;
        }
      }
      
      // Regular user login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: error.message,
        });
        console.error('Error signing in:', error);
        return;
      }

      if (data.user) {
        console.log('Sign in successful, user:', data.user.id);
        
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching profile after login:', profileError);
        }
        
        if (profileData) {
          setProfile(profileData);
          
          if (profileData.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/dashboard');
          }
          
          toast({
            title: "Successfully logged in",
            description: `Welcome back, ${profileData.full_name || 'User'}!`,
          });
        } else {
          // Navigate even if profile fetch failed
          navigate('/dashboard');
          toast({
            title: "Successfully logged in",
            description: "Welcome back!",
          });
        }
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        variant: "destructive",
        title: "Login error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      setLoading(true);
      console.log('Signing up with:', email, 'and user data:', userData);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.name,
            address: userData.address,
            meterNumber: userData.meterNumber
          }
        }
      });

      if (error) {
        toast({
          variant: "destructive",
          title: "Registration failed",
          description: error.message,
        });
        return;
      }

      // Check if we need email confirmation
      if (data.user && data.session) {
        // If email confirmation is disabled, log the user in
        toast({
          title: "Registration successful",
          description: "Your account has been created. You can now log in.",
        });
        navigate('/login');
      } else {
        toast({
          title: "Confirm your email",
          description: "We've sent you a confirmation email. Please check your inbox.",
        });
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        variant: "destructive",
        title: "Registration error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error signing out",
          description: error.message,
        });
        return;
      }
      
      navigate('/');
      toast({
        title: "Signed out successfully",
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        signIn,
        signUp,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
