function TshirtEditorController ($scope) {
  let vm = this;
  vm.images = [];
  vm.tshirtUrl= './images/tshirts/White Front T-Shirt-450x550.png';
  vm.texts = [];

  $scope.$on('image', (event, url) =>  {
    vm.images.push(url);
  });

  $scope.$on('tshirtUrl', (event, url) => {
    vm.tshirtUrl = url;
  });

  $scope.$on('addText', (event, text) => {
    console.log(text, 'from the inside of parent');
    vm.texts.push(text);
  });
}

TshirtEditorController.$inject = ['$scope'];

export default TshirtEditorController;
