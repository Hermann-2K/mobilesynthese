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
      ordersHistoryFactory.getOrdersByDate(new Date(val)).then(function (data) {
        $scope.orders = data;
      });
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

  ordersHistoryFactory.getAllOrders().then(function (data) {
    console.log("rei");
    console.log(data);
    $scope.orders = data;
  });
  console.log($scope.orders);

})



.controller('DashCtrl',function($ionicLoading,$scope,$http){

 // Les  valeurs test

 var pointJson = [
        {"longitude":11.562847, "lattitude":3.843363 , "description": "livrer 1000 bouteilles", "icone": "img/marqueur.png", "_id":153 , "name": "nom 4", "localisation":"yaounde point 1" ,"ordre": 4 , "updated_at": "" , "created_at": ""},
        {"longitude":11.537947, "lattitude": 3.849799 , "description": "2000 bouteilles", "icone": "img/marqueur.png", "_id":35 , "name": "nom 1", "localisation":"yaounde point 2" ,"ordre": 1 , "updated_at": "" , "created_at": ""},
        {"longitude":11.514343 , "lattitude": 3.871974 , "description": "point numero 3", "icone": "img/marqueur.png", "_id":96 , "name": "nom 3", "localisation":"yaounde point 3" ,"ordre": 3 , "updated_at": "" , "created_at": ""},
        {"longitude":11.500155, "lattitude": 3.86258, "description": "point numero 4", "icone":"img/marqueur.png", "_id":79 , "name": "nom 2", "localisation":"yaounde point 4" ,"ordre": 5 , "updated_at": "" , "created_at": ""},
        {"longitude":11.600455, "lattitude":3.86358, "description": "point numero 5", "icone":"img/marqueur.png", "_id":58 , "name": "nom 5", "localisation":"yaounde point 5" ,"ordre": 2 , "updated_at": "" , "created_at": ""}
      ];





$ionicLoading.show({
    template:"chargement ...."
});
var url="https://projetsynthese.herokuapp.com/api/pointlivraisons";

  $http.get(url).success(function(response){
    $ionicLoading.hide();
    pointJson=response;

// Recuperation de la liste des points
var point={};
var listedepoints = [];
var tableau_liens=[];
var temp={"id":5,ordre:"1","lon": 10.6075669, "lat": 4.9459301, "description": "point numero 5", "icone":"img/marqueur.png"};
var temp_liens=[{"lon": 11.52, "lat":3.83  }, {"lon":14.52 , "lat": 4.0}];

for(var i=0; i < pointJson.length;i++){
  //point=pointJson[i]
  for(var j=0;j<pointJson.length;j++){
    if(pointJson[j].ordre==i+1)
    {
      point= pointJson[j];
      j=pointJson.length;
    }
  }

  temp= new Object();
  temp={"id":5,ordre:"1","lon": 10.6075669, "lat": 4.9459301, "description": "point numero 5", "icone":"img/marqueur.png"};
  //temp.lon=point.longitude;
  //temp.lat=point.lattitude;
  temp.lat=point.longitude;
  temp.lon=point.lattitude;
  temp.description ='('+point.name+')'+''+point.description;
  temp.icone="img/marqueur.png";
  temp.id=point._id;
  temp.ordre=point.ordre;

  listedepoints.push(temp);
}

// Inserer les points dans un tableau des liens
for(var i=0; i < listedepoints.length-1;i++){

  temp_liens = new Object();
  temp_liens=[];

  temp_liens.push(listedepoints[i]);
  temp_liens.push(listedepoints[i+1]);
  tableau_liens.push(temp_liens);
}

  console.log(tableau_liens);
  console.log('Nombre de tableau de lien '+tableau_liens.length);
  var map = creerCarte("monmap");
  ajouterPoints(map,listedepoints);
  localiserPoints(map,listedepoints);
  relierPoints(map, tableau_liens);
  afficherCarte(map, listedepoints[2], 13);
  })

})
