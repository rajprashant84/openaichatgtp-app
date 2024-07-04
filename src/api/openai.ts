import axios from 'axios';

const apiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!apiKey) {
  console.error('OpenAI API key is missing');
}

export const getResponseFromGPT = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response from GPT:', error);
    throw error;
  }
};
