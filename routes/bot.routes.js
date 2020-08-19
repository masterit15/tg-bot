const { Router } = require('express')
const TelegramBot = require('node-telegram-bot-api');
const token = '1186953147:AAGDJAC-B5VbeMn3D5mk-Q3P1QlVuN0e9YA';
const bot = new TelegramBot(token, { polling: true });
const router = Router()

/*
    метод получения
*/
router.get('/', (req, res) => {


  bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"
    bot.sendMessage(chatId, resp);
  });

  bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Получили твое сообщение! Спасибо!');
  });


});







module.exports = router