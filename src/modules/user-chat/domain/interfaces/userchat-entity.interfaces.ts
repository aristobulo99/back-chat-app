import { Chat } from "src/modules/chat/domain/chat.entity"
import { User } from "src/modules/user/domain/entity/user.entity"
import { Role, State } from "../../interfaces/user-chat.interface"


export interface UserChatCreate {
    userChat: User,
    chatUser: Chat,
    name: string
}