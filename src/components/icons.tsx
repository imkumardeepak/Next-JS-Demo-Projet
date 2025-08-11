import { Ticket, Loader2 } from 'lucide-react';

export const Icons = {
  logo: Ticket,
  spinner: Loader2,
};

export type Icon = keyof typeof Icons;
