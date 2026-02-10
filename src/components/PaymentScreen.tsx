import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { CheckCircle2, CreditCard, DollarSign, SplitSquare } from 'lucide-react';
import { CartItem } from '../types';

interface PaymentScreenProps {
  cart: CartItem[];
  total: number;
  paymentType: 'cash' | 'card';
  onComplete: () => void;
  onCancel: () => void;
}

export function PaymentScreen({ cart, total, paymentType, onComplete, onCancel }: PaymentScreenProps) {
  const [cashReceived, setCashReceived] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const change = cashReceived ? Math.max(0, parseFloat(cashReceived) - total) : 0;

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }, 1500);
  };

  const quickCash = [20, 50, 100];

  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100">
        <Card className="w-full max-w-md p-8 text-center shadow-xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
          <h2 className="mb-2">Payment Successful!</h2>
          <p className="text-muted-foreground mb-6">Transaction completed</p>
          {paymentType === 'cash' && change > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-muted-foreground">Change Due</p>
              <p className="text-3xl text-yellow-800">${change.toFixed(2)}</p>
            </div>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-lg p-8 shadow-xl">
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            paymentType === 'cash' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {paymentType === 'cash' ? (
              <DollarSign className="w-8 h-8 text-white" />
            ) : (
              <CreditCard className="w-8 h-8 text-white" />
            )}
          </div>
          <h2 className="mb-2">
            {paymentType === 'cash' ? 'Cash Payment' : 'Card Payment'}
          </h2>
          <p className="text-4xl mb-2">${total.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {paymentType === 'cash' ? (
          <div className="space-y-6">
            <div>
              <Label htmlFor="cash-received">Cash Received</Label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  $
                </span>
                <Input
                  id="cash-received"
                  type="number"
                  step="0.01"
                  value={cashReceived}
                  onChange={(e) => setCashReceived(e.target.value)}
                  className="pl-8 h-14 text-xl"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Quick Amounts</Label>
              <div className="grid grid-cols-3 gap-3">
                {quickCash.map((amount) => (
                  <Button
                    key={amount}
                    variant="outline"
                    className="h-12"
                    onClick={() => setCashReceived(amount.toString())}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
            </div>

            {cashReceived && parseFloat(cashReceived) >= total && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Change Due</span>
                  <span className="text-2xl text-green-700">
                    ${change.toFixed(2)}
                  </span>
                </div>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={handlePayment}
                disabled={!cashReceived || parseFloat(cashReceived) < total || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Complete Payment'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Card className="p-6 bg-blue-50 border-blue-200 text-center">
              <CreditCard className="w-12 h-12 mx-auto mb-3 text-blue-600" />
              <p className="text-muted-foreground mb-2">
                Insert, tap, or swipe card
              </p>
              <p className="text-sm text-muted-foreground">
                Waiting for card reader...
              </p>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 h-12"
                onClick={handlePayment}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Process Card'}
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
