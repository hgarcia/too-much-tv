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

function ShowListCtrl($scope) {
  $scope.shows = [
    {"id": 1, "name": "Perception", "description": "Some description here."},
    {"id": 2, "name": "Suits", "description": "Some description here."},
    {"id": 3, "name": "White Collar", "description": "Some description here."}
  ];
}

function ShowDetailCtrl($scope) {

}
