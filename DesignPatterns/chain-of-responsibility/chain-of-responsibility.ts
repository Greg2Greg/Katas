/*
  Allows to avoid coupling the sender of a request to its receiver. The request is passed along the chain so it must have same interface.
  Each handler either handles the request or passes it to the next handler in the chain. The last handler in the chain is usually a default handler that handles any request.
*/
export interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | undefined;
}

type HandleRequest = (request: string) => string | undefined;

export const createBaseHandler = (handleRequest: HandleRequest): Handler => {
  let nextHandler: Handler | undefined;

  return {
    setNext(handler: Handler): Handler {
      nextHandler = handler;
      return handler;
    },

    handle(request: string): string | undefined {
      const handled = handleRequest(request);
      if (handled !== undefined) {
        return handled;
      }

      return nextHandler?.handle(request);
    },
  };
};

export const monkeyHandler = createBaseHandler((request) => {
  if (request === 'Banana') {
    return `Monkey: I'll eat the ${request}.`;
  }
});

export const squirrelHandler = createBaseHandler((request) => {
  if (request === 'Nut') {
    return `Squirrel: I'll eat the ${request}.`;
  }
});

export const dogHandler = createBaseHandler((request) => {
  if (request === 'MeatBall') {
    return `Dog: I'll eat the ${request}.`;
  }
});

export const buildAnimalFoodChain = (): Handler => {
  monkeyHandler.setNext(squirrelHandler).setNext(dogHandler);
  return monkeyHandler;
};

export const handleFoodRequest = (food: string): string => {
  const chain = buildAnimalFoodChain();
  return chain.handle(food) ?? `Nobody wants to eat ${food}.`;
};
