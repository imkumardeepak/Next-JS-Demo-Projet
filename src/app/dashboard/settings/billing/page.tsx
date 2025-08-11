import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

export default function BillingPage() {
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>Manage your payment methods and view invoices.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6" />
                <div>
                    <p className="font-medium">Visa ending in 1234</p>
                    <p className="text-sm text-muted-foreground">Expires 12/2026</p>
                </div>
            </div>
            <Button variant="outline">Remove</Button>
        </div>
        <Button>Add Payment Method</Button>
      </CardContent>
    </Card>
  );
}
