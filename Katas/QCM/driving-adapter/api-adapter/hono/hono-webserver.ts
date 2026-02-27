import { serve } from '@hono/node-server';
import { Context, Hono } from 'hono';
import { BlankEnv, BlankSchema } from 'hono/types';
import { StatusCode } from 'hono/utils/http-status';
import { WebserverReplier, RouteHandler } from '../../../shared/abstraction/webserver-replier.ts';
import { Webserver } from '../../../shared/abstraction/webserver.ts';

export class HonoWebserverReplier implements WebserverReplier {
  constructor(private readonly context: Context) {}

  replyJSON(input: { status: StatusCode; payload: Record<string, unknown> }): void {
    const { payload, status } = input;
    this.context.set('payload', payload);
    this.context.set('status', status);
  }

  doReply() {
    const payload = this.context.get('payload') as Record<string, unknown>;
    const status = this.context.get('status') as StatusCode;
    this.context.status(status);
    return this.context.json(payload);
  }
}

export class HonoWebserver extends Webserver<Hono<BlankEnv, BlankSchema, '/'>> {
  protected override doRegisterRoutes(callback: (server: this) => void): this {
    callback(this);
    return this;
  }

  protected override async doStart(): Promise<this> {
    serve(
      {
        fetch: this.server.fetch,
        port: this.port,
      },
      () => {
        console.log(`Hono server is listening on http://localhost:${this.port}`);
      }
    );
    return this;
  }

  /*
    Hono needs explicit return, otherwise NotFound error
    is triggered. That's why doReply().
  */
  post(route: string, handler: RouteHandler): void {
    this.server.post(route, async (context) => {
      const body = await context.req.json();
      const replier = new HonoWebserverReplier(context);
      await handler({ body }, replier);

      return replier.doReply();
    });
  }
}
