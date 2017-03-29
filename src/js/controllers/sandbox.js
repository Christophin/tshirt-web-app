function SandboxController ($scope) {
  //let vm = this;
  $scope.resize = function(evt,ui) {
    //console.log (evt,ui);
    $scope.w = ui.size.width;
    $scope.h = ui.size.height;
  };

}

SandboxController.$inject = ['$scope'];

export default SandboxController;
