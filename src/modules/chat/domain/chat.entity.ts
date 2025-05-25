import { Message } from "src/modules/message/domain/entity/message.intity";
import { UserChat } from "src/modules/user-chat/domain/userChat.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TypeChat } from "./interfaces/chat.interfaces";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    c_id: number;

    @Column()
    type: TypeChat

    @Column()
    name: string;

    @Column()
    photo: string;

    @CreateDateColumn()
    createDate: Date;

    @OneToMany(() => UserChat, (userChat) => userChat.chatUser)
    user: UserChat[];

    @OneToMany(() => Message, (message) => message.chat)
    message: Message[];
}