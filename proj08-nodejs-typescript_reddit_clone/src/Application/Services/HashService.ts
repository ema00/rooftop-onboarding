

interface HashService {

	getStringHash(str: string): string;

    getNumberHash(num: number): string;

    equals(h1: string, h2: string): boolean;

}

export default HashService;
