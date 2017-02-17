
export interface Options {
    port: number;
    allowed_ips: string[];
    basicAuth: string[];
    dirList: boolean;
    serveDir: string;
    opbeat: boolean;
    open: boolean;
}
