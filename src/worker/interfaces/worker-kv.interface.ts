export interface WorkerKvPayload {
  domain: string;
  key: string;
  menu: Record<string, any>;
}

export interface WorkerKvResponse {
  success: boolean;
  message?: string;
  error?: string;
}
