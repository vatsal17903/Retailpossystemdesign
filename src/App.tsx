import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { OpeningCashScreen } from './components/OpeningCashScreen';
import { MainMenu } from './components/MainMenu';
import { CashRegister } from './components/CashRegister';
import { PaymentScreen } from './components/PaymentScreen';
import { EndShiftScreen } from './components/EndShiftScreen';
import { TimeClock } from './components/TimeClock';
import { ItemManagement } from './components/ItemManagement';
import { Inventory } from './components/Inventory';
import { Customers } from './components/Customers';
import { Reports } from './components/Reports';
import { BackOffice } from './components/BackOffice';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner@2.0.3';
import { mockEmployees, mockProducts, mockCategories, mockCustomers, generateMockTransactions } from './lib/mock-data';
import { Employee, Product, Category, Customer, Transaction, CartItem, Shift, Screen } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [transactions, setTransactions] = useState<Transaction[]>(generateMockTransactions());
  const [pendingPayment, setPendingPayment] = useState<{
    cart: CartItem[];
    paymentType: 'cash' | 'card';
  } | null>(null);

  const handleLogin = (employee: Employee) => {
    setCurrentEmployee(employee);
    setCurrentScreen('opening-cash');
    toast.success(`Welcome, ${employee.name}!`);
  };

  const handleStartShift = (openingCash: number) => {
    if (currentEmployee) {
      const shift: Shift = {
        id: Date.now().toString(),
        employeeId: currentEmployee.id,
        employeeName: currentEmployee.name,
        startTime: new Date(),
        openingCash,
        status: 'active',
        totalSales: 0,
      };
      setCurrentShift(shift);
      setCurrentScreen('main-menu');
      toast.success('Shift started successfully');
    }
  };

  const handleNavigate = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  const handleLogout = () => {
    setCurrentEmployee(null);
    setCurrentShift(null);
    setCurrentScreen('login');
    toast.info('Logged out successfully');
  };

  const handleCheckout = (cart: CartItem[], paymentType: 'cash' | 'card') => {
    setPendingPayment({ cart, paymentType });
    setCurrentScreen('payment');
  };

  const handlePaymentComplete = () => {
    if (pendingPayment && currentEmployee && currentShift) {
      const subtotal = pendingPayment.cart.reduce((sum, item) => sum + item.totalPrice, 0);
      const tax = subtotal * 0.08;
      const total = subtotal + tax;

      const transaction: Transaction = {
        id: `TXN${String(transactions.length + 1).padStart(4, '0')}`,
        timestamp: new Date(),
        employeeId: currentEmployee.id,
        employeeName: currentEmployee.name,
        items: pendingPayment.cart,
        subtotal,
        tax,
        discount: 0,
        total,
        paymentMethod: pendingPayment.paymentType,
        cashAmount: pendingPayment.paymentType === 'cash' ? total : undefined,
        cardAmount: pendingPayment.paymentType === 'card' ? total : undefined,
        status: 'completed',
      };

      setTransactions([transaction, ...transactions]);
      
      // Update shift total sales
      setCurrentShift({
        ...currentShift,
        totalSales: (currentShift.totalSales || 0) + total,
      });

      // Update product stock
      pendingPayment.cart.forEach((item) => {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === item.product.id
              ? { ...p, stock: p.stock - item.quantity }
              : p
          )
        );
      });

      setPendingPayment(null);
      setCurrentScreen('cash-register');
      toast.success('Payment completed successfully!');
    }
  };

  const handleHoldSale = (cart: CartItem[]) => {
    toast.success('Sale held successfully');
  };

  const handleEndShift = (closingCash: number) => {
    if (currentShift) {
      const updatedShift: Shift = {
        ...currentShift,
        endTime: new Date(),
        closingCash,
        expectedCash: currentShift.openingCash + (currentShift.totalSales || 0),
        status: 'closed',
      };
      
      toast.success('Shift ended successfully');
      setCurrentShift(null);
      handleLogout();
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    toast.success('Product updated successfully');
  };

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    toast.success('Product added successfully');
  };

  const handleAddCustomer = (customer: Customer) => {
    setCustomers((prev) => [...prev, customer]);
    toast.success('Customer added successfully');
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'login' && (
        <LoginScreen employees={mockEmployees} onLogin={handleLogin} />
      )}

      {currentScreen === 'opening-cash' && currentEmployee && (
        <OpeningCashScreen
          employeeName={currentEmployee.name}
          onStartShift={handleStartShift}
        />
      )}

      {currentScreen === 'main-menu' && currentEmployee && (
        <MainMenu
          employeeName={currentEmployee.name}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      {currentScreen === 'cash-register' && (
        <CashRegister
          products={products}
          categories={mockCategories}
          onBack={() => setCurrentScreen('main-menu')}
          onCheckout={handleCheckout}
          onHoldSale={handleHoldSale}
        />
      )}

      {currentScreen === 'payment' && pendingPayment && (
        <PaymentScreen
          cart={pendingPayment.cart}
          total={
            pendingPayment.cart.reduce((sum, item) => sum + item.totalPrice, 0) * 1.08
          }
          paymentType={pendingPayment.paymentType}
          onComplete={handlePaymentComplete}
          onCancel={() => {
            setPendingPayment(null);
            setCurrentScreen('cash-register');
          }}
        />
      )}

      {currentScreen === 'end-shift' && currentShift && (
        <EndShiftScreen
          openingCash={currentShift.openingCash}
          expectedCash={currentShift.openingCash + (currentShift.totalSales || 0)}
          totalSales={currentShift.totalSales || 0}
          onEndShift={handleEndShift}
          onCancel={() => setCurrentScreen('main-menu')}
        />
      )}

      {currentScreen === 'time-clock' && currentEmployee && (
        <TimeClock
          employeeName={currentEmployee.name}
          onBack={() => setCurrentScreen('main-menu')}
        />
      )}

      {currentScreen === 'item-management' && (
        <ItemManagement
          products={products}
          onBack={() => setCurrentScreen('main-menu')}
          onUpdateProduct={handleUpdateProduct}
          onAddProduct={handleAddProduct}
        />
      )}

      {currentScreen === 'inventory' && (
        <Inventory
          products={products}
          onBack={() => setCurrentScreen('main-menu')}
        />
      )}

      {currentScreen === 'customers' && (
        <Customers
          customers={customers}
          onBack={() => setCurrentScreen('main-menu')}
          onAddCustomer={handleAddCustomer}
        />
      )}

      {currentScreen === 'reports' && (
        <Reports
          transactions={transactions}
          onBack={() => setCurrentScreen('main-menu')}
        />
      )}

      {currentScreen === 'back-office' && (
        <BackOffice
          employees={mockEmployees}
          onBack={() => setCurrentScreen('main-menu')}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
