import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, TrendingUp, DollarSign, ShoppingCart, Users } from 'lucide-react';
import { Transaction } from '../types';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ReportsProps {
  transactions: Transaction[];
  onBack: () => void;
}

export function Reports({ transactions, onBack }: ReportsProps) {
  const today = new Date();
  const todayTransactions = transactions.filter(
    (t) => t.timestamp.toDateString() === today.toDateString()
  );

  const totalSales = todayTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = todayTransactions.length;
  const cashSales = todayTransactions
    .filter((t) => t.paymentMethod === 'cash')
    .reduce((sum, t) => sum + t.total, 0);
  const cardSales = todayTransactions
    .filter((t) => t.paymentMethod === 'card')
    .reduce((sum, t) => sum + t.total, 0);

  // Hourly sales data
  const hourlySales = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 8;
    const sales = todayTransactions
      .filter((t) => t.timestamp.getHours() === hour)
      .reduce((sum, t) => sum + t.total, 0);
    return {
      hour: `${hour}:00`,
      sales: parseFloat(sales.toFixed(2)),
    };
  });

  // Payment method breakdown
  const paymentData = [
    { name: 'Cash', value: cashSales, color: '#10b981' },
    { name: 'Card', value: cardSales, color: '#3b82f6' },
  ];

  // Top products
  const productSales = new Map<string, { quantity: number; revenue: number }>();
  todayTransactions.forEach((t) => {
    t.items.forEach((item) => {
      const existing = productSales.get(item.product.name) || { quantity: 0, revenue: 0 };
      productSales.set(item.product.name, {
        quantity: existing.quantity + item.quantity,
        revenue: existing.revenue + item.totalPrice,
      });
    });
  });

  const topProducts = Array.from(productSales.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1>Reports & Analytics</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Today's Sales</p>
                <p className="text-2xl">${totalSales.toFixed(2)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Transactions</p>
                <p className="text-2xl">{totalTransactions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                <p className="text-2xl">
                  ${totalTransactions > 0 ? (totalSales / totalTransactions).toFixed(2) : '0.00'}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Items Sold</p>
                <p className="text-2xl">
                  {todayTransactions.reduce((sum, t) => 
                    sum + t.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
                  )}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="hourly" className="space-y-6">
          <TabsList>
            <TabsTrigger value="hourly">Hourly Sales</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
            <TabsTrigger value="products">Top Products</TabsTrigger>
          </TabsList>

          <TabsContent value="hourly">
            <Card className="p-6">
              <h3 className="mb-6">Hourly Sales Breakdown</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={hourlySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="Sales ($)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-6">Payment Method Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {paymentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6">Payment Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Cash Payments</p>
                      <p className="text-2xl">${cashSales.toFixed(2)}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {todayTransactions.filter((t) => t.paymentMethod === 'cash').length} transactions
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="text-sm text-muted-foreground">Card Payments</p>
                      <p className="text-2xl">${cardSales.toFixed(2)}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {todayTransactions.filter((t) => t.paymentMethod === 'card').length} transactions
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products">
            <Card className="p-6">
              <h3 className="mb-6">Top Selling Products</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topProducts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($)" />
                  <Bar dataKey="quantity" fill="#10b981" name="Quantity Sold" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
