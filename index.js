const TelegramBot = require('node-telegram-bot-api');
const { gameOptions } = require('./options')
const { gameData } = require('./gameData')

const token = '5076160316:AAHkj9m25Kfx0T8l4JQbqxt8R0gLpWtE3SI';

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/game', description: 'Начало игры по поиску подарка'},
  {command: '/info', description: 'Получить информацию по игре'},
])

let chatId = 1
let gameCount = 9

setInterval(() => {
  const data = new Date
  console.log(data, 'gameCount -', gameCount);
}, 5000);


function superPuperGame(text, gameData, chatId) {
  if (!gameData[gameCount]) {
    sendMesFunc('Игра окончена... Больше заданий у меня нет', 0, chatId)
    sendMesFunc('Если интересно, всегда можно начать с начала )', 3, chatId)
    sendMesFunc('Для этого - просто нажми /start', 7, chatId)
    return
  }

  if (text === gameData[gameCount].answer ) {
    let idx = 0
    gameData[gameCount].text.forEach((text, index) => {
      idx = index
      const delay = text[1] || index * 5
      sendMesFunc(text[0], delay, chatId)
    })
    if (gameData[gameCount].photo) {
      gameData[gameCount].photo.forEach((text) => {
        const delay = text[1] || idx * 5 + 5
        console.log(delay);
        sendPhotoFunc(text[0], delay, chatId)
      })
    }
    gameCount += 1
    return
  } 

  sendMesFunc(gameData[gameCount].altText, 0, chatId)
}

bot.on('message', msg => {
  const chatId = msg.chat.id;
  const text = msg.text.toLocaleLowerCase()

  if (text === '/start') {
    sendMesFunc(`Приветствую - ${msg.from.first_name} ${msg.from.last_name}`, 0, chatId, gameOptions)
    return 
  }

  if (text === '/info') {
    sendMesFunc(`Ты всегда сможешь начать игру заново, если что-то пошло не так)`, 0, chatId)
    sendMesFunc(`Для это просто необходимо ввести /start`, 5, chatId)
    sendMesFunc(`До конца игры сможет дойти только самая-самая... `, 10, chatId)
    sendMesFunc(`Не сдавайся... Подарок того стоит ❤️`, 15, chatId)
    return
  }

  if (text === '/game') {
    startGame(chatId)
    gameCount = 1
    return 
  }

  superPuperGame(text, gameData, chatId)
})


function startGame(chatId) {
  game.firstPart = true
  game.secondPart = false
  game.thirdPart = false

  sendMesFunc('Отилчно 🥳 Ну что ж... начнём искать 🎁', 0, chatId)
  sendMesFunc('Для разогрева, я задам очень простой вопрос )', 3, chatId)
  sendMesFunc('В каком году родилась самая красивая и добрая девушка в мире ? 😉', 6, chatId)

}
function sendMesFunc(text = '...', delay = 0, id = chatId, options) {
  setTimeout(()=> bot.sendMessage(id, `${text}`, options), delay * 1000)
}
function sendPhotoFunc(photoLink, delay, id, options) {
  setTimeout(()=> bot.sendPhoto(id, `${photoLink}`, options), delay * 1000)
}

bot.on('callback_query', (msg) => {
  const data = msg.data
  const chatId = msg.message.chat.id

  if (data === '/again') {
    startGame(chatId)
    return
  }

  if (data === '/game') {
    startGame(chatId)
    gameCount = 1
    return
  }

  if (data === '/rules') {
    sendMesFunc('Вашему вниманию представляються правила игры:', 0, chatId)
    sendMesFunc(`
Игра состоит из несокльких раундов 
и т.д и т.п...
потом допишу )))
`, 3, chatId)
    return
  }

  return
})
