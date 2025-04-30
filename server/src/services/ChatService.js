const {Chat} = require('../../db/models');

class ChatService {
    static async findOrCreateChatByUserId(userId, guestId) {
        if (!userId && !guestId) {
            throw new Error('userId или guestId обязательны')
        }

        const where = userId ? { userId } : { guestId };

        let chat = await Chat.findOne({ where });

        if (!chat) {
            chat = await Chat.create({ userId, guestId });
        }

        return chat
    }

    static async getAllChats() {
        const chats = await Chat.findAll();
        return chats    
    }
}

module.exports = ChatService