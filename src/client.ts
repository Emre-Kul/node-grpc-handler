import * as protoLoader from "@grpc/proto-loader";
import grpc from "grpc";
import { GRPCClientOptions } from "./types";

export class Client {

    private readonly options: GRPCClientOptions;
    private app: any;

    constructor(options: GRPCClientOptions) {
        this.options = options;
        this.create();
    }

    public fetch(serviceMethodName: string, payload: any) {
        return new Promise( (resolve, reject) => {
            this.app[serviceMethodName](payload, (err: any, res: any) => {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    }

    private create() {
        try {
            const packageDefinition = protoLoader.loadSync(this.options.protoFilePath);
            const packageObject = grpc.loadPackageDefinition(packageDefinition);
            // @ts-ignore
            this.app = new packageObject[this.options.serviceName](this.options.url, grpc.credentials.createInsecure());
        } catch (e) {
            console.log("GRPC CLIENT - Error Happened");
        }

    }

}
