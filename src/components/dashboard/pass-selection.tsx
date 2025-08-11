"use client";

import type { PassOption } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CreditCard, Ticket, Zap } from "lucide-react";

const passOptions: PassOption[] = [
  {
    type: "Daily",
    price: 5,
    durationDays: 1,
    description: "Perfect for a single day of unlimited travel.",
  },
  {
    type: "Weekly",
    price: 20,
    durationDays: 7,
    description: "Ideal for commuters and regular travelers.",
  },
  {
    type: "Monthly",
    price: 65,
    durationDays: 30,
    description: "Best value for frequent riders.",
  },
];

interface PassSelectionProps {
  onPurchase: (pass: PassOption) => void;
}

export function PassSelection({ onPurchase }: PassSelectionProps) {
  return (
    <div className="flex flex-col items-center">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Choose Your Pass</h2>
            <p className="text-muted-foreground mt-2">Select a pass that fits your travel needs.</p>
        </div>
        <div className="grid w-full max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {passOptions.map((option) => (
            <Card key={option.type} className="flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-md">
                        <Ticket className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{option.type} Pass</CardTitle>
                </div>
                <CardDescription>{option.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="text-4xl font-bold tracking-tighter">${option.price}</div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>Valid for {option.durationDays} {option.durationDays > 1 ? 'days' : 'day'}</span>
                </div>
            </CardContent>
            <CardFooter>
                <Button className="w-full" onClick={() => onPurchase(option)}>
                <CreditCard className="mr-2 h-4 w-4" /> Purchase Now
                </Button>
            </CardFooter>
            </Card>
        ))}
        </div>
    </div>
  );
}
