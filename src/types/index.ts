
export interface IOptions {
    port: number;
    allowed_ips: string[];
    basicAuth: string[];
    dirList: boolean;
    serveDir: string;
    open: boolean;
    allowHttp: boolean;
}
