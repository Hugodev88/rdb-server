import { User } from "src/user/user.schema";

export class PayloadLoginDto {
    id: string;

    constructor(user: User) {
        this.id = user.id;
    }
}
