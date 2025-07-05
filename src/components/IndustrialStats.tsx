
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Clock, Truck, DollarSign } from "lucide-react";

const stats = [
  {
    title: "Active Orders",
    value: "8",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "2 pending approval"
  },
  {
    title: "Orders This Month",
    value: "34",
    icon: Clock,
    color: "text-green-600",
    bgColor: "bg-green-50",
    change: "+18% from last month"
  },
  {
    title: "Deliveries Today",
    value: "5",
    icon: Truck,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    change: "3 scheduled, 2 completed"
  },
  {
    title: "Monthly Spend",
    value: "$12,450",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    change: "+5% from last month"
  }
];

export const IndustrialStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stat.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
