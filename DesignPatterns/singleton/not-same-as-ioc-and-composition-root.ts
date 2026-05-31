/*
    In clean architecture, often the usecases are instantiated in the composition root (first file where we configure app), and the usecases are stateless and singleton because we create them only one. But that doesn't mean that the usecases are singletons in the sense of the singleton design pattern. They are just singletons in the sense that we only create one instance of them.
*/

// Usecases (!!!needs to be stateless!!!)
class CreateUser {}
class DeleteUser {}

interface Usecases {
  createUser: CreateUser;
  deleteUser: DeleteUser;
}

// Composition root
// Via self instantiation
const createUser = new CreateUser();
const deleteUser = new DeleteUser();

export const usecases: Usecases = {
  createUser,
  deleteUser,
};

// Via IOC container which ease the instantiation by providing the dependencies automatically (avoids to instantiate one by one and pass by arguments). IOC can be configured to create a new instance on each request (transient) / share same instance during the app lifecycle (singleton).
