import { FastifyInstance, FastifyReply } from 'fastify';
import { WebserverReplier, RouteHandler } from '../../../shared/abstraction/webserver-replier.ts';
import { Webserver } from '../../../shared/abstraction/webserver.ts';

export class FastifyWebserverReplier implements WebserverReplier {
  constructor(private readonly fastifyReply: FastifyReply) {}

  replyJSON(input: { status: number; payload: Record<string, unknown> }): void {
    const { payload, status } = input;
    this.fastifyReply.status(status).send(payload);
  }
}

export class FastifyWebserver extends Webserver<FastifyInstance> {
  protected override doRegisterRoutes(callback: (server: this) => void): this {
    this.server.register(() => callback(this));
    return this;
  }

  protected override async doStart(): Promise<this> {
    try {
      await this.server.listen({ port: this.port });
      return this;
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  }

  post(route: string, handler: RouteHandler): void {
    this.server.post(route, (request, reply) => {
      const fastifyReplier = new FastifyWebserverReplier(reply);
      handler(request, fastifyReplier);
    });
  }
}
