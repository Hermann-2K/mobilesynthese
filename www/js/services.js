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

.factory('ordersHistoryFactory', function ($http) {
  var factory = {};

  factory.getAllOrders = function () {
    /*var orders = [{
      _id: 0,
      name: 'Commande 1',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 1,
      name: 'Commande 2',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 2,
      name: 'Commande 3',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 3,
      name: 'Commande 4',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }];*/
    var promise = $http.get("http://projetsynthese.herokuapp.com/api/livraisons").then(function (response) {
      console.log(response);
      orders = response.data;
      for(i = 0; i < orders.length; i++) {
        var theDate = new Date(Date.parse(orders[i].created_at));
        orders[i].readableDate = theDate.toDateString();
      }
      return orders;
    })

    return promise;
  }

  factory.getLastNOrders = function (N) {
    return null;
  }

  factory.getOrdersByDate = function (date) {
    /*console.log(date);
    console.log(date.toDateString())*/
    var ordersByDate = [];
    /*var orders = [{
      _id: 0,
      name: 'Commande 1',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 1,
      name: 'Commande 2',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 2,
      name: 'Commande 3',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }, {
      _id: 3,
      name: 'Commande 4',
      updated_at: "2016-12-20 03:24:39",
      created_at: "2016-12-20 03:24:39"
    }];*/
    var promise = $http.get("http://projetsynthese.herokuapp.com/api/livraisons").then(function (response) {
      console.log(response);
      orders = response.data;
      for(i = 0; i < orders.length; i++) {
        var currentDate = new Date(Date.parse(orders[i].created_at));
        /*console.log(currentDate);
         console.log(currentDate.toDateString());
         console.log(date.toDateString());*/
        if(currentDate.toDateString()== date.toDateString()) {
          orders[i].readableDate = currentDate.toDateString();
          ordersByDate.push(orders[i]);
        }
      }
      return ordersByDate;
    })

    return promise;
  }

  return factory;
});
