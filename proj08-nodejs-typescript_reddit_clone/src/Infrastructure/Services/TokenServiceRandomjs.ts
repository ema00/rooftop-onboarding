import { nodeCrypto, string } from "random-js";
import TokenService from "../../Application/Services/TokenService";


class TokenServiceRandomjs implements TokenService {

    private readonly TOKEN_LENGTH = 88;

    private readonly distribution = string();


	public getToken(): string {
        return this.distribution(nodeCrypto, this.TOKEN_LENGTH);
    }

    public tokenLength(): number {
        return this.TOKEN_LENGTH;
    }

}

export default TokenServiceRandomjs;
