import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { User } from 'lucide-react';
import { Employee } from '../types';

interface LoginScreenProps {
  employees: Employee[];
  onLogin: (employee: Employee) => void;
}

export function LoginScreen({ employees, onLogin }: LoginScreenProps) {
  const [pin, setPin] = useState('');
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [error, setError] = useState('');

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      
      if (newPin.length === 4) {
        const foundEmployee = employees.find(emp => emp.pin === newPin);
        if (foundEmployee) {
          setEmployee(foundEmployee);
          setError('');
        } else {
          setError('Invalid PIN');
          setTimeout(() => {
            setPin('');
            setError('');
          }, 1500);
        }
      }
    }
  };

  const handleClear = () => {
    setPin('');
    setEmployee(null);
    setError('');
  };

  const handleSignIn = () => {
    if (employee) {
      onLogin(employee);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <User className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="mb-2">POS System</h1>
          <p className="text-muted-foreground">Enter your PIN to continue</p>
        </div>

        {employee && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-green-800">Welcome, {employee.name}</p>
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center justify-center gap-2 mb-6 h-12">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-all ${
                  i < pin.length
                    ? 'bg-primary border-primary'
                    : 'bg-white border-gray-300'
                }`}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'Clear', '0', '←'].map((num) => (
              <Button
                key={num}
                variant={num === 'Clear' || num === '←' ? 'outline' : 'secondary'}
                className="h-16 text-xl"
                onClick={() => {
                  if (num === 'Clear') handleClear();
                  else if (num === '←') setPin(pin.slice(0, -1));
                  else handleNumberClick(num);
                }}
              >
                {num}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Button
            className="w-full h-12"
            onClick={handleSignIn}
            disabled={!employee}
          >
            Sign In
          </Button>
        </div>
      </Card>
    </div>
  );
}
