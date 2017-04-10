function resizable () {
  return {
    restrict: 'A',
    scope: {
      callback: '&onResize'
    },
    link: function postLink(scope, elem, attrs) {
      let initHeight = attrs.initheight;
      let initWidth = attrs.initwidth;
      let container = document.querySelector("#drag-container");
      elem.resizable({aspectRatio: true, handles: 'se', containment: container });
      console.log(elem.siblings('.ui-icon'));
      elem.siblings('.ui-icon').css('background-color','red !important');

      // elem.siblings('.ui-icon').css('background-image','url(`../images/resize-icon.png`)!important');
      elem.parent('.ui-wrapper').css({'height': `${initHeight}px`, 'width': `${initWidth}px`});

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
