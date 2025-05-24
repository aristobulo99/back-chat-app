import { UserChat } from "src/modules/user-chat/domain/userChat.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column({default: true})
    isActive: boolean;

    @Column({nullable: true})
    profilePicture: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => UserChat, (userChat) => userChat.userChat)
    chats: UserChat[]
}
