export interface Response {
  status: 'success' | 'error';
  data?: any;
  message?: string;
}
