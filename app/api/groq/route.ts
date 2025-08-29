import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer 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`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return NextResponse.json({ error: 'Failed to fetch from Groq API' }, { status: 500 });
  }
}