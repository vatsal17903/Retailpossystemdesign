// Core Types for POS System

export interface Employee {
  id: string;
  name: string;
  pin: string;
  role: 'admin' | 'manager' | 'cashier';
  hourlyRate?: number;
}

export interface Shift {
  id: string;
  employeeId: string;
  employeeName: string;
  startTime: Date;
  endTime?: Date;
  openingCash: number;
  closingCash?: number;
  expectedCash?: number;
  totalSales?: number;
  status: 'active' | 'closed';
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  employeeName: string;
  clockIn: Date;
  clockOut?: Date;
  breakStart?: Date;
  breakEnd?: Date;
  totalHours?: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  department?: string;
  costPrice: number;
  cashPrice: number;
  cardPrice: number;
  taxRate: number;
  stock: number;
  lowStockThreshold?: number;
  ageRestricted: boolean;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  color?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  discount: number;
  notes?: string;
  unitPrice: number;
  totalPrice: number;
}

export interface HeldTransaction {
  id: string;
  customerName?: string;
  items: CartItem[];
  timestamp: Date;
  subtotal: number;
  tax: number;
  total: number;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  employeeId: string;
  employeeName: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'split';
  cashAmount?: number;
  cardAmount?: number;
  change?: number;
  customerId?: string;
  customerName?: string;
  status: 'completed' | 'voided' | 'returned';
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  loyaltyPoints: number;
  storeCredit: number;
  totalPurchases: number;
  lastVisit?: Date;
}

export interface Invoice {
  id: string;
  supplier: string;
  date: Date;
  items: { productId: string; productName: string; quantity: number; cost: number }[];
  totalCost: number;
  status: 'pending' | 'received';
}

export interface Report {
  period: 'today' | 'week' | 'month';
  totalSales: number;
  transactionCount: number;
  cashSales: number;
  cardSales: number;
  topProducts: { name: string; quantity: number; revenue: number }[];
  hourlySales: { hour: string; sales: number }[];
}

export type Screen = 
  | 'login' 
  | 'opening-cash' 
  | 'main-menu' 
  | 'cash-register' 
  | 'payment' 
  | 'hold-resume'
  | 'returns'
  | 'end-shift'
  | 'time-clock'
  | 'item-management'
  | 'inventory'
  | 'customers'
  | 'reports'
  | 'back-office';
