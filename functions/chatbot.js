// functions/chatbot.js

export async function handler(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ reply: "✅ Fonction active : FlexBot est bien en ligne." })
  };
}
