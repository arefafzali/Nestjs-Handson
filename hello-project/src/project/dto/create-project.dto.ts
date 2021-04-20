import { ApiProperty } from "@nestjs/swagger";

export default class CreateProjectDto {
    @ApiProperty({description: 'Enter project name > ', minLength: 3, default: 'project1'})
    readonly name: string;
}