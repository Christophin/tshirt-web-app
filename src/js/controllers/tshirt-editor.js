function TshirtEditorController ($scope) {
  let vm = this;
  vm.images = [];

  $scope.$on('image', (event, url) =>  {
    vm.images.push(url);
  } )
}

TshirtEditorController.$inject = ['$scope'];

export default TshirtEditorController;
