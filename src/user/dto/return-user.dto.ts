import { User } from "../user.schema";

export class ReturnUserDto {
    id: string;
    name: string;
    email: string;
    rating: number;
    matchId: string[];

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.rating = user.rating;
        this.matchId = user.matchId;
    }
}
