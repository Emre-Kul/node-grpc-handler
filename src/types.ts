export type GRPCClientOptions = {
    serviceName: string;
    protoFilePath: string;
    url: string;
};

export type GRPCServerOptions = {
    port: number;
    protoFilePath: string;
    hostname?: string;
    secure?: boolean;
};
