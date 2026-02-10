import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Switch } from './ui/switch';
import { ArrowLeft, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface ItemManagementProps {
  products: Product[];
  onBack: () => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
}

export function ItemManagement({ products, onBack, onUpdateProduct, onAddProduct }: ItemManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.barcode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      if (editingProduct.id) {
        onUpdateProduct(editingProduct);
      } else {
        onAddProduct({ ...editingProduct, id: Date.now().toString() });
      }
      setIsDialogOpen(false);
      setEditingProduct(null);
    }
  };

  const handleNewProduct = () => {
    setEditingProduct({
      id: '',
      name: '',
      sku: '',
      barcode: '',
      category: '',
      costPrice: 0,
      cashPrice: 0,
      cardPrice: 0,
      taxRate: 0.08,
      stock: 0,
      ageRestricted: false,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1>Item Management</h1>
          </div>
          <Button onClick={handleNewProduct}>
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <Card className="p-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search by name, SKU, or barcode..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cash Price</TableHead>
                <TableHead>Card Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Age Restricted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sku}</TableCell>
                  <TableCell>{product.barcode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell>${product.cashPrice.toFixed(2)}</TableCell>
                  <TableCell>${product.cardPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={product.stock < 10 ? 'destructive' : 'default'}>
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {product.ageRestricted && (
                      <Badge variant="destructive">Yes</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingProduct(product);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct?.id ? 'Edit Item' : 'Add New Item'}
              </DialogTitle>
            </DialogHeader>
            {editingProduct && (
              <form onSubmit={handleSaveProduct} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={editingProduct.name}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, category: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={editingProduct.sku}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, sku: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      value={editingProduct.barcode}
                      onChange={(e) =>
                        setEditingProduct({ ...editingProduct, barcode: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Cost Price</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      value={editingProduct.costPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          costPrice: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cashPrice">Cash Price</Label>
                    <Input
                      id="cashPrice"
                      type="number"
                      step="0.01"
                      value={editingProduct.cashPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          cashPrice: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardPrice">Card Price</Label>
                    <Input
                      id="cardPrice"
                      type="number"
                      step="0.01"
                      value={editingProduct.cardPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          cardPrice: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      type="number"
                      value={editingProduct.stock}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          stock: parseInt(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="taxRate">Tax Rate</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      step="0.01"
                      value={editingProduct.taxRate}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          taxRate: parseFloat(e.target.value),
                        })
                      }
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="ageRestricted"
                      checked={editingProduct.ageRestricted}
                      onCheckedChange={(checked) =>
                        setEditingProduct({ ...editingProduct, ageRestricted: checked })
                      }
                    />
                    <Label htmlFor="ageRestricted">Age Restricted</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Item</Button>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
