import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { User, EditUser } from '../../types/auth';

interface EditUserFormProps {
  user: User;
  onEditUser: (userId: string, user: EditUser) => void;
  onClose: () => void;
}

export const EditUserForm: React.FC<EditUserFormProps> = ({ user, onEditUser, onClose }) => {
  const [formData, setFormData] = useState<EditUser>({
    username: user.username,
    password: '',
    role: user.role,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username) {
      setError('Username is required');
      return;
    }
    onEditUser(user.id, formData);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-4 sm:p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg sm:text-xl font-semibold">Edit User</h3>
        <Button variant="secondary" onClick={onClose} className="text-sm p-2">
          ✕
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Username"
          type="text"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          placeholder="Enter username"
        />
        
        <Input
          label="New Password (leave empty to keep current)"
          type="password"
          value={formData.password || ''}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="Enter new password"
        />

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm bg-red-50 p-2 rounded"
          >
            {error}
          </motion.p>
        )}

        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" className="w-full sm:w-auto">
            Save Changes
          </Button>
        </div>
      </form>
    </motion.div>
  );
};