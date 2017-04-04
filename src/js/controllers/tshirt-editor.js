function TshirtEditorController ($scope, $rootScope) {
  let vm = this;

  vm.projectInfo = {
    name: '',
    color: '',
    ts_front_url: '',
    ts_back_url: '',
    tsFrontImages: [],
    tsBackImages: []
  };

  vm.tshirtUrl= './images/tshirts/White Front T-Shirt-450x550.png';
  vm.texts = [];
  vm.getPosition = getPosition;
  //vm.resize = resize;

  function init () {
    if ($rootScope.savedProject != null) {
      vm.projectInfo = $rootScope.savedProject;
    }
  }

  init();

  $scope.$on('image', (event, image) =>  {
    vm.projectInfo.tsFrontImages.push({
      url: image.url
    })
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
    let container = angular.element($event.target.offsetParent.offsetParent);
    let target = angular.element($event.target);
    let image = vm.projectInfo.tsFrontImages.find(x => x.url === target.attr('ng-src'));
    if (image) {
      image.x_position = container.prop('offsetLeft');
      image.y_position = container.prop('offsetTop');
      image.height = target.prop('clientHeight');
      image.width = target.prop('clientWidth');
    } else {
      console.log("Shit. this should never happen. no matching image in projectInfo");
    }
  }

  //console.log('from editor', vm.savedProject);

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
