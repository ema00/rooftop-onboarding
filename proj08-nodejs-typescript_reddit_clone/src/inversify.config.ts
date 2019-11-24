import { Container, AsyncContainerModule, interfaces, ContainerModule } from "inversify";
import TYPES from "./types";

import HashService from "./Application/Services/HashService";
import TokenService from "./Application/Services/TokenService";
import UserService from "./Application/Services/UserService";
import AuthenticationService from "./Application/Services/AuthenticationService";
import PostService from "./Application/Services/PostService";
import RepositoryFactory from "./Domain/Repositories/RepositoryFactory";

import UserServiceImpl from "./Application/Services/UserServiceImpl";
import AuthenticationServiceImpl from "./Application/Services/AuthenticationServiceImpl";
import PostServiceImpl from "./Application/Services/PostServiceImpl";

import AuthenticationMiddleware from "./Presentation/Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "./Presentation/Middlewares/UserValidatorMiddleware";
import PostValidatorMiddleware from "./Presentation/Middlewares/PostValidatorMiddleware";

import UserController from "./Presentation/Controllers/UserController";
import AuthenticationController from "./Presentation/Controllers/AuthenticationController";
import PostController from "./Presentation/Controllers/PostController";

import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import TokenServiceRandomjs from "./Infrastructure/Services/TokenServiceRandomjs";

import RepositoryFactoryImpl from "./Infrastructure/Persistence/RepositoryFactoryImpl";
import RepositoryFactoryImpl2 from "./Infrastructure/Persistence/RepositoryFactoryImpl2";
import ConnectionProvider from "./Infrastructure/Persistence/ConnectionProvider";


export const container = new Container();


export let asyncContainerModule = new AsyncContainerModule(
        async (bind: interfaces.Bind, unbind: interfaces.Unbind
    ) => {

    const connectionProvider = new ConnectionProvider();
    await connectionProvider.connect();
    bind<ConnectionProvider>(TYPES.ConnectionProvider).toConstantValue(connectionProvider);
});


export let syncContainerModule = new ContainerModule(
    (
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind
    ) => {
    
    // Middlewares
    bind<AuthenticationMiddleware>(AuthenticationMiddleware).toSelf();
    bind<UserValidatorMiddleware>(UserValidatorMiddleware).toSelf();
    bind<PostValidatorMiddleware>(PostValidatorMiddleware).toSelf();

    // Controllers
    bind<UserController>(UserController).toSelf();
    bind<AuthenticationController>(AuthenticationController).toSelf();
    bind<PostController>(PostController).toSelf();

    // Services
    bind<HashService>(TYPES.HashService).to(HashServiceObjecthash);
    bind<TokenService>(TYPES.TokenService).to(TokenServiceRandomjs);
    bind<UserService>(TYPES.UserService).to(UserServiceImpl);
    bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationServiceImpl);
    bind<PostService>(TYPES.PostService).to(PostServiceImpl);

    // Repository Factory
    bind<RepositoryFactory>(TYPES.RepositoryFactory).to(RepositoryFactoryImpl2).inSingletonScope();
});
