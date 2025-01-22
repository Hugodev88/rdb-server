import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService
    ) { }

    async login(login: LoginDto) {

        if (!login.email && !login.password) {
            throw new BadRequestException("Você deve colocar o seu e-mail e senha.")
        }

        const user = await this.userService.findUserByEmail(login.email)

        const isMatch = await compare(login.password, user?.password || '');

        if (!user || !isMatch) {
            throw new NotFoundException("E-mail ou senha inválidos.")
        }

        return user

    }

}
