import { useEffect, useState } from "react";

export default function FuriosoEntry() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 300); // Delay para criar suspense

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="furioso-avatar-enter flex items-center justify-center gap-3 p-4">
      <img
        src={"furioso-avatar.png"}
        alt="O Furioso"
        className="w-14 h-14 rounded-full shadow-xl border-2 border-purple-600"
      />
      <div className="text-white text-lg font-semibold animate-pulse">
        O Furioso entrou no lobby!
      </div>
    </div>
  );
}
