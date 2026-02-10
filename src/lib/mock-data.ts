import { Employee, Product, Category, Customer, Transaction } from '../types';

export const mockEmployees: Employee[] = [
  { id: '1', name: 'John Manager', pin: '1234', role: 'manager' },
  { id: '2', name: 'Sarah Cashier', pin: '5678', role: 'cashier' },
  { id: '3', name: 'Admin User', pin: '0000', role: 'admin' },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Beverages', color: '#3b82f6' },
  { id: '2', name: 'Bakery', color: '#f59e0b' },
  { id: '3', name: 'Sandwiches', color: '#10b981' },
  { id: '4', name: 'Snacks', color: '#8b5cf6' },
  { id: '5', name: 'Alcohol', color: '#ef4444' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Latte',
    sku: 'BEV001',
    barcode: '123456789001',
    category: 'Beverages',
    costPrice: 1.50,
    cashPrice: 4.50,
    cardPrice: 4.75,
    taxRate: 0.08,
    stock: 150,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1663177177208-340befe4bddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '2',
    name: 'Cappuccino',
    sku: 'BEV002',
    barcode: '123456789002',
    category: 'Beverages',
    costPrice: 1.40,
    cashPrice: 4.25,
    cardPrice: 4.50,
    taxRate: 0.08,
    stock: 120,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1663177177208-340befe4bddd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBjdXAlMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '3',
    name: 'Croissant',
    sku: 'BAK001',
    barcode: '123456789003',
    category: 'Bakery',
    costPrice: 0.80,
    cashPrice: 3.00,
    cardPrice: 3.25,
    taxRate: 0.08,
    stock: 45,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1676468426928-e28a3ba5f5a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnklMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '4',
    name: 'Blueberry Muffin',
    sku: 'BAK002',
    barcode: '123456789004',
    category: 'Bakery',
    costPrice: 0.90,
    cashPrice: 3.50,
    cardPrice: 3.75,
    taxRate: 0.08,
    stock: 38,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1676468426928-e28a3ba5f5a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cnklMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '5',
    name: 'Turkey Club Sandwich',
    sku: 'SAN001',
    barcode: '123456789005',
    category: 'Sandwiches',
    costPrice: 3.00,
    cashPrice: 8.50,
    cardPrice: 8.95,
    taxRate: 0.08,
    stock: 25,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1721980743593-9ff30ba867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '6',
    name: 'Veggie Wrap',
    sku: 'SAN002',
    barcode: '123456789006',
    category: 'Sandwiches',
    costPrice: 2.50,
    cashPrice: 7.50,
    cardPrice: 7.95,
    taxRate: 0.08,
    stock: 30,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1721980743593-9ff30ba867b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2QlMjBwcm9kdWN0fGVufDF8fHx8MTc2OTY2OTIxMXww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '7',
    name: 'Craft Beer',
    sku: 'ALC001',
    barcode: '123456789007',
    category: 'Alcohol',
    costPrice: 2.00,
    cashPrice: 6.00,
    cardPrice: 6.25,
    taxRate: 0.10,
    stock: 60,
    ageRestricted: true,
    image: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBwcm9kdWN0cyUyMHNoZWxmfGVufDF8fHx8MTc2OTY2OTIxMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
  {
    id: '8',
    name: 'Potato Chips',
    sku: 'SNK001',
    barcode: '123456789008',
    category: 'Snacks',
    costPrice: 0.50,
    cashPrice: 2.00,
    cardPrice: 2.25,
    taxRate: 0.08,
    stock: 80,
    ageRestricted: false,
    image: 'https://images.unsplash.com/photo-1606824722920-4c652a70f348?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRhaWwlMjBwcm9kdWN0cyUyMHNoZWxmfGVufDF8fHx8MTc2OTY2OTIxMHww&ixlib=rb-4.1.0&q=80&w=400',
  },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    phone: '555-0101',
    loyaltyPoints: 350,
    storeCredit: 25.00,
    totalPurchases: 1250.00,
    lastVisit: new Date('2025-01-28'),
  },
  {
    id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    phone: '555-0102',
    loyaltyPoints: 520,
    storeCredit: 0,
    totalPurchases: 2180.00,
    lastVisit: new Date('2025-01-27'),
  },
  {
    id: '3',
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    phone: '555-0103',
    loyaltyPoints: 120,
    storeCredit: 15.50,
    totalPurchases: 580.00,
    lastVisit: new Date('2025-01-25'),
  },
];

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  
  // Generate some sample transactions for today
  for (let i = 0; i < 15; i++) {
    const hour = 8 + Math.floor(Math.random() * 10);
    const timestamp = new Date(today);
    timestamp.setHours(hour, Math.floor(Math.random() * 60));
    
    const numItems = 1 + Math.floor(Math.random() * 4);
    const items = [];
    let subtotal = 0;
    
    for (let j = 0; j < numItems; j++) {
      const product = mockProducts[Math.floor(Math.random() * mockProducts.length)];
      const quantity = 1 + Math.floor(Math.random() * 2);
      const price = Math.random() > 0.5 ? product.cashPrice : product.cardPrice;
      const total = price * quantity;
      
      items.push({
        id: `${i}-${j}`,
        product,
        quantity,
        discount: 0,
        unitPrice: price,
        totalPrice: total,
      });
      
      subtotal += total;
    }
    
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const paymentMethod = Math.random() > 0.6 ? 'cash' : 'card';
    
    transactions.push({
      id: `TXN${String(i + 1).padStart(4, '0')}`,
      timestamp,
      employeeId: mockEmployees[Math.floor(Math.random() * mockEmployees.length)].id,
      employeeName: mockEmployees[Math.floor(Math.random() * mockEmployees.length)].name,
      items,
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod,
      cashAmount: paymentMethod === 'cash' ? total : undefined,
      cardAmount: paymentMethod === 'card' ? total : undefined,
      change: paymentMethod === 'cash' ? Math.random() * 10 : undefined,
      status: 'completed',
    });
  }
  
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};
