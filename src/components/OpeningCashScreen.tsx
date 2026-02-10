import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { DollarSign } from 'lucide-react';

interface OpeningCashScreenProps {
  employeeName: string;
  onStartShift: (openingCash: number) => void;
}

export function OpeningCashScreen({ employeeName, onStartShift }: OpeningCashScreenProps) {
  const [openingCash, setOpeningCash] = useState('200.00');

  const handleStartShift = () => {
    const amount = parseFloat(openingCash) || 0;
    onStartShift(amount);
  };

  const quickAmounts = [100, 200, 300, 500];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <h2 className="mb-2">Opening Cash Drawer</h2>
          <p className="text-muted-foreground">Hello, {employeeName}</p>
        </div>

        <div className="space-y-6">
          <div>
            <Label htmlFor="opening-cash">Opening Cash Amount</Label>
            <div className="relative mt-2">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <Input
                id="opening-cash"
                type="number"
                step="0.01"
                value={openingCash}
                onChange={(e) => setOpeningCash(e.target.value)}
                className="pl-8 h-14 text-xl"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Quick Amounts</Label>
            <div className="grid grid-cols-2 gap-3">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  className="h-12"
                  onClick={() => setOpeningCash(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>

          <Button
            className="w-full h-14 mt-6"
            onClick={handleStartShift}
            disabled={!openingCash || parseFloat(openingCash) <= 0}
          >
            Start Shift
          </Button>
        </div>
      </Card>
    </div>
  );
}
