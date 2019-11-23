import UserRepository from "../../Domain/Repositories/UserRepository";
import UserRoleRepository from "../../Domain/Repositories/UserRoleRepository";
import PostRepository from "../../Domain/Repositories/PostRepository";
import SessionRepository from "../../Domain/Repositories/SessionRepository";


interface RepositoryFactory {

    getUserRepository(): UserRepository;

    getUserRoleRepository(): UserRoleRepository;

    getPostRepository(): PostRepository;

    getSessionRepository(): SessionRepository;

}

export default RepositoryFactory;
