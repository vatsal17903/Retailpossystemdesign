import { Card } from './ui/card';
import { Button } from './ui/button';
import {
  ShoppingCart,
  Clock,
  Package,
  Boxes,
  Users,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react';
import { Screen } from '../types';

interface MainMenuProps {
  employeeName: string;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export function MainMenu({ employeeName, onNavigate, onLogout }: MainMenuProps) {
  const menuItems = [
    {
      title: 'Cash Register',
      description: 'Process sales',
      icon: ShoppingCart,
      screen: 'cash-register' as Screen,
      color: 'bg-blue-500',
    },
    {
      title: 'Time Clock',
      description: 'Clock in/out',
      icon: Clock,
      screen: 'time-clock' as Screen,
      color: 'bg-green-500',
    },
    {
      title: 'Item Management',
      description: 'Manage products',
      icon: Package,
      screen: 'item-management' as Screen,
      color: 'bg-purple-500',
    },
    {
      title: 'Inventory',
      description: 'Stock & orders',
      icon: Boxes,
      screen: 'inventory' as Screen,
      color: 'bg-orange-500',
    },
    {
      title: 'Customer Loyalty',
      description: 'Customers & points',
      icon: Users,
      screen: 'customers' as Screen,
      color: 'bg-pink-500',
    },
    {
      title: 'Reports',
      description: 'Sales & analytics',
      icon: BarChart3,
      screen: 'reports' as Screen,
      color: 'bg-indigo-500',
    },
    {
      title: 'Back Office',
      description: 'Admin settings',
      icon: Settings,
      screen: 'back-office' as Screen,
      color: 'bg-gray-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1>Main Menu</h1>
            <p className="text-muted-foreground mt-1">Welcome back, {employeeName}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => onNavigate('end-shift')}>
              End Shift
            </Button>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card
                key={item.screen}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => onNavigate(item.screen)}
              >
                <div className="flex items-start gap-4">
                  <div className={`${item.color} p-3 rounded-xl text-white group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
