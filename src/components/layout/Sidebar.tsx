
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, CreditCard, Bell, User, Settings, FileText, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userRole }) => {
  const userLinks = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'My Bills', path: '/bills', icon: <FileText className="h-5 w-5" /> },
    { name: 'Payment Requests', path: '/payment-requests', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Notifications', path: '/notifications', icon: <Bell className="h-5 w-5" /> },
    { name: 'Profile', path: '/profile', icon: <User className="h-5 w-5" /> },
  ];

  const adminLinks = [
    { name: 'Dashboard', path: '/admin', icon: <Home className="h-5 w-5" /> },
    { name: 'Users', path: '/admin/users', icon: <Users className="h-5 w-5" /> },
    { name: 'Bills', path: '/admin/bills', icon: <FileText className="h-5 w-5" /> },
    { name: 'Payments', path: '/admin/payments', icon: <CreditCard className="h-5 w-5" /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  const links = userRole === 'admin' ? adminLinks : userLinks;

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar transform transition-transform duration-300 ease-in-out md:relative",
      isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
    )}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-electric-blue flex items-center justify-center">
              <CreditCard className="h-4 w-4 text-white" />
            </div>
            <h1 className="text-lg font-semibold text-white">ElectroBill</h1>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden" 
            onClick={onClose}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "nav-link",
                    isActive && "active"
                  )
                }
                onClick={() => {
                  if (window.innerWidth < 768) {
                    onClose();
                  }
                }}
              >
                {link.icon}
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="p-4 border-t border-sidebar-border text-center text-xs text-muted-foreground">
          <p>ElectroBill Payment System</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
