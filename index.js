const TG = require('telegram-bot-api')

const bot = new TG({token: '1186953147:AAGDJAC-B5VbeMn3D5mk-Q3P1QlVuN0e9YA'})

// // Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием, то есть "Hello World!")
// bot.onText(/\/echo (.+)/, function (msg, match) {
//   var fromId = msg.from.id; // Получаем ID отправителя
//   var resp = match[1]; // Получаем текст после /echo
//   bot.sendMessage(fromId, resp);
// });

// // Простая команда без параметров
// bot.on('message', function (msg) {
//   var chatId = msg.chat.id; // Берем ID чата (не отправителя)
//   // Фотография может быть: путь к файлу, поток (stream) или параметр file_id
//   var photo = 'cats.png'; // в папке с ботом должен быть файл "cats.png"
//   bot.sendPhoto(chatId, photo, { caption: 'Милые котята' });
// });
console.log('bot', bot)
bot.on('message', (msg) => {
  console.log('msg', msg)
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Привет, Друг!');
});


bot.getMe()
.then(res => {
  //console.log(res)
})
.catch(console.err)