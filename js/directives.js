angular.module('alan.directives', []).directive(['focus', 'blur', 'keyup', 'keydown', 'keypress', 'resize'].reduce(function(container, name) {
    var directiveName = 'ng' + name[0].toUpperCase() + name.substr(1);
    container[directiveName] = ['$parse', function($parse) {
        return function(scope, element, attr) {
            var fn = $parse(attr[directiveName]);
            element.bind(name, function(event) {
                scope.$apply(function () {
                    fn(scope, {
                        $event: event
                    });
                });
            });
        };
    }];
    return container;
}, {})).directive('scrollleft', function() {
    return function(scope, elm, attr) {
        attr.$observe('scrollleft', function(value) {
            elm[0].scrollLeft = value;
        });
        setTimeout(function() {
            elm[0].scrollLeft = attr.scrollleft; 
        });
    };
}).directive('left', function() {
    return function(scope, elm, attr) {
        elm.bind('scroll', function(event) {
            if (elm[0].scrollLeft <= 100) {
                scope.$apply(attr.left);
            }
        });
    };
}).directive('right', function() {
    return function(scope, elm, attr) {
        elm.bind('scroll', function(event) {
            if (elm[0].scrollWidth - elm[0].scrollLeft - elm[0].offsetWidth <= 100) {
                scope.$apply(attr.right);
            }
        });
    };
}).directive('movetomouse', function() {
    return function(scope, elm, attr) {
        attr.$observe('movetomouse', function(value) {
            if (value === 'true' || value === true) {
                elm[0].style.top = (scope.mouseY - 80) + "px";
                elm[0].style.left = (scope.mouseX - 37) + "px";
            }
        });
    };
}).directive('eatClick', function() {
    return function(scope, elm, attr) {
        elm.bind('click', function(event) {
            event.preventDefault();
        });
    }
});