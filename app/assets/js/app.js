$(document).ready(function () {
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
    {"name": "Perception", "episode": "5"},
    {"name": "Suits", "episode": "6"},
    {"name": "Suits", "episode": "6"}
  ];
}

function UpcomingCtrl($scope) {

}

function ShowListCtrl($scope) {

}

function ShowDetailCtrl($scope) {

}
