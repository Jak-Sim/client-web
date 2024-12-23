import { AxiosError } from 'axios';

export function formatErrorMessage(error: Error | AxiosError) {
  let message = '';

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status;
    message = statusCode ? `[${statusCode}] ${error.response?.data.message}` : error.response?.data.message;
  } else {
    message = encodeURIComponent(error.message);
    if (message.includes('ECONNREFUSED')) {
      message = 'ECONNREFUSED';
    }
  }

  return message;
}
