"use client";

import React, { useState } from "react";
import { add } from "date-fns";
import type { ActivePass, PassOption } from "@/types";
import { ActivePassView } from "@/components/dashboard/active-pass-view";
import { PassSelection } from "@/components/dashboard/pass-selection";

// Mock user data, in a real app this would come from an auth context
const mockUser = {
  id: "usr_12345",
  name: "John Doe",
};

export default function DashboardPage() {
  const [activePass, setActivePass] = useState<ActivePass | null>(null);

  const handlePurchase = (passOption: PassOption) => {
    const purchaseDate = new Date();
    const expiryDate = add(purchaseDate, { days: passOption.durationDays });

    const newPass: ActivePass = {
      id: `pass_${Date.now()}`,
      userId: mockUser.id,
      userName: mockUser.name,
      type: passOption.type,
      purchaseDate,
      expiryDate,
    };
    setActivePass(newPass);
  };

  const handleExpire = () => {
      setActivePass(null);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 md:gap-8">
      {activePass ? (
        <ActivePassView pass={activePass} onExpire={handleExpire} />
      ) : (
        <PassSelection onPurchase={handlePurchase} />
      )}
    </div>
  );
}
