import { User } from '../../orm/entity/User';


export const createUser = async (req, res) => {
    const nickname = req.body.nickname;
    const user = new User();
    user.nickname = nickname;
    user.isActive = true;

    try {
        await user.save();
        res.status(201).json({ user: user });
    }
    catch {
        res.status(500, "DB Error.");
    }
}
