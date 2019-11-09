import User from "../../Domain/Entities/User";
import Session from "../../Domain/Entities/Session";


interface AuthenticationService {

    login(user: User, password: string): Promise<Session | null>;

    logout(user: User, session: Session): Promise<void>;

    readSession(user: User): Promise<Session | undefined>;
    
    isLoggedIn(session: Session): Promise<boolean>;

}

export default AuthenticationService;
