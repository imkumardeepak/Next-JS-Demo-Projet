"use client";

import type { ActivePass } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { Clock, RefreshCw, User, Ticket } from "lucide-react";
import React, { useState, useEffect } from "react";

interface ActivePassViewProps {
  pass: ActivePass;
  onExpire: () => void;
}

export function ActivePassView({ pass, onExpire }: ActivePassViewProps) {
  const [isExpired, setIsExpired] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");

  const qrData = encodeURIComponent(
    JSON.stringify({
      passId: pass.id,
      userId: pass.userId,
      type: pass.type,
      expires: pass.expiryDate.toISOString(),
    })
  );

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}&bgcolor=ffffff`;

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const expiry = pass.expiryDate;
      const diff = expiry.getTime() - now.getTime();

      if (diff <= 0) {
        setIsExpired(true);
        setTimeLeft("Expired");
        clearInterval(intervalId);
        return;
      }
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    const intervalId = setInterval(updateTimer, 1000);
    updateTimer(); 

    return () => clearInterval(intervalId);
  }, [pass.expiryDate]);


  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl">
      <CardHeader className="bg-primary text-primary-foreground p-6">
        <div className="flex items-center gap-4">
            <Ticket className="h-8 w-8" />
            <CardTitle className="text-2xl">Your Active Pass</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-center">
        <div className="mb-6">
          <Image
            src={qrUrl}
            alt="Your Pass QR Code"
            width={250}
            height={250}
            className="mx-auto rounded-lg border-4 border-white shadow-md"
            data-ai-hint="qr code"
          />
        </div>

        <div className="space-y-4 text-left">
           <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <Avatar>
                    <AvatarImage src={`https://placehold.co/100x100.png`} />
                    <AvatarFallback>{pass.userName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-lg">{pass.userName}</p>
                    <p className="text-sm text-muted-foreground">{pass.type} Pass</p>
                </div>
            </div>
            <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <Clock className="h-6 w-6 text-muted-foreground" />
                <div>
                    <p className="font-semibold">{isExpired ? 'Expired On' : 'Expires In'}</p>
                    <p className={`text-sm ${isExpired ? 'text-destructive font-bold' : 'text-primary font-bold'}`}>{isExpired ? format(pass.expiryDate, "PPP p") : timeLeft}</p>
                </div>
            </div>
        </div>
      </CardContent>
      {isExpired && (
         <CardFooter>
            <Button className="w-full" variant="destructive" onClick={onExpire}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Purchase New Pass
            </Button>
         </CardFooter>
      )}
    </Card>
  );
}
