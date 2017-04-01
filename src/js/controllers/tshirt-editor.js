function TshirtEditorController ($scope) {
  let vm = this;
  vm.projectInfo = {
    name: '',
    color: '',
    ts_front_url: '',
    ts_back_url: '',
  };

  vm.images = [];
  vm.tshirtUrl= './images/tshirts/White Front T-Shirt-450x550.png';
  vm.texts = [];

  vm.getPosition = getPosition;

  $scope.$on('image', (event, image) =>  {
    vm.images.push({
      url :image.url
    });
    vm.projectInfo.tsFrontImages = vm.images;
    console.log(vm.projectInfo);
  });

  $scope.$on('tshirtUrl', (event, data) => {
    vm.tshirtUrl = data.url;
    vm.projectInfo.name = data.id;
    vm.projectInfo.color = data.id;
    vm.projectInfo.ts_front_url = data.url;
    vm.projectInfo.ts_back_url = data.url;
  });

  $scope.$on('addText', (event, text) => {
    console.log(text, 'from the inside of parent');
    vm.texts.push(text);
  });

  function getPosition ($event) {
    let imgPosition = vm.projectInfo.tsFrontImages;
    let x = angular.element($event.target.offsetParent.offsetParent).prop('offsetLeft');
    let y = angular.element($event.target.offsetParent.offsetParent).prop('offsetTop');
    imgPosition[0].x_position = x;
    imgPosition[0].y_posiotion = y;
    console.log(vm.projectInfo);


    //console.log($event);
  }
}

TshirtEditorController.$inject = ['$scope'];

export default TshirtEditorController;
