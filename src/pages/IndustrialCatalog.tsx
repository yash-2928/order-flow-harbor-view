
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart, Star, Plus, Minus, Trash2, ArrowLeft, Package, Truck,
  Search, X,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FishLot {
  id: string;
  name: string;
  supplier: string;
  pricePerKg: number;
  minOrder: number;
  availability: "In Stock" | "Limited" | "Pre-Order";
  rating: number;
  description: string;
  image: string;
}

interface CartItem {
  lot: FishLot;
  quantity: number;
}

const fishLots: FishLot[] = [
  { id: "LOT-001", name: "Fresh Atlantic Salmon", supplier: "Ocean Fresh Market", pricePerKg: 8.5, minOrder: 10, availability: "In Stock", rating: 4.8, description: "Premium quality Atlantic salmon, fresh caught daily from North Atlantic waters.", image: "/placeholder.svg" },
  { id: "LOT-002", name: "Yellowfin Tuna", supplier: "Pacific Fisheries", pricePerKg: 12.0, minOrder: 5, availability: "Limited", rating: 4.9, description: "Sushi-grade yellowfin tuna, flash frozen for maximum freshness.", image: "/placeholder.svg" },
  { id: "LOT-003", name: "Sea Bass Fillets", supplier: "Coastal Catch Co", pricePerKg: 15.75, minOrder: 8, availability: "In Stock", rating: 4.7, description: "Premium sea bass fillets, boneless and ready to cook.", image: "/placeholder.svg" },
  { id: "LOT-004", name: "Tiger Prawns", supplier: "Marine Harvest", pricePerKg: 22.0, minOrder: 3, availability: "In Stock", rating: 4.6, description: "Large tiger prawns, shell-on, sustainably farmed.", image: "/placeholder.svg" },
  { id: "LOT-005", name: "Atlantic Cod", supplier: "Nordic Seas Ltd", pricePerKg: 9.0, minOrder: 10, availability: "In Stock", rating: 4.5, description: "Flaky white cod fillets, perfect for fish & chips.", image: "/placeholder.svg" },
  { id: "LOT-006", name: "Mackerel", supplier: "Coastal Catch Co", pricePerKg: 6.5, minOrder: 15, availability: "Limited", rating: 4.4, description: "Whole mackerel, rich in omega-3, line caught.", image: "/placeholder.svg" },
  { id: "LOT-007", name: "King Crab Legs", supplier: "Arctic Fisheries", pricePerKg: 45.0, minOrder: 2, availability: "Pre-Order", rating: 4.9, description: "Premium Alaskan king crab legs, pre-cooked and frozen.", image: "/placeholder.svg" },
  { id: "LOT-008", name: "Sardines", supplier: "Mediterranean Catch", pricePerKg: 4.5, minOrder: 20, availability: "In Stock", rating: 4.3, description: "Fresh sardines, great for grilling or canning.", image: "/placeholder.svg" },
];

const DELIVERY_CHARGE = 15.0;
const PLATFORM_FEE_PERCENT = 2.5;

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "In Stock": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Limited": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Pre-Order": return "bg-blue-100 text-blue-700 border-blue-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const IndustrialCatalog = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [showCart, setShowCart] = useState(false);

  const addToCart = (lot: FishLot) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.lot.id === lot.id);
      if (existing) {
        return prev.map((c) =>
          c.lot.id === lot.id ? { ...c, quantity: c.quantity + lot.minOrder } : c
        );
      }
      return [...prev, { lot, quantity: lot.minOrder }];
    });
    toast({ title: "Added to cart", description: `${lot.name} (${lot.minOrder} kg)` });
  };

  const updateQuantity = (lotId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.lot.id !== lotId) return c;
          const next = c.quantity + delta;
          return next >= c.lot.minOrder ? { ...c, quantity: next } : c;
        })
    );
  };

  const removeFromCart = (lotId: string) => {
    setCart((prev) => prev.filter((c) => c.lot.id !== lotId));
  };

  const subtotal = cart.reduce((s, c) => s + c.lot.pricePerKg * c.quantity, 0);
  const platformFee = subtotal * (PLATFORM_FEE_PERCENT / 100);
  const grandTotal = subtotal + DELIVERY_CHARGE + platformFee;
  const totalItems = cart.reduce((s, c) => s + c.quantity, 0);

  const filteredLots = fishLots.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.supplier.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <IndustrialHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/industrial")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Fish Lot Catalog</h2>
              <p className="text-sm text-muted-foreground">Browse available lots and add to cart</p>
            </div>
          </div>

          <Button
            className="relative bg-slate-700 hover:bg-slate-800"
            onClick={() => setShowCart(!showCart)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {cart.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cart.length}
              </Badge>
            )}
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product Grid */}
          <div className={`flex-1 space-y-4 ${showCart && cart.length > 0 ? "lg:w-2/3" : "w-full"}`}>
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search fish lots..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredLots.map((lot) => {
                const inCart = cart.find((c) => c.lot.id === lot.id);
                return (
                  <Card key={lot.id} className="border shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center overflow-hidden">
                      <img src={lot.image} alt={lot.name} className="w-full h-full object-cover" />
                    </div>
                    <CardContent className="p-4 flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-sm leading-tight">{lot.name}</h3>
                        <Badge className={`${getAvailabilityColor(lot.availability)} border text-[10px] shrink-0`}>
                          {lot.availability}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">by {lot.supplier}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{lot.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{lot.description}</p>
                      <div className="pt-1">
                        <span className="text-lg font-bold text-emerald-600">${lot.pricePerKg.toFixed(2)}</span>
                        <span className="text-xs text-muted-foreground"> /kg</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Min order: {lot.minOrder} kg</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      {inCart ? (
                        <div className="flex items-center justify-between w-full gap-2">
                          <div className="flex items-center gap-1">
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(lot.id, -1)}>
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-12 text-center text-sm font-semibold">{inCart.quantity} kg</span>
                            <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => updateQuantity(lot.id, 1)}>
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <span className="text-sm font-bold text-emerald-600">
                            ${(inCart.quantity * lot.pricePerKg).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <Button
                          className="w-full bg-slate-700 hover:bg-slate-800"
                          onClick={() => addToCart(lot)}
                          disabled={lot.availability === "Pre-Order"}
                        >
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart ({lot.minOrder} kg)
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
              {filteredLots.length === 0 && (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No fish lots match your search.
                </div>
              )}
            </div>
          </div>

          {/* Cart Sidebar */}
          {showCart && cart.length > 0 && (
            <div className="lg:w-[380px] shrink-0">
              <Card className="border shadow-md sticky top-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShoppingCart className="h-4 w-4" /> Your Cart
                    </span>
                    <Badge variant="secondary" className="text-xs">{cart.length} items</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.lot.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                      <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center shrink-0">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.lot.name}</p>
                        <p className="text-xs text-muted-foreground">${item.lot.pricePerKg.toFixed(2)}/kg</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.lot.id, -1)}>
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-semibold w-10 text-center">{item.quantity} kg</span>
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => updateQuantity(item.lot.id, 1)}>
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold">${(item.lot.pricePerKg * item.quantity).toFixed(2)}</p>
                        <Button size="icon" variant="ghost" className="h-6 w-6 text-red-500 hover:text-red-700 mt-1" onClick={() => removeFromCart(item.lot.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>

                <Separator />

                <CardContent className="pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal ({totalItems} kg)</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Truck className="h-3 w-3" /> Delivery Charge
                    </span>
                    <span className="font-medium">${DELIVERY_CHARGE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Platform Fee ({PLATFORM_FEE_PERCENT}%)</span>
                    <span className="font-medium">${platformFee.toFixed(2)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between text-base font-bold">
                    <span>Grand Total</span>
                    <span className="text-emerald-600">${grandTotal.toFixed(2)}</span>
                  </div>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Place Order — ${grandTotal.toFixed(2)}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setCart([])}>
                    <X className="h-3 w-3 mr-1" /> Clear Cart
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default IndustrialCatalog;
