const chatRouter = require('express').Router();
const ChatController = require('../controllers/ChatController');

chatRouter.get('/all', ChatController.getAllChats);
chatRouter.post('/', ChatController.findOrCreateChatByUserId);

module.exports = chatRouter