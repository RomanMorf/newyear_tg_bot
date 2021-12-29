const TelegramBot = require('node-telegram-bot-api');
const { gameOptions } = require('./options')

const token = '5076160316:AAHkj9m25Kfx0T8l4JQbqxt8R0gLpWtE3SI';

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/game', description: 'Начало игры по поиску подарка'},
  {command: '/info', description: 'Получить информацию по игре'},
])

const game = {
  firstPart: false,
  secondPart: false,
  thirdPart: false
}

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

bot.on('message', (msg) => {
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
    return 
  }

  if (game.firstPart) {
  
    if (text === '1995') { 
      sendMesFunc(`Совершенно верно !`, 0, chatId)
      sendMesFunc(`Идем дальше... )`, 3, chatId)
      sendMesFunc(`Добавим интерактива`, 6, chatId)
      sendMesFunc(`... ищи "жителя нашей квартиры", которого поселила твоя мама ) `, 9, chatId)
      sendMesFunc(`Интересно...  как быстро ты справишся с этим заданием 😁`, 12, chatId)
      sendMesFunc(`Внимательно осмотри его со всех сторон. Там должно быть кодое слово )`, 20, chatId)
      return
    }

    if (text === 'люблю') { // -> !!!!!!!!!!!!!!!!!
      sendMesFunc('И снова верно !', 0, chatId)
      sendMesFunc('Фото-квест 📷😁', 3, chatId)
      sendMesFunc('В какой стране было сделано следующее фото:', 7, chatId)
      return
    }

    if (text === 'чехия') { // -> !!!!!!!!!!!!!!!!! прислать фото с загадкой
      game.firstPart = false
      game.secondPart = true
      sendMesFunc('Отлично!', 0, chatId)
      sendMesFunc('Продолжаем... )', 3, chatId)
      sendMesFunc('В какой стране было сделано следующее фото:', 7, chatId)
      sendPhotoFunc('https://static4.depositphotos.com/1000423/454/i/600/depositphotos_4548401-stock-photo-symbol-of-yin-and-yang.jpg', 9, chatId)
      return
    }
  }

  if (game.secondPart) {
    if (text === '1995' || text === 'люблю' || text === 'чехия') {
      return bot.sendMessage(chatId, `Не... это уже было ) Идём дальше. `)
    }

    if (text === 'египет') { // -> за ТВ !!!!!!!!!!!!!!!!!
      sendMesFunc('Молодец  😁', 0, chatId)
      sendMesFunc('До заветного подарка осталось совсем не много', 5, chatId)
      sendMesFunc('Следующая подсказка будет находиться на обратной стороне прибора, который мы первым купили совместно...', 10, chatId)
      sendMesFunc('Найти его - не составит для тебя труда )', 15, chatId)
      sendMesFunc('Смотри внимательно...', 20, chatId)
      return
    }

    if (text === 'рома') { // !!!!!!!!!!!!!!!!!
      game.secondPart = false
      game.thirdPart = true

      sendMesFunc('есть', 1, chatId)
      sendMesFunc('три сек', 3, chatId)
      sendMesFunc('7 сек', 7, chatId)
      sendMesFunc('третья часть игры !!!', 10, chatId)

      return
    }
  }

  if (game.thirdPart) {
    if (text === '1995' || text === 'blabla111' || text === 'египет' || text === 'рома') {
      return bot.sendMessage(chatId, `Не... это уже было ) Идём дальше. `)
    }
    if (text === 'q123') { // ->  !!!!!!!!!!!!!!!!!
      sendMesFunc('q123 Молодец  😁', 0, chatId)
      sendMesFunc('q123 До заветного подарка осталось совсем не много', 5, chatId)
      sendMesFunc('q123 Следуищая подсказка будет находиться на обратной стороне прибора, который мы первым купили совместно...', 10, chatId)
      sendMesFunc('q123 Найти его - не составит для тебя труда )', 15, chatId)
      sendMesFunc('q123 Смотри внимательно...', 20, chatId)

      return
    }

    if (text === 'q555') { // ->  !!!!!!!!!!!!!!!!!
      sendMesFunc('q555 есть', 1, chatId)
      sendMesFunc('q555 три сек', 3, chatId)
      sendMesFunc('q555 7 сек', 7, chatId)

      return
    }
  }

  return bot.sendMessage(chatId, `Хм... Давай подумаем еще чуток... )))`)
})


bot.on('callback_query', (msg) => {
  const data = msg.data
  const chatId = msg.message.chat.id


  if (data === '/again') {
    startGame(chatId)
    return
  }

  if (data === '/game') {
    startGame(chatId)
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


  if (data === '/egipetClue') {
    sendPhotoFunc('https://klike.net/uploads/posts/2019-05/1556708032_1.jpg', 0, chatId)
    return
  }


  return
})
