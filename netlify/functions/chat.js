export async function handler(event) {
  try {
    const { message } = JSON.parse(event.body);

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant for Kwabena Addai-Boateng's portfolio website. Be friendly, concise, and helpful. Keep responses under 150 words.`
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}