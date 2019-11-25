import { isUndefined, isNullOrUndefined } from "util";
import { injectable, inject } from "inversify";
import TYPES from "../../types";
import AuthenticationService from "./AuthenticationService";
import TokenService from "./TokenService";
import HashService from "./HashService";
import SessionRepository from "../../Domain/Repositories/SessionRepository";
import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


@injectable()
class AuthenticationServiceImpl implements AuthenticationService {

    private readonly sessionRepository: SessionRepository;
    private readonly tokenService: TokenService;
    private readonly hashService: HashService;


    constructor(
        @inject(TYPES.SessionRepository) sessionRepository: SessionRepository,
        @inject(TYPES.TokenService) tokenService: TokenService,
        @inject(TYPES.HashService) hashService: HashService
    ) {
        this.sessionRepository = sessionRepository;
        this.tokenService = tokenService;
        this.hashService = hashService;
    }


    public async login(user: User, password: string): Promise<Session | null> {
        if (isNullOrUndefined(user)) {
            throw new Error().message = "Cannot generate token for invalid user.";
        }
        if (isNullOrUndefined(password)) {
            throw new Error().message = "Invalid password.";
        }
        
        const pass = this.hashService.getStringHash(password);
        if (pass.valueOf() === user.pass.valueOf()) {
            const token = this.tokenService.getToken();
            const session = new Session(user.id, token);
            return this.sessionRepository.save(session);
        }
        else {
            return null;
        }
    }

    public async logout(user: User, session: Session): Promise<void> {
        if (isNullOrUndefined(user)) {
            throw new Error().message = "Invalid user.";
        }
        if (isNullOrUndefined(session)) {
            throw new Error().message = "Invalid session.";
        }

        let storedSession: Session | undefined = await this.readSession(user);
        if (!isUndefined(storedSession) && session.equals(storedSession)) {
            await this.sessionRepository.remove(session);
        }
    }

    public async readSession(user: User): Promise<Session | undefined> {
        if (isNullOrUndefined(user)) {
            throw new Error().message = "Invalid user.";
        }

        return this.sessionRepository.findOne({ userId: user.id });
    }

    public async isLoggedIn(session: Session): Promise<boolean> {
        if (isNullOrUndefined(session)) {
            throw new Error().message = "Invalid session.";
        }

        const sessions = await this.sessionRepository.find(
            { where: { id: session.userId, token: session.token } });
        // This is necessary because TypeOrm fails to do the above query correctly
        return sessions.length > 0 && session.equals(sessions[0]);
    }

}

export default AuthenticationServiceImpl;
