import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { createMessage, getAllMessagesByChat } from '../../entities/chat/model/chatThunks';
import { io } from 'socket.io-client';
import type { MessageT } from '../../entities/chat/model/chatTypes';
import { addMessage, removeChat } from '../../entities/chat/model/chatSlice';

const socket = io('http://localhost:3000');

function AdminChatPage(): React.JSX.Element {
    const [input, setInput] = React.useState<string>('');
  const { chatId } = useParams();
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);

  useEffect(() => {
    void dispatch(getAllMessagesByChat(Number(chatId)));
  }, [chatId]);

  useEffect(() => {
    socket.emit('join', chatId);

    socket.on('message', (message: MessageT) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('message');
    };
  }, [chatId]);

  const handleSend = () => {
      if (!input.trim() || !chatId) return;
      
      const newMessage = {
        chatId: Number(chatId),
        content: input,
        sender: 'admin',
      }; 
      
      try {
        const result = dispatch(createMessage(newMessage)).unwrap();
        socket.emit('message', result);
        setInput('');
      } catch (error) {
        console.error('Не удалось отправить сообщение:', error);
      }
  }
  return (
    <div className="max-w-3xl mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-semibold">Чат #{chatId}</h2>
      <div className="border rounded p-4 h-96 overflow-y-auto bg-white shadow">
        {messages.map(msg => (
          <div key={msg.id} className="mb-2">
            <div className="text-sm text-gray-500">{msg.sender}</div>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded px-4 py-2"
          placeholder="Введите сообщение..."
        />
        <button
          onClick={handleSend}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Отправить
        </button>
      </div>
    </div>
  )
}

export default AdminChatPage;
