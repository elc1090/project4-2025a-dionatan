import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    console.log("🔹 Prompt recebido:", prompt);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("❌ API Key não definida");
      return NextResponse.json(
        { error: "API Key ausente" },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Resposta da IA:", text);

    return NextResponse.json({ response: text });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("❌ Erro na geração:", error.message);
      return NextResponse.json(
        { error: "Erro ao gerar resposta", message: error.message },
        { status: 500 }
      );
    }
    console.error("❌ Erro desconhecido:", error);
    return NextResponse.json(
      { error: "Erro desconhecido" },
      { status: 500 }
    );
  }
}
