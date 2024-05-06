enum RequestType {
  PROVIDER = 0,
  COMPANY = 1,
}

export interface Request {
  type: RequestType; // 0: Provider, 1: Company
  field: string;
  oldValue: string;
  newValue: string;
  owner: string;
}
