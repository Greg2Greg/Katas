/*
    private value = 2 => private is a Typescript validation during compilation. The Javascript code 
    generated can still access the private value

    #value = 2 => # is a private field in native Javascript. It is not accessible outside the class and cannot be accessed through the generated Javascript code.
    
    The big difference is : 
    with # this won't work => obj["#realPrivate"]; 
*/

interface Dependencies {
  createUser(): () => void;
  retrieveUser(): () => string;
}

/*
    This is a singleton: 
        1. Private constructor to prevent direct instantiation
        2. Static method to initialize the instance with dependencies and try / catch to prevent multiple initializations

    The problem it solves : ensures that only one instance of an "entity" is used throughout the application. 

    Note: often, in clean architecture, we create usecases in the composition root (via self-instantiation or via IOC)
*/
export class UseCases {
  static #instance: UseCases | undefined;

  private constructor(private readonly dependencies: Dependencies) {}

  public static init(dependencies: Dependencies): UseCases {
    if (UseCases.#instance) {
      throw new Error('UseCases already initialized.');
    }

    UseCases.#instance = new UseCases(dependencies);
    return UseCases.#instance;
  }

  public static get instance(): UseCases {
    if (!UseCases.#instance) {
      throw new Error('UseCases must be initialized before use.');
    }

    return UseCases.#instance;
  }

  public createUser() {
    return this.dependencies.createUser();
  }
}

const usecases = UseCases.init({
  createUser: () => () => console.log('User created'),
  retrieveUser: () => () => 'User retrieved',
});

const createUserUsecase = usecases.createUser();
createUserUsecase();
