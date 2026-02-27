import { RouteHandler } from './webserver-replier.ts';

export abstract class Webserver<TServer> {
  protected readonly server: TServer;
  protected port: number;
  protected beforeStartHook?: (server: TServer) => Promise<void>;

  constructor(server: TServer) {
    this.server = server;
  }

  withPort(port: number): this {
    this.port = port;
    return this;
  }

  withBeforeStartHook(callback: (server: TServer) => Promise<void>): this {
    this.beforeStartHook = callback;
    return this;
  }

  registerRoutes(callback: (server: this) => void): this {
    this.doRegisterRoutes(callback);
    return this;
  }

  protected abstract doRegisterRoutes(callback: (server: this) => void): this;

  async start(): Promise<this> {
    if (this.beforeStartHook) {
      await this.beforeStartHook(this.server);
    }

    return await this.doStart();
  }

  protected abstract doStart(): Promise<this>;

  abstract post(route: string, callback: RouteHandler): void;
}
