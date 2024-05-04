export interface Provider {
  code: string;
  website: string;
  title: {
    short: string;
    full: string;
  };
  cityId: number;
  contact: {
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
  };
}
