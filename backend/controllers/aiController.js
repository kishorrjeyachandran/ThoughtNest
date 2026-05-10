import OpenAI from "openai";
const client = new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY,
});

export const generateText =
  async (req, res) => {
    try {
      const { prompt } =
        req.body;

      const response =
        await client.chat.completions.create(
          {
            model: "gpt-4.1-mini",

            messages: [
              {
                role: "system",
                content:
                  "You are a helpful writing assistant for bloggers.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
          }
        );

      res.json({
        text:
          response.choices[0]
            .message.content,
      });

    } catch (error) {
      console.log(error);

      res.status(500).json({
        message:
          "AI generation failed",
      });
    }
  };