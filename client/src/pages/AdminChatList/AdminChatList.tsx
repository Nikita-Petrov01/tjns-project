import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../shared/lib/hooks";
import { getAllChats } from "../../entities/chat/model/chatThunks";
import { useNavigate } from "react-router";
// import { io } from "socket.io-client";

export function AdminChatList(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const allChats = useAppSelector((s) => s.chat.allChats);
    const navigate = useNavigate();
    // const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
    // const socket = useMemo(() => io('http://localhost:3000'), []);
  
    useEffect(() => {
      void dispatch(getAllChats());
    }, [dispatch]);

    const handleOpenChat = (chatId: number): void => {
      void navigate(`/admin/chat/${(chatId).toString()}`);
    }

    return (
      <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Все чаты пользователей</h1>
      {allChats.length === 0 ? (
        <div className="text-gray-500">Нет активных чатов</div>
      ) : (
        allChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => handleOpenChat(chat.id)}
            className="cursor-pointer border p-4 rounded-lg hover:bg-gray-100"
          >
            <div className="text-lg font-medium">
              {chat.userId ? `Пользователь #${(chat.userId).toString()}` : `Гость: ${chat?.guestId}`}
            </div>
          </div>
        ))
      )}
    </div>
    );
  }
  