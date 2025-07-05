
import { Factory, ShoppingCart, Fish } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const IndustrialHeader = () => {
  const [cartItems, setCartItems] = useState(3);
  const navigate = useNavigate();

  const handleViewCart = () => {
    console.log("Opening cart...");
  };

  const handleSwitchToFisherman = () => {
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Factory className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Industrial Dashboard</h1>
              <p className="text-slate-200">Browse and order fresh fish products</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleSwitchToFisherman}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-slate-700"
            >
              <Fish className="h-4 w-4 mr-2" />
              Fisherman View
            </Button>
            <Button 
              onClick={handleViewCart}
              className="bg-white text-slate-700 hover:bg-slate-50 font-semibold relative"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
