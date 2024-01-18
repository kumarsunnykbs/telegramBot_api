const Telegram = require("node-telegram-bot-api");
const { OpenAIApi } = require("openai");

const botToken = "";
const openaiToken = "";

const bot = new Telegram(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "Welcome To AI ChatBot");
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  //  const openai = new OpenAIApi({apiKey: openaiToken});
  // Create a message array to maintain conversation context
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: msg.text },
  ];

  // openai.configure({ apiKey: openaiToken });

  const openai = new OpenAIApi({ apiKey: openaiToken });

  const reply = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  bot.sendMessage(chatId, reply.data.choices[0].message.content);
});
