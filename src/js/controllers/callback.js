function CallbackController($location) {
    console.log($location)
}

CallbackController.inject = ['$location'];

export default CallbackController;