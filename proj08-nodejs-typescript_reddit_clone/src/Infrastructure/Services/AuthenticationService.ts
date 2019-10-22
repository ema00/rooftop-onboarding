import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


class AuthenticationService {

    public async createSession(user: User, token: string): Promise<Session> {
        const session = new Session(user.id, token);
        await session.save();
        return session;
    }

    public async deleteSession(user: User) {
        let session: Session | undefined = await this.readSession(user);
        if (!!session) {
            await session.remove();
        }
    }

    public async readSession(user: User): Promise<Session | undefined> {
        return await Session.findOne({ userId: user.id });
    }

}

export default AuthenticationService;
