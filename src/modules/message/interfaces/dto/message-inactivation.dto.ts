import { PickType } from "@nestjs/swagger";
import { UpdateContentMessage } from "./update-content-message.dto";


export class MessageInactivation extends PickType(UpdateContentMessage, ['messageId'] as const){}