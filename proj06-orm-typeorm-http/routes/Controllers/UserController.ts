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


export const searchUser = async (req, res) => {
    let search = null;

    if (req.body.id) {
        search = { id: req.body.id };
    }
    else if (req.body.nickname) {
        search = { nickname: req.body.nickname };
    }
    else {
        return res.status(400).json([]);
    }

    try {
        const user = await User.findOne({ where: search });
        if (user) {
            res.status(200).json([user]);
        }
        else {
            res.status(404).json([]);
        }
    }
    catch {
        res.status(500, "DB Error");
    }
}
