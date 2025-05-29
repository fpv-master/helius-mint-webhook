// webhook-server.js
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

app.use(bodyParser.json());

const bot = new TelegramBot(process.env.BOT_TOKEN);
const GROUP_CHAT_ID = process.env.GROUP_CHAT_ID;

app.post('/helius-webhook', async (req, res) => {
  console.log('✅ MINT-событие от Helius:');
  console.dir(req.body, { depth: null });

  try {
    const events = req.body;

    if (!Array.isArray(events)) {
      res.sendStatus(400);
      return;
    }

    for (const event of events) {
      if (event.type !== 'TOKEN_MINT') continue;

      const contract = event.events?.token_mint?.mint || 'неизвестен';
      const owner = event.description?.split(' ')[0] || 'кошелёк';

      await bot.sendMessage(GROUP_CHAT_ID,
        `🪙 *MINT-обнаружен!*\n👤 Адрес: \`${owner}\`\n🧾 Контракт: \`${contract}\``,
        { parse_mode: 'Markdown' });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Ошибка обработки webhook:', err);
    res.sendStatus(500);
  }
});

  try {
    const events = req.body; // массив событий
    if (!Array.isArray(events)) {
      res.sendStatus(400);
      return;
    }

    for (const event of events) {
      if (event.type !== 'TOKEN_MINT') continue;

      const contract = event.events?.token_mint?.mint || 'неизвестен';
      const owner = event.description?.split(' ')[0] || 'кошелёк';

      await bot.sendMessage(GROUP_CHAT_ID,
        `🪙 *MINT-обнаружен!*
👤 Адрес: \`${owner}\`
🧾 Контракт: \`${contract}\``,
        { parse_mode: 'Markdown' });
    }

    res.sendStatus(200);
  } catch (err) {
    console.error('❌ Ошибка обработки webhook:', err);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('🔄 Webhook работает.');
});

app.listen(PORT, () => {
  console.log(`🚀 Webhook-сервер слушает порт ${PORT}`);
});
