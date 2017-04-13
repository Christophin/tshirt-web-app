import domtoimage from 'dom-to-image';
// import $ from 'jquery';

function TshirtEditorController ($scope, $rootScope, $http, SERVER, $timeout, $interval) {
  let vm = this;

  $rootScope.textSelected = false;
  $rootScope.imageSelected = false;

  vm.projectInfo = {
    name: '',
    color: '',
    ts_front_url: '',
    ts_back_url: '',
    tsFrontImages: [],
    tsBackImages: [],
    tsFrontText: [],
    tsBackText: [],
    snapShot: false,
    store: {}
  };

  vm.frontTshirtUrl = './images/tshirts/White Front T-Shirt-450x550.png';
  vm.backTshirtUrl = './images/tshirts/White Back T-Shirt.png';
  vm.tshirtSide = true;
  vm.clearTarget = clearTarget;
  vm.grabTarget = grabTarget;
  vm.rotateShirt = rotateShirt;
  vm.frontDeleteImage = frontDeleteImage;
  vm.frontDeleteText = frontDeleteText;
  vm.backDeleteImage = backDeleteImage;
  vm.backDeleteText = backDeleteText;
  vm.downloadShirt = downloadShirt;
  vm.shopifyFrontUrl = '';
  vm.shopifyBackUrl = '';
  vm.container = null;
  vm.textContainer = null;
  vm.target = null;

  function init () {
    if ($rootScope.savedProject != null) {
      vm.projectInfo = $rootScope.savedProject;
    }
  }

  $timeout(init(), 500);

  $scope.$on('image', (event, image) =>  {
    console.log('image from on', image);
    if (vm.tshirtSide === true) {
      vm.projectInfo.tsFrontImages.push({
        url: image.url,
        html_id: `frontImage-${vm.projectInfo.tsFrontImages.length}`,
        currentObject: true
      });
      $scope.$apply();
      console.log('form inside if', vm.projectInfo.tsFrontImages );
      $rootScope.imageSelected = true;
    } else {
      vm.projectInfo.tsBackImages.push({
        url: image.url,
        html_id: `backImage-${vm.projectInfo.tsBackImages.length}`,
        currentObject: true
      });
      $rootScope.imageSelected = true;
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
        html_id: `frontText-${vm.projectInfo.tsFrontText.length}`,
        currentFont: '',
        fontSize: '',
        currentObject: true
      });
      $rootScope.textSelected = true;
    } else {
      vm.projectInfo.tsBackText.push({
        text: text,
        html_id: `backText-${vm.projectInfo.tsBackText.length}`,
        currentFont: '',
        fontSize: '',
        currentObject: true
      });
      $rootScope.textSelected = true;
    }
  });

  $scope.$on('needShirt', (name) => {
    vm.projectInfo.name = name.targetScope.name;
    $scope.$broadcast('projectInfo', vm.projectInfo);
  });

  $scope.$on('updateTshirt', () => {
   console.log('inside Tshirt editor');
   $scope.$broadcast('updateInfo', vm.projectInfo)
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

  function downloadShirt () {
    vm.projectInfo.snapShot = true;
    angular.element($('.ui-icon').css('display', 'none'));
    domtoimage.toJpeg(document.getElementById('tshirt-sandbox'), { quality: 0.95 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'my-image-name.jpeg';
        link.href = dataUrl;
        link.click();
        vm.projectInfo.snapShot = false;
        angular.element($('.ui-icon').css('display', 'block'));
    });
  }

  function buildProduct ([frontImg, backImg]) {
    return {
      product: {
        title: vm.projectInfo.name,
        frontImg: frontImg,
        backImg: backImg,
        store: vm.projectInfo.store
      }
    }
  }

  $scope.$on('needImage', (event, data) => {
    vm.projectInfo.store = data;
      vm.tshirtSide = true;
      vm.projectInfo.snapShot = true;
      angular.element($('.ui-icon').css('display', 'none'));
      createBlob('frontBlob').then( (front) => {
        vm.tshirtSide = false;
        $scope.$apply();
        angular.element($('.ui-icon').css('display', 'none'));
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

  function currentTarget()  {
      vm.projectInfo.tsFrontImages.forEach(x => x.currentObject = false);
      vm.projectInfo.tsBackImages.forEach(x => x.currentObject = false);
      vm.projectInfo.tsFrontText.forEach(x => x.currentObject = false);
      vm.projectInfo.tsBackText.forEach(x => x.currentObject = false);

      let additions = [vm.projectInfo.tsFrontImages, vm.projectInfo.tsBackImages, vm.projectInfo.tsFrontText, vm.projectInfo.tsBackText];
      additions.forEach(x => {
          x.find(y => {
              if(y.html_id === vm.target.attr('id')) {
                y.currentObject = true;
                  if (y.url) {
                      $rootScope.imageSelected = true;
                      document.querySelector("[href='#add-art']").click();
                  }
                  if (y.text) {
                      $rootScope.textSelected = true;
                      document.querySelector("[href='#add-text']").click();
                      $scope.$broadcast('textInput', y.text);
                  }
              }
          });

      });

  }

  function clearTarget(event)  {
    if (vm.target === null) return;
    if (vm.target[0] != event.target)  {
        let additions = [vm.projectInfo.tsFrontImages, vm.projectInfo.tsBackImages, vm.projectInfo.tsFrontText, vm.projectInfo.tsBackText];
        additions.forEach(x => {
          x.forEach(y => y.currentObject = false);
        });
        //vm.currentObject = null;
        $rootScope.textSelected = false;
        $rootScope.imageSelected = false;
    }
  }

  function grabTarget($event)  {
      vm.container = angular.element($event.target.offsetParent.offsetParent);
      vm.textContainer = angular.element($event.target.offsetParent);
      vm.target = angular.element($event.target);
      $rootScope.startDragging = true;
      currentTarget();
  }

  $scope.$on('doneDragging', () => {
    let frontImage = vm.projectInfo.tsFrontImages.find(x => x.html_id === vm.target.attr('id'));
    let backImage = vm.projectInfo.tsBackImages.find(x => x.html_id === vm.target.attr('id'));
    let frontText = vm.projectInfo.tsFrontText.find(x => x.html_id === vm.target.attr('id'));
    let backText = vm.projectInfo.tsBackText.find(x => x.html_id === vm.target.attr('id'));

    if (frontImage) {
      frontImage.x_position = vm.container.prop('offsetLeft');
      frontImage.y_position = vm.container.prop('offsetTop');
      frontImage.height = vm.target.prop('clientHeight');
      frontImage.width = vm.target.prop('clientWidth');
    }
    if (backImage) {
      backImage.x_position = vm.container.prop('offsetLeft');
      backImage.y_position = vm.container.prop('offsetTop');
      backImage.height = vm.target.prop('clientHeight');
      backImage.width = vm.target.prop('clientWidth');
    }
    if (frontText) {
      frontText.x_position = vm.textContainer.prop('offsetLeft');
      frontText.y_position = vm.textContainer.prop('offsetTop');
    }
    if (backText) {
      backText.x_position = vm.textContainer.prop('offsetLeft');
      backText.y_position = vm.textContainer.prop('offsetTop');
    }
    $rootScope.startDragging = false;
  });

  function rotateShirt () {
    vm.tshirtSide = !vm.tshirtSide;
  }

  function frontDeleteImage ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let frontDeleteImage = vm.projectInfo.tsFrontImages.findIndex(x => x.html_id === target.attr('id'));
    vm.projectInfo.tsFrontImages.splice(frontDeleteImage, 1);
  }

  function frontDeleteText ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let frontDeleteText = vm.projectInfo.tsFrontText.findIndex(x => x.html_id === target.attr('id'));
    vm.projectInfo.tsFrontText.splice(frontDeleteText, 1);
  }

  function backDeleteImage ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let backDeleteImage = vm.projectInfo.tsBackImages.findIndex(x => x.html_id === target.attr('id'));
    vm.projectInfo.tsBackImages.splice(backDeleteImage, 1);
  }

  function backDeleteText ($event) {
    let target = angular.element($event.target.offsetParent.nextElementSibling.firstChild);
    let backDeleteText = vm.projectInfo.tsBackText.findIndex(x => x.html_id === target.attr('id'));
    vm.projectInfo.tsBackText.splice(backDeleteText, 1);
  }

  $scope.$on('changeFont', (event, selectedFont) => {
    let additions = [vm.projectInfo.tsFrontImages, vm.projectInfo.tsBackImages, vm.projectInfo.tsFrontText, vm.projectInfo.tsBackText];
    additions.forEach(x => {
        x.find(y => {
            if(y.html_id === vm.target.attr('id')) {
              // vm.currentObject = y;
              y.currentFont = selectedFont;
            }
        });
    });
  });

  $scope.$on('fontSize', (event, value) => {
    let additions = [vm.projectInfo.tsFrontImages, vm.projectInfo.tsBackImages, vm.projectInfo.tsFrontText, vm.projectInfo.tsBackText];
    additions.forEach(x => {
        x.find(y => {
            if(y.html_id === vm.target.attr('id')) {
              // vm.currentObject = y;
              y.fontSize = value;
            }
        });
    });
  });

  $scope.$on('updateText', (event, text) => {
    let additions = [vm.projectInfo.tsFrontImages, vm.projectInfo.tsBackImages, vm.projectInfo.tsFrontText, vm.projectInfo.tsBackText];
    additions.forEach(x => {
        x.find(y => {
            if(y.html_id === vm.target.attr('id')) {
              // vm.currentObject = y;
              y.text= text;
            }
        });
    });
  });


}

TshirtEditorController.$inject = ['$scope', '$rootScope', '$http', 'SERVER', '$timeout', '$interval'];

export default TshirtEditorController;
