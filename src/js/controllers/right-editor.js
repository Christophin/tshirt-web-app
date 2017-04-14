function RightSandboxController ($scope, $http, SERVER, $state, $cookies) {

  let vm = this;

  vm.tshirtColor = {
    white: {
      url: './images/tshirts/White Front T-Shirt-450x550.png',
      backUrl: './images/tshirts/White Back T-Shirt.png',
      class: 'white',
      id: 'white'
    },
    sportsGrey: {
      url: './images/tshirts/Sport Grey Front T-Shirt-450x550.png',
      backUrl: './images/tshirts/Sports Grey Back T-Shirt.png',
      class: 'grey',
      id: 'sports-grey'
    },
    black: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'black',
      id: 'black'
    },
    darkHeather: {
      url: '.https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'blue-grey',
      id: 'dark-heather'
    },
    royal: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'light-blue darken-4',
      id: 'royal'
    },
    skyBlue: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'blue lighten-3',
      id: 'sky-blue'
    },
    floBlue: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'blue accent-1',
      id: 'flo-blue'
    },
    seafoam: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'cyan darken-3',
      id: 'sports-grey'
    },
    neonPink: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'pink lighten-2',
      id: 'sports-grey'
    },
    neonGreen: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'lime accent-1',
      id: 'neon-green'
    },
    neonOrange: {
      url: 'https://skpsoft.com/baby/wp-content/uploads/2016/09/default-thumbnail.jpg',
      class: 'orange accent-4',
      id: 'neon-orange'
    },
  };

  vm.saveProject = saveProject;
  vm.shopifyUpload = shopifyUpload;
  vm.switchTshirt = switchTshirt;
  vm.exportProject = exportProject;
  vm.updateTshirt = updateTshirt;

  function saveProject (name) {
    $scope.$emit('needShirt', name);
  }

  function updateTshirt() {
       console.log('inside updateTshirt');
       $scope.$emit('updateTshirt') }

  function exportProject (data) {
    $scope.$emit('needImage', data);
    $('#exportModal').modal('close');
  }

  $scope.$on('updateInfo', (event, updateInfo) => { 
    console.log('inside updateInfo', updateInfo); 
    $http.put(`${SERVER}/tshirt/${updateInfo.id}`)
        .then(resp => { 
          console.log(resp)
         })
   });


    $scope.$on('projectInfo', (event, projectInfo) => {
    $http.post(`${SERVER}/tshirt`, projectInfo)
        .then(resp => {
          console.log(resp);
          let userID = $cookies.get('user-id');
          $state.go('root.user', { userId: userID });
        })
        .catch(error => console.log(error));
  });

  function switchTshirt (data) {
    $scope.$emit('tshirtUrl', data);
  }

  function shopifyUpload () {
    $http({
      method: 'POST',
      url: `${SERVER}/shopify/add`,
      data: {
        'product': {
          'title': 'Tshirt Name',
          'vendor': 'designer tee',
          'product_type': 'T-Shirt',
          'images': [
            {
              'src': './images/tshirts/White Front T-Shirt-450x550.png'
            }
          ]
        }
      }
    })
    .then(resp => console.log(resp))
    .catch(error => console.log(error));
  }

}

RightSandboxController.$inject = ['$scope', '$http', 'SERVER', '$state', '$cookies'];

export default RightSandboxController;
