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
    console.log(vm.projectInfo.tsFrontImages);
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
    console.log(vm.projectInfo.tsFrontText);
  });

  $scope.$on('needShirt', (name) => {
    vm.projectInfo.name = name.targetScope.name;
    $scope.$broadcast('projectInfo', vm.projectInfo);
  });

  function createBlob (key) {
    console.log("inside createBlob" + document.querySelector('#tshirt-sandbox .clipart').id);
    return domtoimage.toBlob(document.getElementById('tshirt-sandbox'))
        .then((blob) => {
            console.log("inside blob promise" + document.querySelector('#tshirt-sandbox .clipart').id);
            blob.name = key;
            console.log("finished blob ", key, blob.size);
            return blob;
    })
  }

  function uploadBlob (blob) {
    console.log("inside uploader...", blob.name);
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
            console.log(front, back);
            let images = Promise.all([front, back].map(uploadBlob));
            images.then(urls => {
                let data = buildProduct(urls);
                console.log('images', urls);
                $http.post(`${SERVER}/shopify/tossShirt`, data)
                    .then(shirt => console.log(shirt));
            })
        });
    });
      console.log("just flipped" + document.querySelector('#tshirt-sandbox .clipart').id);
  });

  // $scope.$on('needImage', () => {
  //   vm.tshirtSide = true;
  //   domtoimage.toBlob(document.getElementById('tshirt-sandbox'))
  //     .then((blob) => {
  //       blob.name = vm.projectInfo.name;
  //       window.client.upload(blob).then((result) => {
  //         vm.shopifyFrontUrl = result.url;
  //       });
  //     })
  //       .then( () => {
  //         vm.tshirtSide= !vm.tshirtSide;
  //         domtoimage.toBlob(document.getElementById('tshirt-sandbox'))
  //           .then((blob) => {
  //             blob.name = vm.projectInfo.name;
  //             window.client.upload(blob)
  //                 .then((result) => {
  //                   vm.shopifyBackUrl = result.url;
  //                   let data = {
  //                     product: {
  //                       title: vm.projectInfo.name,
  //                       frontImg: vm.shopifyFrontUrl,
  //                       backImg: vm.shopifyBackUrl
  //                     }
  //                   };
  //                   $http.post(`${SERVER}/shopify/tossShirt`, data)
  //                   .then(shirt => console.log(shirt));
  //                 });
  //           })
  //       });
  // });

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
    console.log('Front Images',vm.projectInfo.tsFrontImages);
    console.log('Back Images',vm.projectInfo.tsBackImages);
    console.log('Front Text',vm.projectInfo.tsFrontText);
    console.log('Back Text',vm.projectInfo.tsBackText);
  }

  function rotateShirt () {
    vm.tshirtSide = !vm.tshirtSide;
    console.log('Project Info: ', vm.projectInfo);

  }
}

TshirtEditorController.$inject = ['$scope', '$rootScope', '$http', 'SERVER'];

export default TshirtEditorController;
