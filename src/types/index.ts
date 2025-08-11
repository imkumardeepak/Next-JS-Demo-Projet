export type PassOption = {
  type: 'Daily' | 'Weekly' | 'Monthly';
  price: number;
  durationDays: number;
  description: string;
};

export type ActivePass = {
  id: string;
  userId: string;
  userName: string;
  type: 'Daily' | 'Weekly' | 'Monthly';
  purchaseDate: Date;
  expiryDate: Date;
};

export type User = {
    id: string;
    name: string;
    email: string;
};
