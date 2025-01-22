import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService
    ) { }

    @Get('/all')
    async findAll() {
        return this.userService.findAll()
    }

    @Post()
    async createUser(@Body() user: User) {
        return this.userService.createUser(user)
    }

}
