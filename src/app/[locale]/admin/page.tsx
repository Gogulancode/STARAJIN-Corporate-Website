'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import { 
  Users, 
  FileText, 
  Settings, 
  BarChart3, 
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  Save
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, validate against backend
    if (loginForm.email === 'admin@starajin.com' && loginForm.password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Use admin@starajin.com / admin123 for demo');
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full mx-4"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                  placeholder="admin@starajin.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
                  placeholder="admin123"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-3 bg-[#004aad] text-white font-semibold rounded-lg hover:bg-[#003a8c] transition-colors"
              >
                Sign In
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-600 text-center">
              Demo credentials: admin@starajin.com / admin123
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'content', label: 'Content Management', icon: FileText },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'news', label: 'News Keywords', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockProjects = [
    { id: 1, title: 'Samsung-Tata Partnership', status: 'Active', date: '2024-01-15' },
    { id: 2, title: 'LG India Expansion', status: 'Completed', date: '2024-01-10' },
    { id: 3, title: 'Hyundai Cultural Exchange', status: 'In Progress', date: '2024-01-08' },
  ];

  const mockNewsKeywords = [
    { id: 1, keyword: 'Korea India Trade', active: true, lastScraped: '2024-01-15 14:30' },
    { id: 2, keyword: 'Korean Startups India', active: true, lastScraped: '2024-01-15 14:30' },
    { id: 3, keyword: 'K-Culture India', active: false, lastScraped: '2024-01-14 12:00' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-3xl font-bold text-[#004aad]">156</div>
                <div className="text-gray-600">Total Projects</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-3xl font-bold text-green-600">89</div>
                <div className="text-gray-600">Active Clients</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-3xl font-bold text-blue-600">234</div>
                <div className="text-gray-600">News Articles</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <div className="text-3xl font-bold text-purple-600">12</div>
                <div className="text-gray-600">Team Members</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold">Recent Projects</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockProjects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{project.title}</div>
                        <div className="text-sm text-gray-500">{project.date}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Active' ? 'bg-green-100 text-green-800' :
                          project.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <Eye size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'content':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Content Management</h2>
                <button className="px-4 py-2 bg-[#004aad] text-white rounded-lg hover:bg-[#003a8c] flex items-center">
                  <Plus size={16} className="mr-2" />
                  Add Content
                </button>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Homepage Hero</h3>
                    <p className="text-sm text-gray-600 mb-4">Main hero section content</p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center">
                        <Eye size={14} className="mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">Services Section</h3>
                    <p className="text-sm text-gray-600 mb-4">Service descriptions and details</p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center">
                        <Eye size={14} className="mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-medium mb-2">About Us</h3>
                    <p className="text-sm text-gray-600 mb-4">Company information and team</p>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-sm flex items-center">
                        <Edit size={14} className="mr-1" />
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm flex items-center">
                        <Eye size={14} className="mr-1" />
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'news':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-6 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">News Scraper Keywords</h2>
                <button className="px-4 py-2 bg-[#004aad] text-white rounded-lg hover:bg-[#003a8c] flex items-center">
                  <Plus size={16} className="mr-2" />
                  Add Keyword
                </button>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {mockNewsKeywords.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.keyword}</div>
                        <div className="text-sm text-gray-500">Last scraped: {item.lastScraped}</div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {item.active ? 'Active' : 'Inactive'}
                        </span>
                        <button className="p-2 hover:bg-gray-200 rounded-lg">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-gray-200 rounded-lg text-red-600">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Content for {activeTab}</div>;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6">
                  <nav className="space-y-2">
                    {menuItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTab(item.id)}
                          className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                            activeTab === item.id
                              ? 'bg-[#004aad] text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          <Icon size={20} className="mr-3" />
                          {item.label}
                        </button>
                      );
                    })}
                  </nav>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}