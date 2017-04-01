function LeftSandboxController ($scope, $http, SERVER) {
    let vm = this;
    vm.showCategory = showCategory;
    vm.emptyCatData = emptyCatData;
    vm.addText = addText;
    vm.tossImage = tossImage;
    vm.catData = null;
    vm.categories = {
        shapes: 'Shapes/Symbols',
        letters: 'Letters/Numbers',
        emojis: 'Emojis',
        nature: 'Nature',
        parties: 'Parties/Events',
        occupations: 'Occupations',
        music: 'Music',
        greekLife: 'Greek Life',
        charity: 'Charity',
        religion: 'Religion',
        sports: 'Sports/Games',
        animals: 'Animals',
        mascots: 'Mascots',
        america: 'America',
        military: 'Military',
        colleges: 'Colleges',
        transportation: 'Transportation',
        school: 'School',
        people: 'People',
        food: 'Food/Drink'
    };

    function showCategory (name) {
        $http.get(`${SERVER}/cliparts?category=${name}`)
            .then(resp =>   {
                vm.catData = resp.data;

            })

    }
    function emptyCatData() {
        vm.catData = null;
    }

    function tossImage(url) {
        $scope.$emit('image', url);
    }

    function addText(text) {
      console.log(text);
      $scope.$emit('addText', text);
    }
}

LeftSandboxController.$inject = ['$scope', '$http', 'SERVER'];

export default LeftSandboxController;
