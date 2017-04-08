function resizable () {
  return {
    restrict: 'A',
    scope: {
      callback: '&onResize'
    },
    link: function postLink(scope, elem, attrs) {
      let initHeight = attrs.initheight;
      let initWidth = attrs.initwidth;
      elem.resizable({aspectRatio: true});
      elem.parent('.ui-wrapper').css({'height': `${initHeight}px`, 'width': `${initWidth}px`});
      console.log(elem.sibling);
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
