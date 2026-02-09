
import { IndustrialHeader } from "@/components/IndustrialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Search, FileText, Eye, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: string;
  fishType: string;
  quantity: string;
  totalPrice: string;
  paymentStatus: "Paid" | "Partial" | "Pending";
  deliveryStatus: "Delivered" | "In Transit" | "Assigned" | "Preparing";
  date: string;
}

const orders: Order[] = [
  { id: "ORD-1047", fishType: "Atlantic Salmon", quantity: "25 kg", totalPrice: "$212.50", paymentStatus: "Paid", deliveryStatus: "Delivered", date: "2024-01-08" },
  { id: "ORD-1046", fishType: "Yellowfin Tuna", quantity: "10 kg", totalPrice: "$120.00", paymentStatus: "Partial", deliveryStatus: "In Transit", date: "2024-01-07" },
  { id: "ORD-1045", fishType: "Tiger Prawns", quantity: "8 kg", totalPrice: "$176.00", paymentStatus: "Pending", deliveryStatus: "Assigned", date: "2024-01-07" },
  { id: "ORD-1044", fishType: "Sea Bass Fillets", quantity: "15 kg", totalPrice: "$236.25", paymentStatus: "Paid", deliveryStatus: "Delivered", date: "2024-01-06" },
  { id: "ORD-1043", fishType: "Cod", quantity: "20 kg", totalPrice: "$180.00", paymentStatus: "Paid", deliveryStatus: "Delivered", date: "2024-01-05" },
  { id: "ORD-1042", fishType: "Mackerel", quantity: "12 kg", totalPrice: "$78.00", paymentStatus: "Pending", deliveryStatus: "Preparing", date: "2024-01-05" },
  { id: "ORD-1041", fishType: "Prawns", quantity: "5 kg", totalPrice: "$110.00", paymentStatus: "Paid", deliveryStatus: "Delivered", date: "2024-01-04" },
  { id: "ORD-1040", fishType: "Atlantic Salmon", quantity: "30 kg", totalPrice: "$255.00", paymentStatus: "Partial", deliveryStatus: "In Transit", date: "2024-01-04" },
];

const getPaymentBadge = (status: string) => {
  switch (status) {
    case "Paid": return "bg-emerald-100 text-emerald-700";
    case "Partial": return "bg-amber-100 text-amber-700";
    case "Pending": return "bg-red-100 text-red-700";
    default: return "bg-muted text-muted-foreground";
  }
};

const getDeliveryBadge = (status: string) => {
  switch (status) {
    case "Delivered": return "bg-emerald-100 text-emerald-700";
    case "In Transit": return "bg-blue-100 text-blue-700";
    case "Assigned": return "bg-slate-100 text-slate-700";
    case "Preparing": return "bg-orange-100 text-orange-700";
    default: return "bg-muted text-muted-foreground";
  }
};

const IndustrialOrders = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [deliveryFilter, setDeliveryFilter] = useState("all");

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.fishType.toLowerCase().includes(search.toLowerCase());
    const matchPayment = paymentFilter === "all" || o.paymentStatus === paymentFilter;
    const matchDelivery = deliveryFilter === "all" || o.deliveryStatus === deliveryFilter;
    return matchSearch && matchPayment && matchDelivery;
  });

  return (
    <div className="min-h-screen bg-background">
      <IndustrialHeader />

      <main className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/industrial")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
            <p className="text-sm text-muted-foreground">Manage and track all your orders</p>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-md">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by order ID or fish type..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Partial">Partial</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue placeholder="Delivery" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deliveries</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Assigned">Assigned</SelectItem>
                  <SelectItem value="Preparing">Preparing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              {filtered.length} Orders
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Fish Type</TableHead>
                  <TableHead className="hidden md:table-cell">Quantity</TableHead>
                  <TableHead>Total Price</TableHead>
                  <TableHead className="hidden sm:table-cell">Payment</TableHead>
                  <TableHead className="hidden sm:table-cell">Delivery</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((order) => (
                  <TableRow
                    key={order.id}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => navigate(`/industrial/orders/${order.id}`)}
                  >
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.fishType}</TableCell>
                    <TableCell className="hidden md:table-cell">{order.quantity}</TableCell>
                    <TableCell className="font-semibold">{order.totalPrice}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={`${getPaymentBadge(order.paymentStatus)} text-xs`}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge className={`${getDeliveryBadge(order.deliveryStatus)} text-xs`}>
                        {order.deliveryStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No orders match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default IndustrialOrders;
