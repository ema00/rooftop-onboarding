import { Container, AsyncContainerModule, interfaces, ContainerModule } from "inversify";
import TYPES from "./types";

import HashService from "./Application/Services/HashService";
import TokenService from "./Application/Services/TokenService";
import UserService from "./Application/Services/UserService";
import AuthenticationService from "./Application/Services/AuthenticationService";
import PostService from "./Application/Services/PostService";

import UserServiceImpl from "./Application/Services/UserServiceImpl";
import AuthenticationServiceImpl from "./Application/Services/AuthenticationServiceImpl";
import PostServiceImpl from "./Application/Services/PostServiceImpl";

import UserRepository from "./Domain/Repositories/UserRepository";
import UserRoleRepository from "./Domain/Repositories/UserRoleRepository";
import PostRepository from "./Domain/Repositories/PostRepository";
import SessionRepository from "./Domain/Repositories/SessionRepository";

import AuthenticationMiddleware from "./Presentation/Middlewares/AuthenticationMiddleware";
import UserValidatorMiddleware from "./Presentation/Middlewares/UserValidatorMiddleware";
import PostValidatorMiddleware from "./Presentation/Middlewares/PostValidatorMiddleware";

import UserController from "./Presentation/Controllers/UserController";
import AuthenticationController from "./Presentation/Controllers/AuthenticationController";
import PostController from "./Presentation/Controllers/PostController";

import ConnectionProvider from "./Infrastructure/Persistence/ConnectionProvider";
import HashServiceObjecthash from "./Infrastructure/Services/HashServiceObjecthash";
import TokenServiceRandomjs from "./Infrastructure/Services/TokenServiceRandomjs";



export const container = new Container();


export let asyncContainerModule = new AsyncContainerModule(
    async (bind: interfaces.Bind, unbind: interfaces.Unbind
) => {

    // DB Connection Setup
    const connectionProvider = new ConnectionProvider();
    await connectionProvider.connect();
    const connection = connectionProvider.getConnection();

    // Repositories
    bind<UserRepository>(TYPES.UserRepository).toDynamicValue(() => {
        return connection.getCustomRepository(UserRepository);
    }).inTransientScope();
    bind<UserRoleRepository>(TYPES.UserRoleRepository).toDynamicValue(() => {
        return connection.getCustomRepository(UserRoleRepository);
    }).inTransientScope();
    bind<PostRepository>(TYPES.PostRepository).toDynamicValue(() => {
        return connection.getCustomRepository(PostRepository);
    }).inTransientScope();
    bind<SessionRepository>(TYPES.SessionRepository).toDynamicValue(() => {
        return connection.getCustomRepository(SessionRepository);
    }).inTransientScope();

});


export let syncContainerModule = new ContainerModule((
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

});
