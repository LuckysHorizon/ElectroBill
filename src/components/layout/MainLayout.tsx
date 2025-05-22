
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { user, profile } = useAuth();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if user is logged in
    if (!user) {
      // If not on auth pages, redirect to login
      if (!['/login', '/register', '/', '/contact-developer'].includes(location.pathname)) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to access this page",
        });
        navigate('/login', { replace: true });
      }
    } else {
      // If user is logged in and tries to access login/register pages
      if (['/login', '/register'].includes(location.pathname)) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [location.pathname, user, navigate, toast]);

  // Close sidebar on mobile when location changes
  useEffect(() => {
    setIsSidebarOpen(false);
    
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [location.pathname]);

  // Create a formatted user object for Navbar with proper types
  const userForNav = user ? {
    name: profile?.full_name || (user.email ? user.email.split('@')[0] : 'User'),
    email: user.email || '',
    role: profile?.role || 'user'
  } : null;

  const isPublicPage = ['/contact-developer'].includes(location.pathname);

  return (
    <div className="flex h-screen overflow-hidden">
      {user && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          userRole={profile?.role || 'user'}
        />
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar 
          onToggleSidebar={toggleSidebar} 
          user={userForNav}
          showAuthButtons={isPublicPage && !user}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
