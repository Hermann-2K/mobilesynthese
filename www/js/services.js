angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('ordersHistoryFactory', function () {
  var factory = {};

  factory.getAllOrders = function () {
    var orders = [{
      id: 0,
      name: 'Commande 1'
    }, {
      id: 1,
      name: 'Commande 2'
    }, {
      id: 2,
      name: 'Commande 3'
    }, {
      id: 3,
      name: 'Commande 4'
    }];
    return orders;
  }

  factory.getLastNOrders = function (N) {
    return null;
  }

  factory.getOrdersByDate = function (date) {
    return ["Commande 1 " + date, "Commande 2 " + date, "Commande 3 " + date, "Commande 4 " + date];
  }

  return factory;
});
