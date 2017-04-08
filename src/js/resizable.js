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
      console.log(elem.siblings('.ui-icon'));

      elem.siblings('.ui-icon').attr({'ng-class':`{'clearDiv': tshirtVm.projectInfo.selectObject}`});
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
