const TelegramBot = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options')

const token = '5076160316:AAHkj9m25Kfx0T8l4JQbqxt8R0gLpWtE3SI';

const bot = new TelegramBot(token, {polling: true});

bot.setMyCommands([
  {command: '/start', description: 'Начальное приветствие'},
  {command: '/info', description: 'Инфрмация о пользователе'},
  {command: '/game', description: 'Начало игры по поиску подарка'},
])

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text

  if (text === '/start') {
    return bot.sendMessage(chatId, `Добро пожаловать - ${msg.from.first_name} ${msg.from.last_name}`);
  }

  if (text === '/info') {
    return bot.sendMessage(chatId, `Вас зовут - ${msg.from.first_name} ${msg.from.last_name}`);
  }

  if (text === '/game') {
    return bot.sendMessage(chatId, `Играем... `, gameOptions);
  }

  return bot.sendMessage(chatId, `Хм... Давай подумаем еще чуток... )))`)
});

bot.on('callback_query', (msg) => {
  const data = msg.data
  const chatId = msg.message.chat.id
  bot.sendMessage(chatId, `Ты выбрал варинт ${data}`, againOptions)
});