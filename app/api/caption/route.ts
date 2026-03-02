//CAPTION

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const POST = async (req: Request) => {
  try {
    const { image } = await req.json();

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: "Describe this image in detail.",
            },
            {
              type: "input_image",
              image_url: `data:image/jpeg;base64,${image}`,
              detail: "auto",
            },
          ],
        },
      ],
    });

    const caption = response.output_text;

    return NextResponse.json({ caption });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
};
