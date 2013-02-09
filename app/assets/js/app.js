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
    when('/unwatched', {templateUrl: '../partials/unwatched.htm', controller: UnwatchedCtrl}).
    when('/upcoming', {templateUrl: '../partials/upcoming.htm', controller: UpcomingCtrl}).
    when('/shows', {templateUrl: '../partials/show-list.htm', controller: ShowListCtrl}).
    when('/shows/:showId', {templateUrl: '../partials/show-details.htm', controller: ShowDetailCtrl}).
    otherwise({redirectTo: '/unwatched'});
}]);

function UnwatchedCtrl($scope) {
  $scope.shows = [
    {"id": 1, "name": "Perception", "season": 1, "episode": "5"},
    {"id": 2, "name": "Suits",  "season": 2, "episode": "6"},
    {"id": 3, "name": "White Collar",  "season": 3, "episode": "5"}
  ];
}

function UpcomingCtrl($scope) {

}

function ShowListCtrl($scope, $http) {
  // $scope.show = {};
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
    $http.delete('/show/' + show._id).success(function (data) {
      var index = $scope.shows.indexOf(show);
      $scope.shows.splice(index, 1);
    });
  }
  $scope.orderProp = "name";
}


function ShowDetailCtrl($scope, $http) {
  $http.get('/show/:id').success(function (data) {
    $scope.show = data;
  });
}
