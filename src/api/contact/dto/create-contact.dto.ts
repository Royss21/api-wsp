import { Prop } from "@nestjs/mongoose";
import { CustomField } from "../types/custom-field.type";
import { IsString, MinLength } from "class-validator";
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

    assignedUser: string;

    customFields: CustomField[];
      
    avatarUrl?:string;

    email?:string;

    note:string;

    tags:string[];
}
