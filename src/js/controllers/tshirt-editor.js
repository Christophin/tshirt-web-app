function TshirtEditorController ($scope) {
  let vm = this;
  vm.images = [];
  vm.tshirtUrl= './images/tshirts/White Front T-Shirt-450x550.png';

  $scope.$on('image', (event, url) =>  {
    vm.images.push(url);
  });

  $scope.$on('tshirtUrl', (event, url) => {
    vm.tshirtUrl = url;
  });
}

TshirtEditorController.$inject = ['$scope'];

export default TshirtEditorController;
