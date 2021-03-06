import { injectable } from "inversify";
import HashService from "../../Application/Services/HashService";


@injectable()
class HashServiceObjecthash implements HashService {
    
    private readonly hash = require("object-hash");


	public getStringHash(str: string): string {
        return this.hash(str, { algorithm: "sha3-512", encoding: "base64" });
    }

    public getNumberHash(num: number): string {
        return this.hash(num, { algorithm: "sha3-512", encoding: "base64" });
    }

    public equals(h1: string, h2: string): boolean {
        return h1.valueOf() === h2.valueOf();
    }

}

export default HashServiceObjecthash;
