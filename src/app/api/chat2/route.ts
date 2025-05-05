import { BOT_SYSTEM_PROMPT } from "@/lib/botPrompt";
import { getNextFuriaMatch } from "@/lib/furiaData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  let contextInfo = "Nenhuma informação atual da FURIA foi encontrada.";

  try {
    const match = await getNextFuriaMatch();
    if (match) {
      contextInfo = `O próximo jogo da FURIA é contra ${match.opponent} pela ${
        match.league
      } (${match.serie}), com início previsto para ${new Date(
        match.beginsAt
      ).toLocaleString("pt-BR")}.`;
    }
  } catch (err) {
    console.error("Erro ao buscar dados da FURIA:", err);
  }

  console.log(contextInfo);

  // Constrói a lista de mensagens para enviar à API com contexto
  const messages = [
    {
      role: "system",
      content: `
${BOT_SYSTEM_PROMPT}
${contextInfo}
`,
    },
    ...(history || []).map((msg: { sender: string; text: string }) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    })),
    { role: "user", content: message },
  ];

  try {
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY!}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages,
          temperature: 0.8,
        }),
      }
    );

    const data = await response.json();

    console.log(data);

    const reply =
      data.choices?.[0]?.message?.content || "Hmm... não entendi, repete aí!";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Erro ao consultar a API da Groq:", err);
    return NextResponse.json(
      { error: "Erro ao se comunicar com a Groq" },
      { status: 500 }
    );
  }
}
