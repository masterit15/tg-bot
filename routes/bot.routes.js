const { Router } = require('express')
const TG = require('telegram-bot-api')
const router = Router()
const bot = new TG({ token: '1186953147:AAGDJAC-B5VbeMn3D5mk-Q3P1QlVuN0e9YA' })


bot.getMe()
  .then(res => {
    //console.log(res)
  })
  .catch(console.err)
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