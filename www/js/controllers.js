angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$ionicPopup) {
   /* var alertPopup = $ionicPopup.alert({
      title: 'Id du chauffeur',
      template: localStorage.getItem("idchauffeur")
    });*/

  })

  .controller('LoginCtrl', function($scope,$http,$ionicPopup,$state) {
  //  localStorage.removeItem("idchauffeur");
    if(localStorage.getItem("idchauffeur")!=undefined)
      {// on se positionne sur le compte du chauffeur s'il avait déjà eu à se connecter
        $state.go('tab.dash');
      }

    $scope.data = {};
    $scope.url = "http://localhost:8100/#/test.txt";
    var result={
    "response": {
    "code": "SUCC",
    "message": "description de l'erreur "
    },
    "data": {
    "code": 200,
    "idchauffeur": 2620578,
    "nom": "nomchauffeur",
    "prenom": "prenomchauffeur"
     }
    }
    
    $scope.login = function () {
      $scope.token=result.data.idchauffeur;

      localStorage.setItem("idchauffeur",$scope.token);
      //page du chauffeur
      $state.go('tab.dash');



      //console.log("LOGIN user: " + $scope.data.username + " - PW: " + $scope.data.password);
//;$http.post('/someUrl', data, config).then(successCallback, errorCallback);
      // on associe les paramètres à l'url

      //l'on fait une requête ajax au serveur de ndjama avec les paramètres username et password
    /*  $http.post($scope.url, $scope.data).success(function (result) {
         //console.log($scope.data);
         result={
        "response": {
        "code": "SUCC",
        "message": "description de l'erreur "
      },
      "data": {
      "code": 200,
      "idchauffeur": 2620578,
      "nom": "nomchauffeur",
      "prenom": "prenomchauffeur"
          }
      }
         // on teste le resultat renvoyé
         //1er cas : si c'est une erreur

         if(result.response.code=="ERR")
    {
      var alertPopup = $ionicPopup.alert({
              title: 'Connexion echouée!',
              template: result.response.message
            });
     }
     else
     {
      // on stocke l'id du chauffeur
      $scope.token=result.data.idchauffeur;
     // console.log($scope.token);
      localStorage.setItem("idchauffeur",$scope.token);
            //page du chauffeur
            $state.go('tab.dash');
     }
          //$state.go('tab.dash');
         /* response={
            "data": {
              "code": 200,
              "idchauffeur": 2620578,
              "nom": "nomchauffeur",
              "prenom": "prenomchauffeur",


            }
          };
          if("data" in response)
          {
            // on doit enregistrer l'id du chauffeur dans un  token
            $scope.token=response.data.idchauffeur;
            console.log($scope.token);
            localStorage.setItem("idchauffeur",$scope.token);
            //page du chauffeur
            $state.go('tab.dash');
          }
          else
          if("erreur" in response)
          {
            var alertPopup = $ionicPopup.alert({
              title: 'Connexion echouée!',
              template: response.erreur.message
            });
          }

        }
      )
        .error(function () {

          var alertPopup = $ionicPopup.alert({
            title: 'Connexion echouée!',
            template: 'Please check your credentials!'
          });

        })*/
    }
  })

  .controller('AccountCtrl', function($scope,$ionicModal) {
  $scope.settings = {
    enableFriends: true
  };
  $scope.list = [
  { id: 1, title: 'Titre 1'},
  { id: 2, title: 'Titre 2'},
  { id: 3, title: 'Titre 3'},
  { id: 4, title: 'Titre 4'},
  { id: 5, title: 'Titre 5'},
  { id: 6, title: 'Titre 6'}
];
  // define create account view
  $ionicModal.fromTemplateUrl('templates/login.html', {
     scope: $scope,
     animation: 'slide-in-up'
  }).then(function(modal) {
      $scope.loginModal = modal;
  });

})

.controller('ToDoListCtrl', function($scope, $ionicPopup,$timeout) {

  $scope.taches = [
{ id: 1, titre: 'Titre 1', icon: 'ion-speakerphone', date:'07/12/2016', description:'Première description de la tâche'},
{ id: 2, titre: 'Titre 2', icon: 'ion-happy-outline', date:'06/12/2016', description:'Deuxième description de la tâche'},
{ id: 3, titre: 'Titre 3', icon: 'ion-bowtie', date:'05/12/2016', description:'Troisième description de la tâche'},
{ id: 4, titre: 'Titre 4', icon: 'ion-android-bus', date:'04/12/2016', description:'Quatrième description de la tâche'},
{ id: 5, titre: 'Titre 5', icon: 'ion-social-angular', date:'03/12/2016', description:'Cinquième description de la tâche'},
{ id: 6, titre: 'Titre 6', icon: 'ion-social-freebsd-devil', date:'02/12/2016', description:'Sixième description de la tâche'},
{ id: 7, titre: 'Titre 7', icon: 'ion-speakerphone', date:'07/12/2016', description:'Septième description de la tâche'},
{ id: 8, titre: 'Titre 8', icon: 'ion-happy-outline', date:'06/12/2016', description:'Huitième description de la tâche'},
{ id: 9, titre: 'Titre 9', icon: 'ion-bowtie', date:'05/12/2016', description:'Neuvième description de la tâche'},
{ id: 10, titre: 'Titre 10', icon: 'ion-android-bus', date:'04/12/2016', description:'Dixième description de la tâche'},
{ id: 11, titre: 'Titre 11', icon: 'ion-social-angular', date:'03/12/2016', description:'Onzième description de la tâche'},
{ id: 12, titre: 'Titre 12', icon: 'ion-social-freebsd-devil', date:'02/12/2016', description:'Douzième description de la tâche'},
{ id: 13, titre: 'Titre 13', icon: 'ion-speakerphone', date:'07/12/2016', description:'Treizième description de la tâche'},
{ id: 14, titre: 'Titre 14', icon: 'ion-happy-outline', date:'06/12/2016', description:'Quatorzième description de la tâche'},
{ id: 15, titre: 'Titre 15', icon: 'ion-bowtie', date:'05/12/2016', description:'Quinzième description de la tâche'},
{ id: 16, titre: 'Titre 16', icon: 'ion-android-bus', date:'04/12/2016', description:'Seizième description de la tâche'},
{ id: 17, titre: 'Titre 17', icon: 'ion-social-angular', date:'03/12/2016', description:'Dix-septième description de la tâche'},
{ id: 18, titre: 'Titre 18', icon: 'ion-social-freebsd-devil', date:'02/12/2016', description:'Dix-huitième description de la tâche'},
{ id: 19, titre: 'Titre 19', icon: 'ion-speakerphone', date:'07/12/2016', description:'Dix-neuvième description de la tâche'},
{ id: 20, titre: 'Titre 20', icon: 'ion-happy-outline', date:'06/12/2016', description:'Vingtième description de la tâche'},
{ id: 21, titre: 'Titre 21', icon: 'ion-bowtie', date:'05/12/2016', description:'Vingt-et-unième description de la tâche'},
{ id: 22, titre: 'Titre 22', icon: 'ion-android-bus', date:'04/12/2016', description:'Vingt-deuxième description de la tâche'},
{ id: 23, titre: 'Titre 23', icon: 'ion-social-angular', date:'03/12/2016', description:'Vingt-troisième description de la tâche'},
{ id: 24, titre: 'Titre 24', icon: 'ion-social-freebsd-devil', date:'02/12/2016', description:'Vingt-quatrième description de la tâche'},
{ id: 25, titre: 'Titre 25', icon: 'ion-social-freebsd-devil', date:'02/12/2016', description:'Vingt-cinquième description de la tâche'}
];

$scope.showDetails = function(id,titre){

     var alertPopup = $ionicPopup.alert({
       title: titre,
       template: 'Détails sur la tâche '+id
     });

     alertPopup.then(function(res) {
       //console.log('okay');
     });


  };

  $scope.doRefresh = function () {
    console.log('Refreshing! TodoList');
    $timeout( function() {
      //simulate async response
  //    $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);

  };


  $scope.hideTask = function (id) {
    $scope.taches[id-1].IsVisible = true;
  };


})

.controller('tabHistoricController', function ($scope, ordersHistoryFactory, ionicDatePicker,$timeout) {

  $scope.refresh = function () {
    console.log('Refreshing Historic!');
    $timeout( function() {
      //simulate async response
  //    $scope.items.push('New Item ' + Math.floor(Math.random() * 1000) + 4);

      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');

    }, 1000);

  };

  var ipObj1 = {
    callback: function (val) {  //Mandatory
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      $scope.orders = ordersHistoryFactory.getOrdersByDate(new Date(val));
    },
    disabledDates: [            //Optional
    ],
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    templateType: 'popup'       //Optional
  };

  $scope.openDatePicker = function(){
    ionicDatePicker.openDatePicker(ipObj1);
  };

  $scope.orders = ordersHistoryFactory.getAllOrders();
  console.log($scope.orders);

});
