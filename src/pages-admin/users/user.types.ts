export interface User {
  id: string;
  avatar?: string;
  email: string;
  balance: number;
  consumption_amount: number;
  membership_level: 'basic' | 'silver' | 'gold' | 'vip';
  is_active: boolean;
}
