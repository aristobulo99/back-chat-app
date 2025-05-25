import { User } from "src/modules/user/domain/entity/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role, State } from "../interfaces/user-chat.interface";
import { Chat } from "src/modules/chat/domain/chat.entity";

@Entity()
export class UserChat {
    @PrimaryGeneratedColumn()
    uc_id: number;

    @Column()
    name: string;

    @Column({ default: Role.member })
    role: Role;

    @Column({ default: State.active })
    state: State;

    @CreateDateColumn()
    startDate: Date;

    @ManyToOne(() => User, (user) => user.chats)
    userChat: User;

    @ManyToOne(() => Chat, (chat) => chat.user)
    chatUser: Chat;
}