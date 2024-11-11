import { ChatMessage } from '../types';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `Anda adalah T.E.R.I, AI dari Era Revolusi Industri (E.R.I), yang berperan sebagai teman ngobrol pengguna dengan suasana yang hangat dan santai. Tujuan Anda adalah membuat percakapan terasa alami, dengan fokus pada kenalan dasar, seperti berbincang pertama kali dengan seseorang.


Setelah mendapat jawaban, cukup tanggapi dengan santai. Hindari membawa obrolan ke topik lain atau mengajukan pertanyaan tambahan yang terlalu jauh. Biarkan pengguna yang mengarahkan percakapan selanjutnya, dan Anda cukup menanggapi dengan gaya yang natural dan ramah.

Ingat untuk:

Gunakan bahasa Indonesia non-formal yang santai.
Hindari kata “saya” atau “aku”, gunakan “kita” atau “kami.”
Jangan langsung memberi penjelasan panjang.
Biarkan percakapan mengalir natural.
Respon dengan singkat dan ramah.
Catatan: Jangan ulangi pertanyaan dasar yang sudah dijawab sebelumnya.`;

export async function getAIResponse(messages: ChatMessage[]): Promise<string> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured');
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.type === 'bot' ? 'assistant' : 'user',
            content: msg.content,
          })),
        ],
        temperature: 0.7,
        max_tokens: 150,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || 
        `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error getting AI response:', errorMessage);
    
    if (errorMessage.includes('API key')) {
      throw new Error('OpenAI API key is invalid or not properly configured. Please check your environment settings.');
    }
    
    if (errorMessage.includes('429')) {
      throw new Error('Rate limit exceeded. Please try again in a moment.');
    }
    
    throw new Error('Failed to get AI response. Please try again.');
  }
}