
import { Factory, ShoppingCart, Fish, LogOut, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const IndustrialHeader = () => {
  const [cartItems, setCartItems] = useState(3);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleViewCart = () => {
    console.log("Opening cart...");
  };

  const handleSwitchToFisherman = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate("/industrial")}>
            <Factory className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Industrial Dashboard</h1>
              <p className="text-slate-200 text-sm">Browse and order fresh fish products</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => navigate("/industrial/orders")}
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white hover:text-slate-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Orders
            </Button>
            <Button
              onClick={() => navigate("/industrial/catalog")}
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white hover:text-slate-700"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Catalog
            </Button>
            <Button 
              onClick={handleSwitchToFisherman}
              variant="outline"
              className="bg-transparent border-white/30 text-white hover:bg-white hover:text-slate-700"
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
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-white text-slate-700">
                        {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user.fullName}</p>
                      <p className="w-[200px] truncate text-sm text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
