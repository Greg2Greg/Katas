export interface WebserverReplier {
  replyJSON(input: { status: number; payload: Record<string, unknown> }): void;
}

type TRequest = { body: unknown };
export type RouteHandler = (request: TRequest, reply: WebserverReplier) => Promise<void>;
