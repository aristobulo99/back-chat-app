import { Message } from "src/modules/message/domain/entity/message.intity";
import { UserChat } from "src/modules/user-chat/domain/userChat.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    c_id: number;

    @Column()
    name: string;

    @Column()
    photo: string;

    @CreateDateColumn()
    createDate: Date;

    @OneToMany(() => UserChat, (userChat) => userChat)
    user: UserChat[];

    @OneToMany(() => Message, (message) => message.chat)
    message: Message[];
}