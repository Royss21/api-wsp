import { ApiProperty } from "@nestjs/swagger";

export class MessageDto {

    @ApiProperty({
        type: String,
        description: 'Numero de celular mas prefijo "51999999999"',
        minimum: 11,
        maxLength: 11
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'Mensaje a enviar',
        minLength: 1
    })
    message: string;
    file?: any;
    caption?: string;
    filename?: string;
    msg?: string;
}