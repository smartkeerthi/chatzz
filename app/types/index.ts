import { Conversation, Message, User } from '@prisma/client';
import { type } from 'os';

export type GetAllUsersProps = { id: string, username: string, email: string, request: string, image?: string, conversationId?: string }

export type FullMessageType = Message & {
    sender: User;
    seen: User[];
};

export type FullConversationType = Conversation & {
    users: User[];
    Message: FullMessageType[];
};