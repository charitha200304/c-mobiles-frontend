import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, Phone, ShieldCheck, User as UserIcon } from 'lucide-react';

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  avatar?: string;
  address: string;
  phone: string;
};

interface UserProfileProps {
  user: UserType;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onClose }) => {
  return (
    <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">User Profile</h2>
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
      </div>
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="text-xl font-semibold">{user.name}</div>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
              {user.role === 'admin' ? <ShieldCheck className="h-4 w-4 mr-1" /> : <UserIcon className="h-4 w-4 mr-1" />}
              {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'}
            </Badge>
            <Badge variant="secondary">{user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'N/A'}</Badge>
          </div>
        </div>
        <div className="w-full mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Address:</span>
            <span>{user.address}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Last Login:</span>
            <span>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
