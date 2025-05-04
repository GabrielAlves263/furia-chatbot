interface ChatBubbleProps {
  text: string;
  sender: "user" | "bot";
}

export default function ChatBubble({ text, sender }: ChatBubbleProps) {
  const isBot = sender === "bot";

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3`}>
      {isBot && (
        <img
          src="/furioso-avatar.png"
          alt="Furioso"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div
        className={`max-w-xs px-4 py-2 rounded-xl shadow-md ${
          isBot ? "bg-gray-800 text-white" : "bg-blue-600 text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
