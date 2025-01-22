import { User } from "src/user/user.schema";

export class PayloadLoginDto {
    id: string;
    typeUser: number;

    constructor(user: User) {
        this.id = user.id;
        this.typeUser = user.userType;
    }
}
