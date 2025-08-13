import { Ticket, Loader2, SaladIcon } from "lucide-react";

export const Icons = {
  logo: SaladIcon,
  spinner: Loader2,
};

export type Icon = keyof typeof Icons;
