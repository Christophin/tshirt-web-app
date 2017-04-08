import domtoimage from 'dom-to-image';

function TshirtEditorController ($scope, $rootScope, $http, SERVER) {
  let vm = this;

  vm.projectInfo = {
    name: '',
    color: '',
    ts_front_url: '',
    ts_back_url: '',
    tsFrontImages: [],
    tsBackImages: [],
    tsFrontText: [],
    tsBackText: []
  };
  init();

  vm.frontTshirtUrl = './images/tshirts/White Front T-Shirt-450x550.png';
  vm.backTshirtUrl = './images/tshirts/White Back T-Shirt.png';
  vm.tshirtSide = true;
  vm.getPosition = getPosition;
  vm.rotateShirt = rotateShirt;
  vm.frontDeleteImage = frontDeleteImage;
  vm.frontDeleteText = frontDeleteText;
  vm.backDeleteImage = backDeleteImage;
  vm.backDeleteText = backDeleteText;
  vm.selectedObject = false;

  function init () {
    if ($rootScope.savedProject != null) {
      vm.projectInfo = $rootScope.savedProject;
    }
  }

  $scope.$on('image', (event, image) =>  {

    if (vm.tshirtSide === true) {
      vm.projectInfo.tsFrontImages.push({
        url: image.url,
        htmlId: `frontImage-${vm.projectInfo.tsFrontImages.length}`
      });
    } else {
      vm.projectInfo.tsBackImages.push({
        url: image.url,
        htmlId: `backImage-${vm.projectInfo.tsBackImages.length}`
      });
    }
    console.log(vm.projectInfo.tsFrontImages)
  });

  $scope.$on('tshirtUrl', (event, data) => {
    vm.frontTshirtUrl = data.url;
    vm.backTshirtUrl = data.backUrl;
    vm.projectInfo.color = data.id;
    vm.projectInfo.ts_front_url = data.url;
    vm.projectInfo.ts_back_url = data.backUrl;
  });

  $scope.$on('addText', (event, text) => {
    if (vm.tshirtSide === true) {
      vm.projectInfo.tsFrontText.push({
        text: text,
        htmlId: `frontText-${vm.projectInfo.tsFrontText.length}`
      });
    } else {
      vm.projectInfo.tsBackText.push({
        text: text,
        htmlId: `backText-${vm.projectInfo.tsBackText.length}`
      });
    }
  });

  $scope.$on('needShirt', (name) => {
    vm.projectInfo.name = name.targetScope.name;
    $scope.$broadcast('projectInfo', vm.projectInfo);
  });

  $scope.$on('needImage', () => {


  });


  function getPosition ($event) {
    let container = angular.element($event.target.offsetParent.offsetParent);
    let textContainer = angular.element($event.target.offsetParent);
    let target = angular.element($event.target);
    let frontImage = vm.projectInfo.tsFrontImages.find(x => x.htmlId === target.attr('id'));
    let backImage = vm.projectInfo.tsBackImages.find(x => x.htmlId === target.attr('id'));
    let frontText = vm.projectInfo.tsFrontText.find(x => x.htmlId === target.attr('id'));
    let backText = vm.projectInfo.tsBackText.find(x => x.htmlId === target.attr('id'));

    if (frontImage) {
      frontImage.x_position = container.prop('offsetLeft');
      frontImage.y_position = container.prop('offsetTop');
      frontImage.height = target.prop('clientHeight');
      frontImage.width = target.prop('clientWidth');
    }
    if (backImage) {
      backImage.x_position = container.prop('offsetLeft');
      backImage.y_position = container.prop('offsetTop');
      backImage.height = target.prop('clientHeight');
      backImage.width = target.prop('clientWidth');
    }
    if (frontText) {
      frontText.x_position = textContainer.prop('offsetLeft');
      frontText.y_position = textContainer.prop('offsetTop');
    }
    if (backText) {
      backText.x_position = textContainer.prop('offsetLeft');
      backText.y_position = textContainer.prop('offsetTop');
    }
    // console.log('Front Images',vm.projectInfo.tsFrontImages);
    // console.log('Back Images',vm.projectInfo.tsBackImages);
    // console.log('Front Text',vm.projectInfo.tsFrontText);
    // console.log('Back Text',vm.projectInfo.tsBackText);
  }

  function rotateShirt () {
    vm.tshirtSide = !vm.tshirtSide;
    console.log('Project Info: ', vm.projectInfo);

  }

  function frontDeleteImage ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let frontDeleteImage = vm.projectInfo.tsFrontImages.findIndex(x => x.htmlId === target.attr('id'));
    vm.projectInfo.tsFrontImages.splice(frontDeleteImage, 1);
  }

  function frontDeleteText ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let frontDeleteText = vm.projectInfo.tsFrontText.findIndex(x => x.htmlId === target.attr('id'));
    vm.projectInfo.tsFrontText.splice(frontDeleteText, 1);
  }

  function backDeleteImage ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let backDeleteImage = vm.projectInfo.tsBackImages.findIndex(x => x.htmlId === target.attr('id'));
    vm.projectInfo.tsBackImages.splice(backDeleteImage, 1);
  }

  function backDeleteText ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let backDeleteText = vm.projectInfo.tsBackText.findIndex(x => x.htmlId === target.attr('id'));
    vm.projectInfo.tsBackText.splice(backDeleteText, 1);
  }

}

TshirtEditorController.$inject = ['$scope', '$rootScope', '$http', 'SERVER'];

export default TshirtEditorController;
