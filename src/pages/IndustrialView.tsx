
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { IndustrialStats } from "@/components/IndustrialStats";
import { ProductCatalog } from "@/components/ProductCatalog";
import { IndustrialOrderLists } from "@/components/IndustrialOrderLists";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IndustrialView = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <IndustrialHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-end">
          <Button
            onClick={() => navigate("/delivery")}
            className="bg-green-600 hover:bg-green-700"
          >
            <Truck className="h-4 w-4 mr-2" />
            Delivery Tracker
          </Button>
        </div>
        <IndustrialStats />
        <ProductCatalog />
        <IndustrialOrderLists />
      </main>
    </div>
  );
};

export default IndustrialView;
