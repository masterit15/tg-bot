const db = require('./db')
const TelegramBot = require('node-telegram-bot-api');
const token = '1186953147:AAGDJAC-B5VbeMn3D5mk-Q3P1QlVuN0e9YA';
const bot = new TelegramBot(token, { polling: true });

const Site = require('./model/Sites')

const request = require('request');
async function testSite(){
  sitesArr = await Site.findAll({raw: true })
  sitesArr.forEach(site => {
      request(site.url, function (err, res, body) {
        if (err){
          bot.sendMessage(site.chatId, `Сайт ${site.url}, не доступен!!!`);
        } 
      });
  });
}
setInterval(() => {
  testSite()
}, 2400000);

function isValidUrl(url) {
  let objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return objRE.test(url);
}
async function addS(msg){
  let chatId = msg.chat.id;
  let comannd = msg.text.split('/add ')
  let url = comannd[1]
  if (isValidUrl(url)) {
    let site = await Site.findOne({ where: { url: url }, raw: true })
    if (site) {
      bot.sendMessage(chatId, `${msg.from.first_name}, такой сайт ты уже добавлял, не еби мозг, тебе надо ты и добавь ПОНЯЛЛЛ!!!`);
    } else {
      Site.create({
        url: url,
        date: new Date(),
        chatId
      }).then(sites => {
        bot.sendMessage(chatId, `Сайт ${url} успешно добавлен в базу, буду бережно хранить и следить за ним. Служу отечеству!!!`);
      })
        .catch((err) => {
          bot.sendMessage(chatId, `Ошибка добавления сайта в базу 'ошибка: ${err}'. Это фиаско братан!!!`);
        });
    }
  } else {
    bot.sendMessage(chatId, `${msg.from.first_name}, ты это серьезно? Это же не ссылка ни хуя, не заебывай!!!`);
  }
}
async function deleteS(msg){
  let comannd = msg.text.split('/delete ')
  let url = comannd[1]
  let site = await Site.findOne({ where: { url: url }, raw: true })
  console.log(site)
}
async function start() {
  try {
    await db.authenticate();
    console.log(`База данных запущена`)

    bot.onText(/\/echo (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const resp = match[1]; // the captured "whatever"
      bot.sendMessage(chatId, resp);
    });

    bot.on('message', async (msg) => {
      console.log(msg)
      const chat = msg.chat.id;
      if (msg.entities[0].type == 'bot_command'){
        console.log('bot_command', )
        if (msg.text == '/add'){
          addS(msg)
        } else if (msg.text == '/delete'){
          deleteS(msg)
        }
      }
      
    });

  } catch (error) {
    console.log(`Ошибка запуска базы данных: ${error}`)
  }
}

start()
