import * as protoLoader from "@grpc/proto-loader";
import grpc from "grpc";
import { GRPCServerOptions } from "./types";

export class GRPCServer {

    private readonly options: GRPCServerOptions;
    private instance: any;
    private proto: any;

    constructor(options: GRPCServerOptions) {
        this.options = options;

        this.instance = this.create();
    }

    public listen() {
        this.instance.start();
    }

    public registerService(serviceName: string, impl: any) {
        this.instance.addService(this.proto[serviceName].service, impl);
    }

    private create() {
        try {
            const packageDefinition = protoLoader.loadSync(this.options.protoFilePath);
            this.proto = grpc.loadPackageDefinition(packageDefinition);
        } catch (e) {
            console.log("Error Happened");
        }
        const server = new grpc.Server();
        const hostname = this.options.hostname ? this.options.hostname : "0.0.0.0";
        server.bind(`${hostname}:${this.options.port}`, grpc.ServerCredentials.createInsecure());
        return server;
    }

}
