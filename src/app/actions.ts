'use server';

import { generateChatResponse, GenerateChatResponseInput } from "@/ai/flows/generate-chat-response";

export async function getAiResponse(input: GenerateChatResponseInput) {
  try {
    const { response } = await generateChatResponse(input);
    return { success: true, response };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get AI response." };
  }
}
