import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { DollarSign, Printer, CheckCircle2 } from 'lucide-react';

interface EndShiftScreenProps {
  openingCash: number;
  expectedCash: number;
  totalSales: number;
  onEndShift: (closingCash: number) => void;
  onCancel: () => void;
}

export function EndShiftScreen({
  openingCash,
  expectedCash,
  totalSales,
  onEndShift,
  onCancel,
}: EndShiftScreenProps) {
  const [denominations, setDenominations] = useState({
    hundreds: 0,
    fifties: 0,
    twenties: 0,
    tens: 0,
    fives: 0,
    ones: 0,
    quarters: 0,
    dimes: 0,
    nickels: 0,
    pennies: 0,
  });

  const updateDenomination = (key: keyof typeof denominations, value: string) => {
    setDenominations({
      ...denominations,
      [key]: parseInt(value) || 0,
    });
  };

  const denominationValues = {
    hundreds: 100,
    fifties: 50,
    twenties: 20,
    tens: 10,
    fives: 5,
    ones: 1,
    quarters: 0.25,
    dimes: 0.10,
    nickels: 0.05,
    pennies: 0.01,
  };

  const countedCash = Object.entries(denominations).reduce((total, [key, count]) => {
    return total + count * denominationValues[key as keyof typeof denominationValues];
  }, 0);

  const variance = countedCash - expectedCash;

  const handleEndShift = () => {
    onEndShift(countedCash);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1>End Shift - Cash Reconciliation</h1>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cash Count */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h3 className="mb-4">Count Cash Drawer</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="mb-3">Bills</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'hundreds', label: '$100', value: 100 },
                      { key: 'fifties', label: '$50', value: 50 },
                      { key: 'twenties', label: '$20', value: 20 },
                      { key: 'tens', label: '$10', value: 10 },
                      { key: 'fives', label: '$5', value: 5 },
                      { key: 'ones', label: '$1', value: 1 },
                    ].map(({ key, label, value }) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-sm">
                          {label} × 
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            id={key}
                            type="number"
                            min="0"
                            value={denominations[key as keyof typeof denominations]}
                            onChange={(e) => updateDenomination(key as keyof typeof denominations, e.target.value)}
                            className="h-10"
                          />
                          <span className="text-sm text-muted-foreground w-20">
                            = ${(denominations[key as keyof typeof denominations] * value).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="mb-3">Coins</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { key: 'quarters', label: 'Quarters', value: 0.25 },
                      { key: 'dimes', label: 'Dimes', value: 0.10 },
                      { key: 'nickels', label: 'Nickels', value: 0.05 },
                      { key: 'pennies', label: 'Pennies', value: 0.01 },
                    ].map(({ key, label, value }) => (
                      <div key={key}>
                        <Label htmlFor={key} className="text-sm">
                          {label} × 
                        </Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Input
                            id={key}
                            type="number"
                            min="0"
                            value={denominations[key as keyof typeof denominations]}
                            onChange={(e) => updateDenomination(key as keyof typeof denominations, e.target.value)}
                            className="h-10"
                          />
                          <span className="text-sm text-muted-foreground w-20">
                            = ${(denominations[key as keyof typeof denominations] * value).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Summary */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Opening Cash</span>
                  <span className="text-sm">${openingCash.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Sales</span>
                  <span className="text-sm">${totalSales.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Cash</span>
                  <span>${expectedCash.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Counted Cash</span>
                  <span className="text-xl">${countedCash.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span>Variance</span>
                  <span className={`text-xl ${
                    variance > 0 ? 'text-green-600' : variance < 0 ? 'text-red-600' : ''
                  }`}>
                    {variance >= 0 ? '+' : ''}${variance.toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print Report
              </Button>
              <Button
                className="w-full h-12"
                onClick={handleEndShift}
                disabled={countedCash === 0}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                End Shift
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
