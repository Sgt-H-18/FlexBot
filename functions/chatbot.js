// functions/chatbot.js
export async function handler(event) {
  const { message } = JSON.parse(event.body);

  const prompt = `
Tu es FlexBot, l'assistant IA officiel de Flex&Steel, un collectif de studios de pole dance et d’arts aériens situé à Reims, Charleville et Sedan.

Tu réponds aux élèves et visiteurs de façon bienveillante, claire, professionnelle et positive.

Voici la question posée : ${message}
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, // clé dans variable d'environnement Netlify
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({ reply: data.choices[0].message.content })
  };
}
