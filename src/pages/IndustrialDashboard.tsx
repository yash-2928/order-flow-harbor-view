
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Truck,
  DollarSign,
  Clock,
  ArrowRight,
  TrendingUp,
  ShoppingCart,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const summaryCards = [
  {
    title: "Total Orders",
    value: "47",
    icon: Package,
    description: "12 this month",
    trend: "+18%",
    accent: "hsl(215, 70%, 50%)",
    bgAccent: "hsl(215, 70%, 95%)",
  },
  {
    title: "Active Deliveries",
    value: "5",
    icon: Truck,
    description: "2 arriving today",
    trend: "On track",
    accent: "hsl(145, 60%, 40%)",
    bgAccent: "hsl(145, 60%, 93%)",
  },
  {
    title: "Total Amount Spent",
    value: "$24,680",
    icon: DollarSign,
    description: "$8,450 this month",
    trend: "+5.2%",
    accent: "hsl(270, 50%, 50%)",
    bgAccent: "hsl(270, 50%, 94%)",
  },
  {
    title: "Pending Payments",
    value: "$3,120",
    icon: Clock,
    description: "3 invoices due",
    trend: "Due soon",
    accent: "hsl(35, 85%, 50%)",
    bgAccent: "hsl(35, 85%, 93%)",
  },
];

const recentOrders = [
  { id: "ORD-1047", fish: "Atlantic Salmon", qty: "25 kg", total: "$212.50", payment: "Paid", delivery: "Delivered" },
  { id: "ORD-1046", fish: "Yellowfin Tuna", qty: "10 kg", total: "$120.00", payment: "Partial", delivery: "In Transit" },
  { id: "ORD-1045", fish: "Tiger Prawns", qty: "8 kg", total: "$176.00", payment: "Pending", delivery: "Assigned" },
  { id: "ORD-1044", fish: "Sea Bass Fillets", qty: "15 kg", total: "$236.25", payment: "Paid", delivery: "Delivered" },
];

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "Paid": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Partial": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Pending": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const getDeliveryBadge = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "In Transit": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Assigned": return "bg-slate-100 text-slate-700 border-slate-200";
    default: return "bg-muted text-muted-foreground";
  }
};

const IndustrialDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <IndustrialHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {summaryCards.map((card) => (
            <Card key={card.title} className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
                    <p className="text-3xl font-bold tracking-tight">{card.value}</p>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </div>
                  <div
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: card.bgAccent }}
                  >
                    <card.icon className="h-5 w-5" style={{ color: card.accent }} />
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-medium" style={{ color: card.accent }}>
                  <TrendingUp className="h-3 w-3" />
                  {card.trend}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-accent"
            onClick={() => navigate("/industrial/orders")}
          >
            <FileText className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">View All Orders</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-accent"
            onClick={() => navigate("/industrial")}
          >
            <ShoppingCart className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Browse Catalog</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 hover:bg-accent"
            onClick={() => navigate("/delivery")}
          >
            <Truck className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm font-medium">Delivery Tracker</span>
          </Button>
        </div>

        {/* Recent Orders */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-semibold">Recent Orders</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => navigate("/industrial/orders")}
            >
              View all
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => navigate(`/industrial/orders/${order.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:flex h-10 w-10 rounded-lg bg-secondary items-center justify-center">
                      <Package className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.fish} · {order.qty}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold hidden md:block">{order.total}</span>
                    <Badge className={`${getPaymentBadge(order.payment)} border text-xs`}>
                      {order.payment}
                    </Badge>
                    <Badge className={`${getDeliveryBadge(order.delivery)} border text-xs hidden sm:inline-flex`}>
                      {order.delivery}
                    </Badge>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndustrialDashboard;
