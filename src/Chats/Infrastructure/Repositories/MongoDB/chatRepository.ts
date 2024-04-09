import { IChatsRepository } from "../../../Domain/interfaces/chatsRepository";
import { Chat } from "../../../Domain/Entities/Chat";
import { Message } from "../../../Domain/Entities/Message";
import { User } from "../../../Domain/Entities/User";
import { IChat, Chat as MongoDbChat, Message as MongoDbMessage } from "./Models/Chat";

export class mongoDbChatRepository implements IChatsRepository{
    async findAll(userId: string): Promise<Chat[]> {
        const chats = await MongoDbChat.find({users: userId})
                            .select({messages: { $slice: -1 }})
                            .select("-updatedAt -__v")
                            .populate({path: "users", select: "-password -confirmed -createdAt -updatedAt -token -__v -confirmAccountToken -changePasswordToken"})
                            .populate({path: "messages", select: "_id readed message sender createdAt"})
        
        return chats.map(createChat);

        function createChat(chat){
            return new Chat(
                chat._id,
                chat.users.map(user => new User(
                    user._id,
                    user.name,
                    user.email
                )),
                chat.messages.map(message => new Message(
                    message._id,
                    message.message,
                    message.sender,
                    message.createdAt,
                    message.readed
                )),
                chat.isGroup,
                chat.groupName,
                chat.createdAt
            );
        }
    }

    async findBy(chatId: string): Promise<Chat> {
        const chat = await MongoDbChat.findById(chatId)
                            .select({messages: { $slice: -100 }})
                            .select("-__v -createdAt -updatedAt")
                            .populate({path: "users", select: "_id name email"})
                            .populate({path: "messages", select: "_id readed message sender createdAt"})
        
        return createChat(chat);

        function createChat(chat: any){
            return new Chat(
                chat._id,
                chat.users.map(user => new User(
                    user._id,
                    user.name,
                    user.email
                )),
                chat.messages.map(message => new Message(
                    message._id,
                    message.message,
                    message.sender,
                    message.createdAt,
                    message.readed
                )),
                chat.isGroup,
                chat.groupName,
                new Date()
            );
        }
    }

    async save(chat: Chat): Promise<Chat> {
        const newChat = new MongoDbChat({
            users: chat.users.map(user => user._id), 
            isGroup: chat.isGroup, 
            groupName: chat.groupName
        });
        
        await newChat.save();

        return await createChat(newChat);

        async function createChat(chat: IChat) {
            const result = await MongoDbChat.findById(chat._id)
            .select("-__v -createdAt -updatedAt")
            .populate({path: "users", select: "_id name email"})
            .populate({path: "messages", select: "_id readed message sender createdAt"})

            return createChat(result);

            function createChat(chat: any){
                return new Chat(
                chat._id,
                chat.users.map(user => new User(
                    user._id,
                    user.name,
                    user.email
                )),
                [],
                chat.isGroup,
                chat.groupName,
                new Date()
                );
            }
        }
    }

    async sendMessage(chatId: string, message: Message): Promise<Message> {
        
        let chat = await MongoDbChat.findById(chatId);
        if(!chat){
            throw new Error("Chat does not exists");
        }
        
        const newMessage = new MongoDbMessage({
            message: message.message,
            sender: message.sender,
            chat: chatId
        });
        await newMessage.save();
        chat.messages = [...chat.messages, newMessage._id];
        await chat.save();

        return new Message(
            newMessage._id,
            newMessage.message,
            new User(newMessage.sender.toString(), "", ""),
            new Date(),
            newMessage.readed
        );
    }

    async exists(chatId: string): Promise<boolean> {
        if(await MongoDbChat.exists({_id: chatId})){
            return true;
        }
        return false;
    }

    async updateMessageStatus(chatId: string, userId: string): Promise<void> {
        const chat = await MongoDbChat.findById(chatId)
                    .select("messages");

        if(!chat){
            throw new Error("Chat does not exists");
        }

        await MongoDbMessage.updateMany({_id: {$in: chat.messages}, sender: userId}, {readed: true})
    }

    async findChatByUsers(users: string[]): Promise<boolean> {
        var result = await MongoDbChat.findOne({users: {$all: users}});
        return result != null;
    }
}
