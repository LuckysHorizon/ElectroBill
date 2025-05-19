
import React from 'react';
import UserManagement from '@/components/admin/UserManagement';

const AdminUsers = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">
          Manage user accounts and permissions
        </p>
      </div>
      
      <div className="card-glass p-6 rounded-lg">
        <UserManagement />
      </div>
    </div>
  );
};

export default AdminUsers;
