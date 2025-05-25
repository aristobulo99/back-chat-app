import { TypeChat } from "../../domain/interfaces/chat.interfaces";

export interface MyContacts {
    uc_id: number,
    u_id: number,
    fullName: string,
    email: string,
    nameContact: string,
    isActive: boolean,
    profilePicture: string | null,
    startDate: Date,

}

export interface MyChat {
    c_id: number,
    type: TypeChat,
    name: string,
    photo: string,
    createDate: Date;
    contacts: MyContacts[]
}