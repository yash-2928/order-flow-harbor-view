
import { DashboardStats } from "@/components/DashboardStats";
import { OrderLists } from "@/components/OrderLists";
import { DashboardHeader } from "@/components/DashboardHeader";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <DashboardStats />
        <OrderLists />
      </main>
    </div>
  );
};

export default Index;
