$(document).ready(function () {
  $(document).foundationCustomForms();

  $('ul.nav-bar li').each(function () {
    var ele = $(this);
    if (!ele.hasClass('name')) {
      $(this).click(function () {
        $('ul.nav-bar li.active').removeClass('active');
        $(this).addClass('active');
      });
    }
  }) ;
});

angular.module('tooMuchTv', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/upcoming', {templateUrl: '../partials/upcoming.htm', controller: UpcomingCtrl}).
    when('/shows', {templateUrl: '../partials/show-list.htm', controller: ShowListCtrl}).
    when('/shows/:showId', {templateUrl: '../partials/show-details.htm', controller: ShowDetailCtrl}).
    otherwise({redirectTo: '/shows'});
}]);

function UpcomingCtrl($scope) {

}

function ModalCtrl($scope, $rootScope) {
  $scope.modal = {
    title: 'Modal title',
    lead: 'Modal lead',
    message: "Modal message"
  };
  $rootScope.$on('confirmationRequested', function (ev, msg) {
    ev.stopPropagation();
    $scope.modal = msg;
    var modal = $("#modalMsg").reveal();
  });
  $scope.confirm = function (status) {
    $rootScope.$emit('confirmation', status);
    $('#modalMsg').trigger('reveal:close');
  };
}

function ShowListCtrl($scope, $http, $rootScope) {
  $http.get('/shows').success(function (data) {
    $scope.shows = data;
  });
  $scope.save = function (show) {
    $http.post('/show', show).success(function (data) {
      $scope.shows.push(data);
      show.name = "";
      show.details = "";
    });
  }
  $scope.remove = function (show) {
    var msg = {
      title: 'Do you really want to delete the show?',
      lead: "You can't undo this action",
      message: ""
    };
    $rootScope.$emit('confirmationRequested', msg);
    $rootScope.$on('confirmation', function (ev, confirmed) {
      ev.stopPropagation();
      if (confirmed) {
        $http.delete('/show/' + show._id).success(function (data) {
          var index = $scope.shows.indexOf(show);
          $scope.shows.splice(index, 1);
        });
      }
    });
  }
  $scope.orderProp = "name";
}

function ShowDetailCtrl($scope, $http) {
  $http.get('/show/:id').success(function (data) {
    $scope.show = data;
  });
}
