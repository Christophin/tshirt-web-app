function resizable () {
  console.log('from resizable');
  return {
    restrict: 'A',
    scope: {
      callback: '&onResize'

    },
    link: function postLink(scope, elem, attrs) {
      //console.log(attrs);
      //console.log(scope);
      elem.resizable({aspectRatio: true});
      elem.on('resize', function (evt, ui) {
        scope.$apply(function() {
          if (scope.callback) {
            scope.callback({$evt: evt, $ui: ui });
          }
        });
      });
    }
  };

}

export default resizable;
