
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, UserPlus, Edit, Trash, Mail } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const initialUsers = [
  { id: 'USR-1001', name: 'John Doe', email: 'john.doe@example.com', status: 'active', meterNumber: 'EM12345678', joined: '2023-05-15', pendingAmount: 2450 },
  { id: 'USR-1002', name: 'Jane Smith', email: 'jane.smith@example.com', status: 'active', meterNumber: 'EM87654321', joined: '2023-06-22', pendingAmount: 1820 },
  { id: 'USR-1003', name: 'Robert Johnson', email: 'robert.j@example.com', status: 'inactive', meterNumber: 'EM23456789', joined: '2023-04-08', pendingAmount: 0 },
  { id: 'USR-1004', name: 'Emily Davis', email: 'emily.d@example.com', status: 'active', meterNumber: 'EM34567890', joined: '2023-07-30', pendingAmount: 3250 },
  { id: 'USR-1005', name: 'Michael Wilson', email: 'michael.w@example.com', status: 'suspended', meterNumber: 'EM45678901', joined: '2023-03-12', pendingAmount: 4750 },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("edit");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active',
    meterNumber: ''
  });
  const [billRequestData, setBillRequestData] = useState({
    amount: '',
    dueDate: '',
    description: 'Monthly Electricity Bill'
  });
  const { toast } = useToast();

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.meterNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBillInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setBillRequestData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      status: e.target.value
    }));
  };

  const handleAddUser = () => {
    setUserToEdit(null);
    setFormData({
      name: '',
      email: '',
      status: 'active',
      meterNumber: ''
    });
    setActiveTab("edit");
    setIsDialogOpen(true);
  };

  const handleEditUser = (user: any) => {
    setUserToEdit(user);
    setFormData({
      name: user.name,
      email: user.email,
      status: user.status,
      meterNumber: user.meterNumber
    });
    setBillRequestData({
      amount: user.pendingAmount ? user.pendingAmount.toString() : '',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due in 7 days
      description: 'Monthly Electricity Bill'
    });
    setActiveTab("edit");
    setIsDialogOpen(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
      toast({
        title: "User Deleted",
        description: `User ID: ${userId} has been deleted.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userToEdit) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === userToEdit.id 
          ? { ...user, ...formData } 
          : user
      ));
      toast({
        title: "User Updated",
        description: `User ${formData.name} has been updated.`,
      });
    } else {
      // Add new user
      const newUser = {
        id: `USR-${Math.floor(1000 + Math.random() * 9000)}`,
        name: formData.name,
        email: formData.email,
        status: formData.status,
        meterNumber: formData.meterNumber,
        joined: new Date().toISOString().split('T')[0],
        pendingAmount: 0
      };
      setUsers([...users, newUser]);
      toast({
        title: "User Added",
        description: `User ${formData.name} has been added.`,
      });
    }
    
    setIsDialogOpen(false);
  };

  const handleSendBillRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userToEdit) return;
    
    // In a real app, this would send a notification through a backend service
    // For now, we'll simulate it with a toast notification and update the user's pending amount
    
    const amount = parseFloat(billRequestData.amount);
    
    if (isNaN(amount) || amount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than zero.",
      });
      return;
    }
    
    // Update user's pending amount
    setUsers(users.map(user => 
      user.id === userToEdit.id 
        ? { ...user, pendingAmount: amount } 
        : user
    ));
    
    toast({
      title: "Bill Request Sent",
      description: `Payment request of ₹${parseFloat(billRequestData.amount).toLocaleString('en-IN')} has been sent to ${userToEdit.name}.`,
      action: (
        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <Mail className="h-5 w-5 text-green-500" />
        </div>
      ),
    });
    
    setIsDialogOpen(false);
  };

  const openSendBillRequest = (user: any) => {
    setUserToEdit(user);
    setBillRequestData({
      amount: user.pendingAmount ? user.pendingAmount.toString() : '',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Due in 7 days
      description: 'Monthly Electricity Bill'
    });
    setActiveTab("bill");
    setIsDialogOpen(true);
  };

  return (
    <Card className="card-glass w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl font-semibold text-gradient">User Management</CardTitle>
            <CardDescription>Manage customer accounts and access</CardDescription>
          </div>
          <Button onClick={handleAddUser}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center pb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 bg-secondary/50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-secondary/50">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Meter Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Pending Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.meterNumber}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={
                          user.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : user.status === 'inactive'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-destructive/20 text-destructive'
                        }
                      >
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.pendingAmount > 0 ? (
                        <span className="text-destructive font-medium">
                          ₹{user.pendingAmount.toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-green-500">₹0</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openSendBillRequest(user)}
                        title="Send Bill Request"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="card-glass sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {userToEdit ? (
                activeTab === "edit" ? 'Edit User' : 'Send Bill Request'
              ) : (
                'Add New User'
              )}
            </DialogTitle>
            <DialogDescription>
              {userToEdit ? (
                activeTab === "edit" 
                  ? `Update information for user ${userToEdit.id}`
                  : `Send a bill payment request to ${userToEdit.name}`
              ) : (
                'Fill out the form below to create a new user account'
              )}
            </DialogDescription>
          </DialogHeader>
          
          {userToEdit && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="edit">Edit User</TabsTrigger>
                <TabsTrigger value="bill">Bill Request</TabsTrigger>
              </TabsList>
            </Tabs>
          )}
          
          <TabsContent value="edit" className={activeTab !== "edit" && userToEdit ? "hidden" : ""}>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="meterNumber">Meter Number</Label>
                  <Input
                    id="meterNumber"
                    name="meterNumber"
                    value={formData.meterNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleStatusChange}
                    className="flex h-10 w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  {userToEdit ? 'Update User' : 'Add User'}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="bill" className={activeTab !== "bill" || !userToEdit ? "hidden" : ""}>
            <form onSubmit={handleSendBillRequest}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Bill Amount (₹)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={billRequestData.amount}
                    onChange={handleBillInputChange}
                    placeholder="Enter amount in INR"
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    value={billRequestData.dueDate}
                    onChange={handleBillInputChange}
                    required
                    className="bg-secondary/50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    name="description"
                    value={billRequestData.description}
                    onChange={handleBillInputChange}
                    rows={3}
                    required
                    className="flex w-full rounded-md border border-input bg-secondary/50 px-3 py-2 text-sm text-foreground"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">
                  Send Payment Request
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserManagement;
