export interface AppError {
  statusCode: number;
  message: string;
  details?: any;
  timestamp: Date;
}
