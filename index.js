import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());

app.post('/helius-webhook', (req, res) => {
  console.log('✅ MINT-событие от Helius:');
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  res.send('Helius Webhook работает!');
});

app.listen(port, () => {
  console.log(`🚀 Сервер слушает порт ${port}`);
});
