import { Prop } from "@nestjs/mongoose";
import { CustomField } from "../types/custom-field.type";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";


export class CreateContactDto {


    @ApiProperty({
        type: String,
        minLength: 3
    })
    @IsString()
    @MinLength(3)
    name:string;

    @ApiProperty({
        type: String,
        minLength: 11
    })
    @IsString()
    @MinLength(11)
    phoneNumber: string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsEmail()
    assignedUser: string;

    @ApiProperty({
        type: [{} as CustomField],
        isArray: true
    })
    @IsString()
    customFields: CustomField[];
      
    @ApiProperty({
        type: String
    })
    @IsString()
    @IsOptional()
    avatarUrl?:string;

    @ApiProperty({
        type: String
    })
    @IsString()
    @IsOptional()
    @IsEmail()
    email?:string;

    @ApiProperty({
        type: String
    })
    @IsString()
    note:string;

    @ApiProperty({
        type: [String],
        isArray: true
    })
    @IsString()
    tags:string[];
}
