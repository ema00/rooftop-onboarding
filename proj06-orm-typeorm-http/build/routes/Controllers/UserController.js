"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../../orm/entity/User");
exports.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const nickname = req.body.nickname;
    const user = new User_1.User();
    user.nickname = nickname;
    user.isActive = true;
    try {
        yield user.save();
        res.status(201).json({ user: user });
    }
    catch (_a) {
        res.status(500, "DB Error");
    }
});
exports.readUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const id = req.body.id;
    try {
        const user = yield User_1.User.findOne(id);
        res.status(200).json({ user: user });
    }
    catch (_b) {
        res.status(404);
    }
});
//export default createUser;
//# sourceMappingURL=UserController.js.map