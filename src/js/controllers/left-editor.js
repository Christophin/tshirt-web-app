function LeftSandboxController ($http, SERVER) {
    let vm = this;
    vm.showCategory = showCategory;
    vm.emptyCatData = emptyCatData;
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
                console.log(resp);
                vm.catData = resp.data;
                console.log(vm.catData);

            })

    }
    function emptyCatData() {
        vm.catData = null;
        console.log(vm.catData);
    }
}

LeftSandboxController.$inject = ['$http', 'SERVER'];

export default LeftSandboxController;
