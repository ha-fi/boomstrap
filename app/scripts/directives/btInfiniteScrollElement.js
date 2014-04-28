(function(Boomstrap) {
  'use strict';
  Boomstrap.directive('btInfiniteScrollElement', function($rootScope, $timeout) {
    return {
      link: function(scope, elem, attrs) {
        var checkWhenEnabled, handler, scrollEnabled, scrollDistance;

        scrollEnabled = true;
        checkWhenEnabled = false;
        scrollDistance = 30; // 30 is the default scroll distance

        attrs.$observe('infiniteScrollDistance', function(newVal, oldVal) {
          if (newVal !== oldVal && newVal) {
            scrollDistance = parseInt(newVal, 10);
            if (isNaN(scrollDistance)) {
              scrollDistance = 30;
            }
          }
        });

        handler = function() {
          var elementTotalHeight,
              elementScrollPosition,
              elementVisibleHeight,
              shouldScroll;

          // scrollHeight, scrollTop works for elements
          // overflow-y scroll too

          elementTotalHeight = elem[0].scrollHeight;
          elementScrollPosition = elem.scrollTop();
          elementVisibleHeight = elem.height();

          shouldScroll = elementTotalHeight - (elementVisibleHeight + elementScrollPosition) <= scrollDistance;

          if (shouldScroll && scrollEnabled) {
            if ($rootScope.$$phase) {
              return scope.$eval(attrs.btInfiniteScrollElement);
            } else {
              return scope.$apply(attrs.btInfiniteScrollElement);
            }
          } else if (shouldScroll) {
            checkWhenEnabled = true;
            return checkWhenEnabled;
          }
        };

        elem.on('scroll', handler);
        scope.$on('$destroy', function() {
          return elem.off('scroll', handler);
        });

        $timeout(function() {
          if (attrs.infiniteScrollImmediateCheck) {
            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }, 0);
      }
    };
  });
})(angular.module('boomstrap'));