
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { ProductCatalog } from "@/components/ProductCatalog";
import { IndustrialOrderLists } from "@/components/IndustrialOrderLists";
import { IndustrialStats } from "@/components/IndustrialStats";

const IndustrialDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <IndustrialHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <IndustrialStats />
        <ProductCatalog />
        <IndustrialOrderLists />
      </main>
    </div>
  );
};

export default IndustrialDashboard;
