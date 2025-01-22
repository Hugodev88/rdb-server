import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { ReturnUserDto } from './dto/return-user.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from './enum/user-type.enum';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Roles(UserType.Admin)
    @Get('/all')
    async findAll() {
        return (await this.userService.findAll()).map((user) => new ReturnUserDto(user))
    }

    @Post()
    async createUser(@Body() user: User) {
        return new ReturnUserDto(await this.userService.createUser(user))
    }

}
