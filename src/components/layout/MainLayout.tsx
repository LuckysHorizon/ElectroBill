
import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useToast } from "@/components/ui/use-toast";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) {
      // If not on auth pages, redirect to login
      if (!['/login', '/register', '/'].includes(location.pathname)) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "Please log in to access this page",
        });
        navigate('/login');
      }
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [location.pathname]);

  // Close sidebar on mobile when location changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {user && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)}
          userRole={user?.role || 'user'}
        />
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {user && <Navbar onToggleSidebar={toggleSidebar} user={user} />}
        
        <main className={`flex-1 overflow-y-auto p-4 sm:p-6 transition-all duration-300 ${(user && !isSidebarOpen) ? 'ml-0' : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
