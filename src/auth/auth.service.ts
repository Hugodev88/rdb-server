import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnUserDto } from 'src/user/dto/return-user.dto';
import { PayloadLoginDto } from './dtos/payload-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(login: LoginDto) {
        if (!login.email || !login.password) {
            throw new BadRequestException('Você deve colocar o seu e-mail e senha.');
        }

        const user = await this.userService.findUserByEmail(login.email);

        if (!user) {
            throw new NotFoundException('E-mail ou senha inválidos.');
        }

        const isMatch = await compare(login.password, user.password || '');

        if (!isMatch) {
            throw new NotFoundException('E-mail ou senha inválidos.');
        }

        return {
            accessToken: this.jwtService.sign({ ...new PayloadLoginDto(user) }),
            user: new ReturnUserDto(user), // Cria o DTO de retorno para o usuário
        };
    }
}
