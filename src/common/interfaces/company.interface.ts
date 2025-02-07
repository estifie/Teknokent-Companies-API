export interface Company {
  name: string;
  website: string;
  contact: {
    email: string | undefined;
    phone: string | undefined;
    address: string | undefined;
  };
  details: {
    sector: number | undefined;
  };
}
