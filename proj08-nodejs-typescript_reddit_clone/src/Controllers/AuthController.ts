import { Request, Response } from "express";
import { nodeCrypto, string } from "random-js";
import User from "../Entities/User"


const TOKEN_LENGTH = 48;


export class AuthController {

    public static async getToken(req: Request, res: Response) {
        const hash = require("object-hash");

        const { name, password } = req.body;

        try {
            const user = await User.findOne({ where: { name: name } })
            const pass: string = hash(password, { algorithm: 'sha3-512', encoding: 'base64' });

            if (user && user.pass.valueOf() == pass.valueOf()) {
                const distribution = string();
                const accessToken = distribution(nodeCrypto, TOKEN_LENGTH);
                res.status(200).json({ token: accessToken, id: user.id });
            }
            else {
                res.status(400).json({});
            }
        }
        catch {
            res.status(500).json({});;
        }

    }

}
