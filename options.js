module.exports = {
  gameOptions: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
        [{text: 'Начать игру', callback_data: '/game'}],
        [{text: 'Прочитать правила игры', callback_data: '/rules'}],
      ]
    })
  },
  
  // againOptions:{
  //   reply_markup: JSON.stringify({
  //       inline_keyboard: [
  //       [{text: 'Играть еще раз', callback_data: '/again'}]
  //     ]
  //   })
  // },

  // egipetClue:{
  //   reply_markup: JSON.stringify({
  //       inline_keyboard: [
  //       [{text: 'Фото подсказка', callback_data: '/egipetClue'}]
  //     ]
  //   })
  // },

}