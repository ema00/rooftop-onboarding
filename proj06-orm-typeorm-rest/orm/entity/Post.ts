import { User } from "./User";
import { Category } from "./Category";

export class Post {

    id: number;
    title: string;
    content: boolean;
    craftedBy: User;
    category: Category;

}
