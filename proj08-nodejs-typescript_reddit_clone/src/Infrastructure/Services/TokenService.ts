import { nodeCrypto, string } from "random-js";


const TOKEN_LENGTH = 88;


class TokenService {

    private readonly distribution = string();


	public getToken(): string {
        return this.distribution(nodeCrypto, TOKEN_LENGTH);
    }

}

export default TokenService;
