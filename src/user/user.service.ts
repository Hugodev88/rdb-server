import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async createUser(userData: Partial<User>): Promise<User> {

        // Verificação dos campos
        if (!userData.name || !userData.email || !userData.password) {
            throw new BadRequestException('Todos os campos devem ser preenchidos.')
        }

        // Verificando se já existe usuário com esse email
        const user = await this.userModel.where({ email: userData.email })
        if (user.length > 0) {
            throw new BadRequestException('Esse e-mail já foi usado.')
        }

        // Criptografando a senha
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userData.password, saltOrRounds);
        userData.password = hashedPassword;

        // Salvando o usuário no banco de dados
        const createdUser = new this.userModel(userData);

        return createdUser.save()
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ email }).exec();
    }



}
