import { User } from '../../orm/entity/User';

export const createUser = async (req, res) => {
    const nickname = req.body.nickname;

    const user = new User();
    user.nickname = nickname;
    user.isActive = true;

    try {
        await user.save();
        res.json({message: "Todo bien", user: user});
    }
    catch {
        res.status(500, "DB Error");
    }
}

export default createUser;
