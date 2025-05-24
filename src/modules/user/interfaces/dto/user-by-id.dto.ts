import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEmpty } from "class-validator";


export class UserDataDto {

    @ApiProperty({example: 'id'})
    @Expose()
    id: number;

    @ApiProperty({example: 'example@example.com'})
    @Expose()
    email: string;

    @ApiProperty({example: 'nombre completo'})
    @Expose()
    fullName: string;
    
    @ApiProperty({example: 'true'})
    @Expose()
    isActive: boolean;

    @ApiProperty({example: 'url'})
    @Expose()
    profilePicture: string | null;
}