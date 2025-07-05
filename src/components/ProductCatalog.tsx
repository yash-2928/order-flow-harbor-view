
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Eye, Star } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: "PROD-001",
    name: "Fresh Atlantic Salmon",
    supplier: "Ocean Fresh Market",
    price: "$8.50/kg",
    minOrder: "10 kg",
    availability: "In Stock",
    rating: 4.8,
    description: "Premium quality Atlantic salmon, fresh caught",
    image: "/placeholder.svg"
  },
  {
    id: "PROD-002",
    name: "Yellowfin Tuna",
    supplier: "Pacific Fisheries",
    price: "$12.00/kg",
    minOrder: "5 kg",
    availability: "Limited",
    rating: 4.9,
    description: "Sushi-grade yellowfin tuna, flash frozen",
    image: "/placeholder.svg"
  },
  {
    id: "PROD-003",
    name: "Sea Bass Fillets",
    supplier: "Coastal Catch Co",
    price: "$15.75/kg",
    minOrder: "8 kg",
    availability: "In Stock",
    rating: 4.7,
    description: "Premium sea bass fillets, boneless",
    image: "/placeholder.svg"
  },
  {
    id: "PROD-004",
    name: "Tiger Prawns",
    supplier: "Marine Harvest",
    price: "$22.00/kg",
    minOrder: "3 kg",
    availability: "Pre-Order",
    rating: 4.6,
    description: "Large tiger prawns, shell-on, fresh",
    image: "/placeholder.svg"
  }
];

const getAvailabilityColor = (availability: string) => {
  switch (availability) {
    case "In Stock": return "bg-green-100 text-green-800";
    case "Limited": return "bg-yellow-100 text-yellow-800";
    case "Pre-Order": return "bg-blue-100 text-blue-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const handleAddToCart = (productId: string) => {
    console.log(`Adding product ${productId} to cart`);
  };

  const handleViewDetails = (productId: string) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5 text-slate-600" />
          <span>Available Products</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="aspect-square bg-slate-200 rounded-lg mb-3 flex items-center justify-center">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-sm">{product.name}</h3>
                  <Badge className={getAvailabilityColor(product.availability)}>
                    {product.availability}
                  </Badge>
                </div>
                
                <div className="text-xs text-muted-foreground">
                  by {product.supplier}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{product.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-green-600">{product.price}</div>
                    <div className="text-xs text-muted-foreground">Min: {product.minOrder}</div>
                  </div>
                </div>
                
                {selectedProduct === product.id && (
                  <div className="mt-3 pt-3 border-t border-gray-200 text-xs">
                    <p>{product.description}</p>
                  </div>
                )}
                
                <div className="flex space-x-1 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 text-xs"
                    onClick={() => handleViewDetails(product.id)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-slate-600 hover:bg-slate-700 text-xs"
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.availability === "Pre-Order"}
                  >
                    <ShoppingCart className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
