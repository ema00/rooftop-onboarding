import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


class AuthenticationService {

    public async createSession(user: User, token: string): Promise<Session> {
        const session = new Session(user.id, token);
        await session.save();
        return session;
    }

    public async deleteSession(user: User) {
        let session: Session | undefined = await Session.findOne({ userId: user.id });
        if (!!session) {
            await session.remove();
        }
    }

}

export default AuthenticationService;
