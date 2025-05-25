import { Chat } from "src/modules/chat/domain/chat.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    m_id: number;

    @Column()
    content: string;

    @Column()
    transmitter: number;

    @CreateDateColumn()
    issueDate: Date;

    @ManyToOne(() => Chat, (chat) => chat.message)
    chat: Chat;
}