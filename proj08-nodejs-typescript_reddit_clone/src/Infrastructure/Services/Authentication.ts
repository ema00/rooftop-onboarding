import Session from "../../Domain/Entities/Session";
import User from "../../Domain/Entities/User";


class Authentication {

    public async getUser(token: string): Promise<User> {
        const session: Session | undefined = await Session.findOne({ token: token });
        if (!session || !session.isValid()) {
            throw new Error("Authentication Required");
        }
        return session.user;
    }

    public async updateToken(user: User, token: string) {
        let session: Session | undefined = await Session.findOne({ user: user });
        if (!session) {
            session = new Session(user, token);
        }
        session.save();
    }

    public async invalidateToken(user: User) {
        let session: Session | undefined = await Session.findOne({ user: user });
        if (!!session) {
            session.invalidateToken();
            session.save();
        }
    }

}

export default Authentication;
