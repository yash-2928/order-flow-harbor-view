
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, DollarSign, TrendingUp, Scale } from "lucide-react";

const stats = [
  {
    title: "Completed Orders",
    value: "127",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    change: "+12% from last month"
  },
  {
    title: "Profit",
    value: "$24,580",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    change: "+8% from last month"
  },
  {
    title: "Revenue",
    value: "$89,340",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    change: "+15% from last month"
  },
  {
    title: "Total Weight Delivered",
    value: "2,845 kg",
    icon: Scale,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    change: "+23% from last month"
  }
];

export const DashboardStats = () => {
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
