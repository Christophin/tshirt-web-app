function TshirtEditorController ($scope, $rootScope) {
  let vm = this;

  vm.savedProject = $rootScope.savedProject;
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
  //vm.resize = resize;

  $scope.$on('image', (event, image) =>  {
    vm.images.push({
      url :image.url
    });
    vm.projectInfo.tsFrontImages = vm.images;

  // BACK IMAGES MADE
    vm.projectInfo.tsBackImages = vm.images;

  });

  $scope.$on('tshirtUrl', (event, data) => {
    vm.tshirtUrl = data.url;
    vm.projectInfo.color = data.id;
    vm.projectInfo.ts_front_url = data.url;
    vm.projectInfo.ts_back_url = data.url;
  });

  $scope.$on('addText', (event, text) => {
    //console.log(text, 'from the inside of parent');
    vm.texts.push(text);
  });

  $scope.$on('needShirt', (name) => {
    vm.projectInfo.name = name.targetScope.name;
    $scope.$broadcast('projectInfo', vm.projectInfo);
  });

  $scope.$on('tossProject', (event, project) => {
    console.log(project, 'from tshirt-editor');
  });

  function getPosition ($event) {
    let imgPosition = vm.projectInfo.tsFrontImages;
    let backimgPosition = vm.projectInfo.tsBackImages;
    let x = angular.element($event.target.offsetParent.offsetParent).prop('offsetLeft');
    let y = angular.element($event.target.offsetParent.offsetParent).prop('offsetTop');
    let h = angular.element($event.target).prop('clientHeight');
    let w = angular.element($event.target).prop('clientWidth');
    imgPosition[0].x_position = x;
    imgPosition[0].y_position = y;
    imgPosition[0].height = h;
    imgPosition[0].width = w;

    // for back shirt-editor
    backimgPosition[0].x_position = x;
    backimgPosition[0].y_position = y;
    backimgPosition[0].height = h;
    backimgPosition[0].width = w;
    //console.log($event);
  }


  console.log('from editor', vm.savedProject);

  // function resize (evt, ui) {
  //   console.log(evt, 'evt')
  //   console.log(ui, 'ui');
  //   vm.w = ui.size.width;
  //   vm.h = ui.size.height;
  //   console.log("width", vm.w);
  //   console.log("height", vm.h);
  // }

}

TshirtEditorController.$inject = ['$scope', '$rootScope'];

export default TshirtEditorController;
