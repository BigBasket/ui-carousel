angular.module('ui.carousel.directives')
.directive('uiCarousel', ['$compile', '$templateCache', '$sce',
  function($compile, $templateCache, $sce) {

    return { restrict: 'AE',
      bindToController: true,
      scope: {
        name: '=?',
        slides: '=',
        show: '=?slidesToShow',
        scroll: '=?slidesToScroll',
        classes: '@',
        fade: '=?',
        onChange: '=?',
        disableArrow: '=?',
        autoplay: '=?',
        autoplaySpeed: '=?',
        cssEase: '=?',
        speed: '=?',
        infinite: '=?',
        arrows: '=?',
        dots: '=?',
        initialSlide: '=?',
        visibleNext: '=?',
        visiblePrev: '=?',
        refreshFlag: '=?',

        // Method
        onBeforeChange: '&',
        onAfterChange: '&',
        onInit: '&',
        onItemClick: '&'
      },
      link($scope, el) {
        const template = angular.element(
          $templateCache.get('ui-carousel/carousel.template.html')
        );

        // dynamic injections to override the inner layers' components
        const injectComponentMap = {
          'carousel-item': '.carousel-item',
          'carousel-prev': '.carousel-prev',
          'carousel-next': '.carousel-next',
        };

        const templateInstance = template.clone();
        angular.forEach(injectComponentMap, (innerSelector, outerSelector) => {
          const outerElement = el[0].querySelector(outerSelector);
          if (outerElement) {
            angular
              .element(templateInstance[0].querySelector(innerSelector))
              .html(outerElement.innerHTML);
          }
        });

        const compiledElement = $compile(templateInstance)($scope);
        el.addClass('ui-carousel').html('').append(compiledElement);

        $scope.$watch(
          function () {
            return [el[0].offsetWidth, el[0].offsetHeight].join('x');
          },
          function (value) {
            $scope.doRefresh();
          }
        );

        $scope.$watch(
          function () {
            return [el[0].parentNode.offsetWidth, el[0].parentNode.offsetHeight].join('x');
          },
          function (value) {
            $scope.doRefresh();
          }
      	);
      },

      controller: 'CarouselController',
      controllerAs: 'ctrl'
    };
  }]);
