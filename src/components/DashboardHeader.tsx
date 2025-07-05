
import { Fish, Plus, Factory } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const DashboardHeader = () => {
  const navigate = useNavigate();

  const handleAddNewLot = () => {
    console.log("Redirecting to add new lot...");
    // This would typically navigate to a new route
  };

  const handleSwitchToIndustrial = () => {
    navigate("/industrial");
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
          </div>
        </div>
      </div>
    </header>
  );
};
