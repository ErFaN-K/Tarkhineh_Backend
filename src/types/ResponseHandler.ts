export default interface ResponseHandler {
  statusCode: number;
  success: boolean;
  data?: any;
  message: string;
  errors?: string[];
}
