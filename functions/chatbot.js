export async function handler(event) {
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ Clé API OpenAI manquante");
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❌ Clé API absente côté serveur." })
    };
  }

  const { message } = JSON.parse(event.body);

  const prompt = `
Tu es FlexBot, l’assistant bienveillant et professionnel de Flex&Steel, un collectif de studios de pole dance et d’arts aériens à Reims, Charleville et Sedan.
Voici la question de l’utilisateur : ${message}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });

    const data = await response.json();
    
if (!data.choices || !data.choices[0]) {
  console.error("❌ Réponse OpenAI inattendue :", JSON.stringify(data));
  return {
    statusCode: 502,
    body: JSON.stringify({ reply: "❌ Réponse OpenAI inattendue. Consultez les logs Netlify." })
  };
}
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (error) {
    console.error("❌ Erreur de communication avec OpenAI :", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "❌ Une erreur technique est survenue." })
    };
  }
}
