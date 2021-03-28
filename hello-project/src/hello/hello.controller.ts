import { Controller, Post, Body, Get, Header, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PersonDto } from './dto/person.dto';
import { HelloService } from './hello.service';
import { ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

@Controller('hello')
export class HelloController {
    constructor(
        private readonly helloService: HelloService,
    ) {}

    @Post('welcome')
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Say Hello!!!' })
    async sayWelcome(@Body() personDto: PersonDto): Promise<{data : String}> {
        let msg = await this.helloService.welcome(personDto);
        return {data: msg};
    }

    @ApiResponse({ status: 200})
    @ApiQuery({
        name: 'name',
        required: true,
        type: String,
    })
    @ApiQuery({
        name: 'year',
        required: false,
        type: Number,
        description :`you can ignore this`
    })

    @Get('welcome')
    async sayWelcome2(@Query() personDto: PersonDto): Promise<{data : String}> {
        let msg = await this.helloService.welcome(personDto);
        return {data : msg};
    }
}