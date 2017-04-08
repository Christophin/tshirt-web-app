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
  vm.frontImageCount = 0;
  vm.backImageCount = 0;
  vm.frontTextCount = 0;
  vm.backImageCount = 0;
  vm.shopifyFrontUrl = '';
  vm.shopifyBackUrl = '';

  function init () {
    if ($rootScope.savedProject != null) {
      vm.projectInfo = $rootScope.savedProject;
    }
  }

  $scope.$on('image', (event, image) =>  {

    if (vm.tshirtSide === true) {
      vm.projectInfo.tsFrontImages.push({
        url: image.url,
        htmlId: `frontImage${vm.frontImageCount}`
      });
      vm.frontImageCount++;
    } else {
      vm.projectInfo.tsBackImages.push({
        url: image.url,
        htmlId: `backImage${vm.backImageCount}`
      });
    }
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
        htmlId: `frontText${vm.frontTextCount}`
      });
      vm.frontTextCount++;
    } else {
      vm.projectInfo.tsBackText.push({
        text: text,
        htmlId: `backText${vm.backTextCount}`
      });
      vm.backTextCount++;
    }
  });

  $scope.$on('needShirt', (name) => {
    vm.projectInfo.name = name.targetScope.name;
    $scope.$broadcast('projectInfo', vm.projectInfo);
  });

  function createBlob (key) {
    return domtoimage.toBlob(document.getElementById('tshirt-sandbox'))
        .then((blob) => {
            blob.name = key;
            return blob;
    })
  }

  function uploadBlob (blob) {
    return window.client.upload(blob).then(result => {
      return result.url;
    })
  }

  function buildProduct ([frontImg, backImg]) {
    return {
      product: {
        title: vm.projectInfo.name,
        frontImg: frontImg,
        backImg: backImg
      }
    }
  }

  $scope.$on('needImage', () => {
      vm.tshirtSide = true;
      createBlob('frontBlob').then( (front) => {
        vm.tshirtSide = false;
        $scope.$apply();
        createBlob('backBlob').then( (back) => {
            let images = Promise.all([front, back].map(uploadBlob));
            images.then(urls => {
                let data = buildProduct(urls);
                $http.post(`${SERVER}/shopify/tossShirt`, data)
                    .then(shirt => console.log(shirt));
            })
        });
    });
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
      frontImage.x_position = container.prop('offsetLeft') - 57;
      frontImage.y_position = container.prop('offsetTop');
      frontImage.height = target.prop('clientHeight');
      frontImage.width = target.prop('clientWidth');
    }
    if (backImage) {
      backImage.x_position = container.prop('offsetLeft') - 57;
      backImage.y_position = container.prop('offsetTop');
      backImage.height = target.prop('clientHeight');
      backImage.width = target.prop('clientWidth');
    }
    if (frontText) {
      frontText.x_position = textContainer.prop('offsetLeft') - 57;
      frontText.y_position = textContainer.prop('offsetTop');
    }
    if (backText) {
      backText.x_position = textContainer.prop('offsetLeft') - 57;
      backText.y_position = textContainer.prop('offsetTop');
    }
  }

  function rotateShirt () {
    vm.tshirtSide = !vm.tshirtSide;
  }
}

TshirtEditorController.$inject = ['$scope', '$rootScope', '$http', 'SERVER'];

export default TshirtEditorController;
