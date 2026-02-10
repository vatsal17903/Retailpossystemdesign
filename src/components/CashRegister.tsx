import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  ArrowLeft,
  Search,
  Plus,
  Minus,
  Trash2,
  Percent,
  DollarSign,
  Lock,
  Printer,
  RotateCcw,
  Pause,
  Play,
  ShieldCheck,
  ShoppingCart,
} from 'lucide-react';
import { Product, CartItem, Category } from '../types';

interface CashRegisterProps {
  products: Product[];
  categories: Category[];
  onBack: () => void;
  onCheckout: (cart: CartItem[], paymentType: 'cash' | 'card') => void;
  onHoldSale: (cart: CartItem[]) => void;
}

export function CashRegister({ products, categories, onBack, onCheckout, onHoldSale }: CashRegisterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentType, setPaymentType] = useState<'cash' | 'card'>('cash');

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.product.id === product.id);
    const price = paymentType === 'cash' ? product.cashPrice : product.cardPrice;

    if (existingItem) {
      setCart(cart.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalPrice: (item.quantity + 1) * price - item.discount,
            }
          : item
      ));
    } else {
      setCart([
        ...cart,
        {
          id: Math.random().toString(),
          product,
          quantity: 1,
          discount: 0,
          unitPrice: price,
          totalPrice: price,
        },
      ]);
    }
  };

  const updateQuantity = (itemId: string, change: number) => {
    setCart(cart.map((item) => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + change);
        return {
          ...item,
          quantity: newQuantity,
          totalPrice: newQuantity * item.unitPrice - item.discount,
        };
      }
      return item;
    }));
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const applyDiscount = (itemId: string, discount: number) => {
    setCart(cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          discount,
          totalPrice: item.quantity * item.unitPrice - discount,
        };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePay = () => {
    if (cart.length > 0) {
      onCheckout(cart, paymentType);
      setCart([]);
    }
  };

  const handleHold = () => {
    if (cart.length > 0) {
      onHoldSale(cart);
      setCart([]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h2>Cash Register</h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleHold}>
            <Pause className="w-4 h-4 mr-2" />
            Hold Sale
          </Button>
          <Button variant="outline" size="sm">
            <Play className="w-4 h-4 mr-2" />
            Resume
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Categories */}
        <div className="w-48 bg-white border-r p-4">
          <h4 className="mb-4">Categories</h4>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setSelectedCategory('all')}
            >
              All Items
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.name ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Center: Products */}
        <div className="flex-1 p-6">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => addToCart(product)}
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <h4 className="mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium">${product.cashPrice.toFixed(2)}</span>
                    <span className="text-sm text-muted-foreground">
                      / ${product.cardPrice.toFixed(2)}
                    </span>
                  </div>
                  {product.ageRestricted && (
                    <Badge variant="destructive" className="mt-2 text-xs">
                      ID Required
                    </Badge>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    Stock: {product.stock}
                  </p>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right: Cart */}
        <div className="w-96 bg-white border-l flex flex-col">
          <div className="p-4 border-b">
            <h3>Current Sale</h3>
            <div className="flex gap-2 mt-3">
              <Button
                variant={paymentType === 'cash' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setPaymentType('cash')}
              >
                Cash
              </Button>
              <Button
                variant={paymentType === 'card' ? 'default' : 'outline'}
                size="sm"
                className="flex-1"
                onClick={() => setPaymentType('card')}
              >
                Card
              </Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-4">
            {cart.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">
                <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Cart is empty</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cart.map((item) => (
                  <Card key={item.id} className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm flex-1">{item.product.name}</h4>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 p-0"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">${item.totalPrice.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          ${item.unitPrice.toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>

          <div className="p-4 border-t space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Total</span>
                <span className="text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full h-14 text-lg"
              onClick={handlePay}
              disabled={cart.length === 0}
            >
              Pay ${total.toFixed(2)}
            </Button>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" size="sm">
                <Percent className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <ShieldCheck className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}