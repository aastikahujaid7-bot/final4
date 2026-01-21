import { Shield, BookOpen, Wrench, Bot, Trophy, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const { user, signOut } = useAuth();

  const tabs = [
    { id: 'labs', label: 'Vulnerability Labs', icon: Shield },
    { id: 'tools', label: 'Security Tools', icon: Wrench },
    { id: 'learn', label: 'Learning Path', icon: BookOpen },
    { id: 'progress', label: 'Progress', icon: Trophy },
    { id: 'assistant', label: 'AI Assistant', icon: Bot },
  ];

  const handleSignOut = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await signOut();
    }
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-400" />
            <span className="text-xl font-bold">CyberSec Academy</span>
          </div>
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
            <div className="ml-4 flex items-center space-x-3 pl-4 border-l border-gray-700">
              <div className="flex items-center space-x-2 text-gray-300">
                <User className="h-5 w-5" />
                <span className="hidden md:inline text-sm">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-all"
                title="Sign Out"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
