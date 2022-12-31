const TelegramBot = require('node-telegram-bot-api');
const { gameOptions, alcoholOptions } = require('./options')
const { gameData } = require('./gameData')

const token = '5076160316:AAHkj9m25Kfx0T8l4JQbqxt8R0gLpWtE3SI';

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
  {command: '/start', description: 'Привітання'},
  {command: '/game', description: 'Початок гри'},
  {command: '/info', description: 'Інформація по щодо гри'},
])

function showStats() {
  console.log('showStats');
  console.log(gameCount);
}

let chatId = 1
let gameCount = 13
let chatIdArr = []

setInterval(() => {
  const data = new Date
  console.log(data, 'gameCount -', gameCount);
  console.log(chatIdArr, 'chatIdArr');
}, 5000);


function superPuperGame(text, gameData, chatId) {
  if (!gameData[gameCount]) {
    sendMesFunc('Гра скінчена... Завдання закінчились', 0, chatId)
    sendMesFunc('Буде бажання - ти завжди можеш почати з початку )', 3, chatId)
    sendMesFunc('Для цього просто натисни /start', 7, chatId)
    return
  }

  // if (text.toLocaleLowerCase() === gameData[gameCount].answer.toLocaleLowerCase() ) {
  if (gameData[gameCount].answer.toLocaleLowerCase().includes(text.toLocaleLowerCase())) {
      let idx = 0

    gameData[gameCount].text.forEach((text, index) => {
      idx += 1
      const delay = text[1] || index * 5
      sendMesFunc(text[0], delay, chatId)
    })

    if (gameData[gameCount].photo) {
      gameData[gameCount].photo.forEach((photo, index) => {
        const delay = photo[1] || idx > index ? idx * 5 : index * 5
        sendPhotoFunc(photo[0], delay, chatId)
        idx += 1
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
  chatIdArr.push(chatId)

  if (text === '/start') {
    sendMesFunc(`Приветствую - ${msg?.from?.first_name} ${msg?.from?.last_name}`, 0, chatId, gameOptions)
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

  if (text === '/alco') {
    const name = msg.from.first_name
    const lastname = msg.from.last_name
    sendMesFunc(`Приветствую - ${name ? name : ''} ${lastname ? lastname : ''}`, 0, chatId, alcoholOptions)
    return 
  }


  superPuperGame(text, gameData, chatId)
})

function startGame(chatId) {
  gameCount = 1
  sendMesFunc('Раді вітати на новорічному квесті !!!', 0, chatId)
  sendMesFunc('Вам випала унікальна можливість прийняти участь у цій події.', 3, chatId)
  sendMesFunc('У звʼязку з останніми подіями у світі - цей квест буде проходити державною мовою', 6, chatId)
  sendMesFunc('Ми не сумніваємось, що у тебе все вийде ! 😁', 10, chatId)
  sendMesFunc('Перше питання... Як завжди для розігріву 😁', 13, chatId)
  sendMesFunc('Рік якої тварини 2023 ?', 16, chatId)
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


  if (data === '/game') {
    startGame(chatId)
    return
  }

  if (data === '/rules') {
    sendMesFunc('Правила гри:', 0, chatId)
    sendMesFunc(`
Гра - це лінейний квест. 
Наступне запитання буде показано тільки після відповіді на попереднє. 
В грі повно підказок. Хвилюватись немає чого )


В будьякий момент гри - можна почати спочатку.
Для цього необходно в чат нідаслати повідомлення /start

Хай щастить !
`, 2, chatId)
sendMesFunc('Не хвилюйся. Стартуй, у тебе все вийде ! /start', 8, chatId)
    return
  }


  if (data === '/beer') {
    console.log(chatId, 'заказал пиво');
    sendMesFunc(`Ваш зака на 1 пиво - принят )`, 0, chatId)
    sendMesFunc(`Ожидайте )`, 3, chatId)
    return
  }
  if (data === '/champane') {
    console.log(chatId, 'заказал шампанское');
    sendMesFunc(`Ваш зака на бокал шампанского - принят )`, 0, chatId)
    sendMesFunc(`Ожидайте )`, 3, chatId)
    return
  }

  return
})
