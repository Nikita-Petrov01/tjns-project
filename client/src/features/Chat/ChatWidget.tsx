import React from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import type { Socket } from 'socket.io-client';
import { createMessage } from '../../entities/chat/model/chatThunks';

type ChatWidgetProps = {
  socket: Socket;
};

function ChatWidget({ socket }: ChatWidgetProps): React.JSX.Element {
  const [input, setInput] = React.useState<string>('');
  const dispatch = useAppDispatch();
  const messages = useAppSelector((state) => state.chat.messages);
  const user = useAppSelector((state) => state.user.user);
  const chat = useAppSelector((state) => state.chat.chat);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
  
    if (!input.trim() || !chat?.id || !socket) return;
  
    const newMessage = {
      chatId: chat.id,
      content: input,
      sender: user ? 'user' : 'guest',
    };
  
    try {
      const result = dispatch(createMessage(newMessage)).unwrap();
      socket.emit('message', result); // отправляем уже сохранённое сообщение
      setInput('');
    } catch (err) {
      console.error('Не удалось отправить сообщение:', err);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[500px] border rounded-lg shadow-md">
      {/* Сообщения */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="bg-gray-100 p-2 rounded-lg">
            <div className="text-sm text-gray-500">{msg.sender}</div>
            <div className="mt-1 text-base">{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="flex items-center border-t p-2 space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Введите сообщение..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          Отправить
        </button>
      </form>
    </div>
  );
}

export default ChatWidget;
