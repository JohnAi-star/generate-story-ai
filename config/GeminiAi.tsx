/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

  export const chatSession = model.startChat({
    generationConfig,
 // safetySettings: Adjust safety settings
 // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {text: "create kids story on description for 6-8 years kids, Educational story, and all images in Paper cut style: story of boy and Magic School. provide the title of the Story, 5 chapter With detailed image text prompt for each of chapter and image prompt for story cover book with story name, all in JSON field formal"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "```json\n{\n  \"story_cover\": {\n    \"image_prompt\": \"A paper cut style illustration of a young boy with bright eyes, wearing a blue backpack and holding a magic wand, standing in front of a colorful, swirling, magical castle with clouds and stars in the sky. Text on the cover: 'The Boy and the Magic School'\",\n    \"description\": \"A captivating cover image featuring a curious boy on a magical adventure, beckoning young readers to delve into the enchanting tale within.\"\n  },\n  \"chapters\": [\n    {\n      \"chapter_title\": \"A Curious Discovery\",\n      \"image_prompt\": \"A paper cut style illustration of a young boy, Liam, with wide eyes staring at a shimmering, golden keyhole in the middle of a towering oak tree in his backyard. The keyhole seems to glow with a soft, magical light.\",\n      \"description\": \"Liam, a boy with an insatiable curiosity, stumbles upon a peculiar sight in his backyard – a glowing keyhole in the heart of an old oak tree. His heart leaps with excitement, a sense of wonder filling him.\"\n    },\n    {\n      \"chapter_title\": \"The Gateway to Magic\",\n      \"image_prompt\": \"A paper cut style illustration of Liam placing a small, silver key, found in his attic, into the glowing keyhole in the oak tree. The tree glows with a brilliant light, and a swirling vortex of colors opens up, revealing a path leading to a magnificent, rainbow-colored castle in the sky.\",\n      \"description\": \"Driven by his curiosity, Liam finds a tiny silver key tucked away in the attic. With trembling hands, he inserts the key into the magical keyhole. The oak tree erupts in a burst of dazzling light, creating a swirling portal that reveals a breathtaking castle floating among the clouds.\"\n    },\n    {\n      \"chapter_title\": \"Welcome to Magic School\",\n      \"image_prompt\": \"A paper cut style illustration of Liam, now wearing a purple robe and carrying a magic wand, walking through the grand, rainbow-colored castle doors of the magic school. Inside, friendly, animal-like creatures with wings and horns, greet Liam with welcoming smiles.\",\n      \"description\": \"As Liam steps through the grand doors of the magical school, he is greeted by a world unlike anything he's ever seen. The castle, filled with vibrant colors and swirling magic, teems with friendly creatures with wings and horns. They welcome Liam with open arms, ready to embark on a journey of enchantment.\"\n    },\n    {\n      \"chapter_title\": \"Learning the Magic\",\n      \"image_prompt\": \"A paper cut style illustration of Liam practicing levitation spells with a group of other children in a classroom inside the magic school. They are levitating colorful balls and laughing, while a friendly, wise owl teacher observes them.\",\n      \"description\": \"In the magic school, Liam joins a group of other children eager to learn the secrets of magic. Together, they practice levitation spells, giggling as they send colorful balls soaring through the air under their control. A wise old owl teacher watches over them, guiding them with gentle advice and encouragement.\"\n    },\n    {\n      \"chapter_title\": \"A Magical Adventure\",\n      \"image_prompt\": \"A paper cut style illustration of Liam, soaring through the sky on a magical flying broom, with the castle and the clouds below him. He is smiling and waving a magic wand as he flies over a beautiful, magical landscape with rainbows, stars, and fantastical creatures.\",\n      \"description\": \"Liam's journey at the magic school is filled with wonder. He learns to ride a magical flying broom, soaring high above the clouds and exploring a fantastical world filled with rainbows, stars, and creatures beyond imagination. With each new adventure, his heart swells with joy and his mind races with excitement.\"\n    }\n  ]\n}\n```"},
        ],
      },
    ],
  });