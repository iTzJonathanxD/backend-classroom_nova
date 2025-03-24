export interface EnvVars {
    PORT: number;
    MONGO_URI: string;
    TOKEN_SECRETKEY: string;
    CORS_ORIGIN: string;
    SSL_ENABLED: boolean;
    SSL_KEY_PATH: string;
    SSL_CERT_PATH: string;
}