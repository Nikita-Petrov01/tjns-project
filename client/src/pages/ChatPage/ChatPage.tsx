import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../shared/lib/hooks';
import { addMessage, setMessage } from '../../entities/chat/model/chatSlice';
import ChatWidget from '../../features/Chat/ChatWidget';
import { findOrCreateChat, getAllMessagesByChat } from '../../entities/chat/model/chatThunks';
import { io } from 'socket.io-client';
import type { MessageT } from '../../entities/chat/model/chatTypes';

const socket = io('http://localhost:3000');

function ChatPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const guestId = useAppSelector((state) => state.user.guestId);
  const chat = useAppSelector((state) => state.chat.chat);

  useEffect(() => {
    if (user === undefined && guestId === undefined) return;

    if (!user && !guestId) return;

    const payload: { userId?: number; guestId?: string } = {};
    if (user) payload.userId = user.id;
    else if (guestId) payload.guestId = guestId;

    void dispatch(findOrCreateChat(payload));
    console.log('Чат создан');
  }, [dispatch, user, guestId]);

  useEffect(() => {
    if (!chat?.id) return;
    console.log('Чат найден');

    socket.emit('join', chat.id);
    void dispatch(getAllMessagesByChat(chat.id));
    console.log('Сообщения получены');

    socket.on('message', (message: MessageT) => {
      dispatch(addMessage(message));
    });

    return () => {
      socket.off('message');
    };
  }, [chat?.id, dispatch]);

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {chat?.id ? (
        <ChatWidget socket={socket} />
      ) : (
        <div className="text-gray-500">Чат не инициализирован</div>
      )}
    </div>
  );
}

export default ChatPage;
