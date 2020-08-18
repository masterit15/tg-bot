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
  bot.on('message', (msg) => {
    console.log('msg', msg)
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Привет, Друг!');
    return res.json({
      success: true,
    });
  });

});

module.exports = router