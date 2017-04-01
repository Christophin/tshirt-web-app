function TshirtEditorController ($scope) {
  let vm = this;
  vm.projectInfo = {
    name: '',
    color: '',
    ts_front_url: '',
    ts_back_url: '',
    tsFrontImages: []
  };

  vm.images = [];
  vm.tshirtUrl= './images/tshirts/White Front T-Shirt-450x550.png';
  vm.texts = [];

  $scope.$on('image', (event, url) =>  {
    vm.images.push(url);
  });

  $scope.$on('tshirtUrl', (event, data) => {
    vm.tshirtUrl = data.url;
    vm.projectInfo.name = data.id;
    vm.projectInfo.color = data.id;
    vm.projectInfo.ts_front_url = data.url;
    vm.projectInfo.ts_back_url = data.url;
    console.log(vm.projectInfo);
  });

  $scope.$on('addText', (event, text) => {
    console.log(text, 'from the inside of parent');
    vm.texts.push(text);
  });
}

TshirtEditorController.$inject = ['$scope'];

export default TshirtEditorController;
