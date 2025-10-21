import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Search, Home } from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) return null;

  return (
    <nav style={{ 
      background: '#3b82f6', 
      color: 'white', 
      padding: '1rem 0',
      borderBottom: '1px solid #2563eb'
    }}>
      <div className="container flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">SkillSwap</h1>
          <div className="flex space-x-4">
            <a 
              href="/dashboard" 
              className="flex items-center space-x-2 text-white hover:text-blue-200"
              style={{ textDecoration: 'none' }}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </a>
            <a 
              href="/search" 
              className="flex items-center space-x-2 text-white hover:text-blue-200"
              style={{ textDecoration: 'none' }}
            >
              <Search size={18} />
              <span>Search</span>
            </a>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="/profile" 
            className="flex items-center space-x-2 text-white hover:text-blue-200"
            style={{ textDecoration: 'none' }}
          >
            <User size={18} />
            <span>{user?.name}</span>
          </a>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-white hover:text-blue-200"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;