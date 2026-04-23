import express from "express";
import OpenAI from "openai";

export const analyzeResume = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: "https://openrouter.ai/api/v1",
    });

    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({ error: "Resume text is required" });
    }

    const prompt = `
Analyze this resume: ${resumeText}

Return ONLY valid JSON.
Do not include backticks or formatting.
{
  "atsScore": number,
  "missingSkills": string[],
  "improvements": string[],
  "jobRoles": string[]
}


Keep response concise.
`;

    const response = await openai.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens:500,
    });
    const content=response.choices[0]?.message?.content || "No response";
    const parsedContent=JSON.parse(content);
    res.json(
      parsedContent
    );

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};