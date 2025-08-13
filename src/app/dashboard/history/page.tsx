import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const passHistory = [
  {
    id: "pass_005",
    type: "Monthly",
    purchaseDate: "2024-06-01",
    expiryDate: "2024-06-30",
    price: 65.0,
    status: "Active",
  },
  {
    id: "pass_004",
    type: "Monthly",
    purchaseDate: "2024-05-01",
    expiryDate: "2024-05-31",
    price: 65.0,
    status: "Expired",
  },
  {
    id: "pass_003",
    type: "Weekly",
    purchaseDate: "2024-04-22",
    expiryDate: "2024-04-29",
    price: 20.0,
    status: "Expired",
  },
  {
    id: "pass_002",
    type: "Daily",
    purchaseDate: "2024-04-15",
    expiryDate: "2024-04-16",
    price: 5.0,
    status: "Expired",
  },
  {
    id: "pass_001",
    type: "Monthly",
    purchaseDate: "2024-03-01",
    expiryDate: "2024-03-31",
    price: 65.0,
    status: "Expired",
  },
];

export default function HistoryPage() {
  return (
    <Card className="w-full max-w-[80rem] mx-auto">
      <CardHeader className="border-b">
        <CardTitle>Pass History</CardTitle>
        <CardDescription>
          A record of all your past pass purchases.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pass Type</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Purchase Date
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Expiry Date
                </TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {passHistory.map((pass) => (
                <TableRow key={pass.id}>
                  <TableCell className="font-medium">{pass.type}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {pass.purchaseDate}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {pass.expiryDate}
                  </TableCell>
                  <TableCell className="text-right">
                    ${pass.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant={
                        pass.status === "Active" ? "default" : "destructive"
                      }
                    >
                      {pass.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
