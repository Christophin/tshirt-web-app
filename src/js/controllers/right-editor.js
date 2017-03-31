function RightSandboxController ($scope) {

  let vm = this;
  vm.tshirtColor = {
    white: {
      url: './images/tshirts/White Front T-Shirt-450x550.png',
      class: 'white',
      id: 'white'
    },
    sportsGrey: {
      url: './images/tshirts/Sport Grey Front T-Shirt-450x550.png',
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


  vm.switchTshirt = switchTshirt;

  function switchTshirt (url) {
    $scope.$emit('tshirtUrl', url);
  }
}

RightSandboxController.$inject = ['$scope'];

export default RightSandboxController;
