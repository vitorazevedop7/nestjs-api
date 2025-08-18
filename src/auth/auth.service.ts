import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password);

        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
            },
        });

        //delete user.hash; 
        const { hash: _, ...userWithoutHash } = user; // lógica para remover o hash da resposta alternativa 

        return userWithoutHash;
    }

    signin() {
        return {msg: 'I am signed in!'};
    }

}
