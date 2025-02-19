import * as clc from 'cli-color';

export const formatLogMessage = (message: string, context: string, level: string) => {
  const timestamp = new Date().toISOString();
  
  switch (level) {
    case 'info':
      return clc.blue(`[INFO] ${timestamp} [${context}] ${message}`);
    case 'warn':
      return clc.yellow(`[WARN] ${timestamp} [${context}] ${message}`);
    case 'error':
      return clc.red(`[ERROR] ${timestamp} [${context}] ${message}`);
    case 'debug':
      return clc.green(`[DEBUG] ${timestamp} [${context}] ${message}`);
    default:
      return clc.white(`[${level.toUpperCase()}] ${timestamp} [${context}] ${message}`);
  }
};
