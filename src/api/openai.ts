import axios from 'axios';

const apiKey = "process.env.REACT_APP_OPENAI_API_KEY";

console.log('API Key:', apiKey); // For debugging purposes (remove in production)

if (!apiKey) {
  console.error('OpenAI API key is missing');
}

export const getResponseFromGPT = async (prompt: string): Promise<string> => {
  const response = await axios.post(
    'https://api.openai.com/v1/completions',
    {
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150,
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].text;
};

