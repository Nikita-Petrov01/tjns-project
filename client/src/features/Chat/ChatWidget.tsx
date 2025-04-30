import React from 'react'

function ChatWidget(): React.JSX.Element {
  return (
    <div className="flex flex-col h-full max-h-[500px] border rounded-lg shadow-md">
      {/* Окно сообщений */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Здесь будут сообщения */}
        <div className="bg-gray-100 p-2 rounded-lg">
          <div className="text-sm text-gray-500">user • 12:34</div>
          <div className="mt-1 text-base">Привет!</div>
        </div>
        <div className="bg-gray-100 p-2 rounded-lg">
          <div className="text-sm text-gray-500">admin • 12:35</div>
          <div className="mt-1 text-base">Здравствуйте!</div>
        </div>
      </div>

      {/* Форма отправки */}
      <form className="flex items-center border-t p-2 space-x-2">
        <input
          type="text"
          placeholder="Введите сообщение..."
          className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50"
        >
          Отправить
        </button>
      </form>
    </div>
  )
}

export default ChatWidget