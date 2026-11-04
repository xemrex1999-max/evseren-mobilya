const adminAuth = require('../../utils/adminAuth');
const { GoogleGenAI } = require('@google/genai');

const handler = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: 'imageUrl required' });

    // Initialize AI
    const api_key = process.env.GEMINI_API_KEY;
    if (!api_key) throw new Error("GEMINI_API_KEY is not defined in environment.");
    
    const ai = new GoogleGenAI({ apiKey: api_key });

    // Fetch the image to base64
    const imageResp = await fetch(imageUrl);
    const arrayBuffer = await imageResp.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    const mimeType = imageResp.headers.get('content-type') || 'image/jpeg';

    const prompt = `You are an expert e-commerce assistant.
Analyze this product image. Identify what furniture it is.
Search the internet to find real data, real specifications (dimensions, material, etc.), and typical price range for this exact or highly similar product on the Turkish market.
Based on your findings, formulate a unique, SEO-friendly description in Turkish.
Return EXACTLY a JSON object with this structure:
{
  "name": "Product Name",
  "category": "mobilya",
  "price": 12500,
  "description": "SEO friendly description..."
}
Do not use markdown blocks, just raw JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
           role: 'user', 
           parts: [
               { inlineData: { data: base64Image, mimeType: mimeType } },
               { text: prompt }
           ]
        }
      ],
      config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json"
      }
    });

    const data = JSON.parse(response.text);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'AI Üretimi başarısız oldu', error: error.message });
  }
};

module.exports = adminAuth(handler);
