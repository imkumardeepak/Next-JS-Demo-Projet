"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScanLine, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { format } from "date-fns";

type ValidationResult = {
  status: "valid" | "expired" | "invalid";
  pass?: {
    passId: string;
    userId: string;
    type: string;
    expires: string;
  };
};

export default function ScanPage() {
  const [qrData, setQrData] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);

  const handleValidate = () => {
    try {
      const parsed = JSON.parse(qrData);
      if (parsed.passId && parsed.userId && parsed.type && parsed.expires) {
        const expiryDate = new Date(parsed.expires);
        if (expiryDate > new Date()) {
          setResult({ status: "valid", pass: parsed });
        } else {
          setResult({ status: "expired", pass: parsed });
        }
      } else {
        throw new Error("Invalid QR data structure");
      }
    } catch (error) {
      setResult({ status: "invalid" });
    }
  };

  const getResultUI = () => {
    if (!result) return null;

    let variant: "default" | "destructive" = "default";
    let icon = <AlertCircle className="h-4 w-4" />;
    let title = "Scan Result";
    let description = "";

    switch (result.status) {
      case "valid":
        variant = "default";
        icon = <CheckCircle className="h-4 w-4" />;
        title = "Pass is Valid";
        description = `Type: ${result.pass?.type}, Expires: ${format(
          new Date(result.pass?.expires || 0),
          "PPP p"
        )}`;
        break;
      case "expired":
        variant = "destructive";
        icon = <AlertCircle className="h-4 w-4" />;
        title = "Pass Expired";
        description = `This pass expired on ${format(
          new Date(result.pass?.expires || 0),
          "PPP p"
        )}.`;
        break;
      case "invalid":
        variant = "destructive";
        icon = <XCircle className="h-4 w-4" />;
        title = "Invalid QR Code";
        description = "The scanned QR code is not a valid TransitPass.";
        break;
    }

    return (
      <Alert variant={variant} className="mt-6">
        {icon}
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    );
  };

  return (
    <div className="flex justify-center">
      <Card className="w-full">
        <CardHeader className="border-b">
          <CardTitle>Scan & Validate Pass</CardTitle>
          <CardDescription>
            Use the scanner or manually enter the QR code data to validate a
            pass.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="aspect-square h-[30vh] w-full bg-slate-900 rounded-lg flex items-center justify-center mb-6">
            <ScanLine className="h-24 w-24 text-slate-600" />
          </div>
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="qr-data">Manual QR Data Entry</Label>
            <Input
              id="qr-data"
              type="text"
              placeholder='{"passId": "...", "userId": "..."}'
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              For testing, paste the JSON data from a QR code here.
            </p>
          </div>
          {getResultUI()}
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleValidate}
            disabled={!qrData}
          >
            Validate Pass
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
