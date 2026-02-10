import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, Settings, Users, Package, DollarSign, Barcode } from 'lucide-react';
import { Employee } from '../types';

interface BackOfficeProps {
  employees: Employee[];
  onBack: () => void;
}

export function BackOffice({ employees, onBack }: BackOfficeProps) {
  const [taxRate, setTaxRate] = useState('8.00');
  const [cardProcessingFee, setCardProcessingFee] = useState('2.50');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1>Back Office</h1>
          </div>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="tax">Tax & Pricing</TabsTrigger>
            <TabsTrigger value="hardware">Hardware</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3>Employee Management</h3>
                <Button>Add Employee</Button>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>PIN</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell className="capitalize">{employee.role}</TableCell>
                      <TableCell>••••</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                          Active
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm">Delete</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-6">Store Information</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="storeName">Store Name</Label>
                    <Input id="storeName" defaultValue="My Retail Store" />
                  </div>
                  <div>
                    <Label htmlFor="storeAddress">Address</Label>
                    <Input id="storeAddress" defaultValue="123 Main St, City, State" />
                  </div>
                  <div>
                    <Label htmlFor="storePhone">Phone</Label>
                    <Input id="storePhone" defaultValue="(555) 123-4567" />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6">Receipt Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="receiptHeader">Header Text</Label>
                    <Input id="receiptHeader" defaultValue="Thank you for shopping!" />
                  </div>
                  <div>
                    <Label htmlFor="receiptFooter">Footer Text</Label>
                    <Input id="receiptFooter" defaultValue="Please come again!" />
                  </div>
                  <div>
                    <Label htmlFor="receiptLogo">Logo URL</Label>
                    <Input id="receiptLogo" placeholder="https://..." />
                  </div>
                  <Button className="w-full">Save Changes</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tax">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-6">Tax Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={taxRate}
                      onChange={(e) => setTaxRate(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Current: {taxRate}%
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="taxIncluded">Tax Display</Label>
                    <select id="taxIncluded" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>Add tax at checkout</option>
                      <option>Include tax in price</option>
                    </select>
                  </div>
                  <Button className="w-full">Save Tax Settings</Button>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6">Pricing Settings</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardFee">Card Processing Fee (%)</Label>
                    <Input
                      id="cardFee"
                      type="number"
                      step="0.01"
                      value={cardProcessingFee}
                      onChange={(e) => setCardProcessingFee(e.target.value)}
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Added to card prices: {cardProcessingFee}%
                    </p>
                  </div>
                  <div>
                    <Label htmlFor="pricingStrategy">Price Rounding</Label>
                    <select id="pricingStrategy" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>Round to nearest cent</option>
                      <option>Round to nearest nickel</option>
                      <option>Round to nearest dollar</option>
                    </select>
                  </div>
                  <Button className="w-full">Save Pricing Settings</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="hardware">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="mb-6">Hardware Configuration</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4>Receipt Printer</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                        Connected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Star TSP143III LAN
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Test Print
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4>Card Reader</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                        Connected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Square Terminal
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Test Connection
                    </Button>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4>Barcode Scanner</h4>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">
                        Not Connected
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No scanner detected
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Setup Scanner
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="mb-6">Cash Drawer</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="drawerOpen">Open Drawer</Label>
                    <select id="drawerOpen" className="w-full h-10 px-3 rounded-md border border-input bg-background">
                      <option>On cash sale</option>
                      <option>On any sale</option>
                      <option>Manual only</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="drawerAlert">Low Cash Alert</Label>
                    <Input
                      id="drawerAlert"
                      type="number"
                      defaultValue="50"
                      placeholder="Alert threshold"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Alert when cash drawer falls below this amount
                    </p>
                  </div>
                  <Button className="w-full">Save Drawer Settings</Button>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
