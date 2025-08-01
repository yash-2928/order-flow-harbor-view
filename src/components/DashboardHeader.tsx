
import { Fish, Plus, Factory, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const DashboardHeader = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAddNewLot = () => {
    console.log("Redirecting to add new lot...");
    // This would typically navigate to a new route
  };

  const handleSwitchToIndustrial = () => {
    navigate("/industrial");
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Fish className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Fisherman Dashboard</h1>
              <p className="text-blue-100">Manage your fishing operations</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button 
              onClick={handleSwitchToIndustrial}
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Factory className="h-4 w-4 mr-2" />
              Industrial View
            </Button>
            <Button 
              onClick={handleAddNewLot}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Lot
            </Button>
            
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-white/20">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-white text-blue-600">
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
