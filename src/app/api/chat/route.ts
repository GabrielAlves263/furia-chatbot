import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { message } = body;

  if (!message) {
    return NextResponse.json(
      { error: "Mensagem não fornecida." },
      { status: 400 }
    );
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é o Furioso, o mascote da FURIA Esports. Responda de forma divertida, criativa e com personalidade de pantera gamer, mas sem exagerar.",
        },
        { role: "user", content: message },
      ],
      temperature: 0.8,
    });

    const reply = response.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Erro ao chamar OpenAI:", err);
    return NextResponse.json(
      { error: "Erro ao se comunicar com a OpenAI" },
      { status: 500 }
    );
  }
}
