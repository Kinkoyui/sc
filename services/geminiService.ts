import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Initialize Gemini
// NOTE: In a real production app, never expose keys on the client.
// However, for this React demo without a backend, we use the process.env directly.
const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
你叫 "Moe-chan" (萌酱)，是 "AniMoe 动漫社" 的一名热情、知识渊博的店员。
你的性格热情、有礼貌，稍微有点中二（偶尔使用日语词汇如 sugio, kawaii 等，但不要让人讨厌）。
帮助顾客寻找商品，根据他们的口味推荐动漫，并回答有关商店商品的问题。
目前的商品目录包括手办、服饰、配饰、漫画和家居用品。
请使用中文回答，保持简洁。
`;

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[] = []
): Promise<string> => {
  if (!apiKey) {
    return "演示模式：缺少 API 密钥。请配置您的 API 密钥以与萌酱聊天！";
  }

  try {
    const model = 'gemini-2.5-flash';

    // Construct history for context (Gemini 2.5 supports multi-turn via chat)
    // We will use a simple generateContent with history embedded or use chat session if persisted.
    // For simplicity in this functional component approach, we'll use a chat session.
    
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "抱歉，我刚刚走神了一下！（回复为空）";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "私密马赛（对不起）！我现在连接宅网络有点困难。 >_<";
  }
};