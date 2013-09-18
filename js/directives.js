angular.module('alan.directives', []).directive('alScrollLeft', function() {
    return function(scope, elm, attr) {
        attr.$observe('alScrollLeft', function(value) {
            elm[0].scrollLeft = value;
        });
        setTimeout(function() {
            elm[0].scrollLeft = attr.alScrollLeft;
        });
    };
}).directive('alSelectable', function() {
    return function(scope, elm, attr) {
        elm.bind('mouseenter', function() {
            var s = document.querySelector("#selector");
            s.style.left = elm[0].getBoundingClientRect().left + "px";
            s.style.top = elm[0].getBoundingClientRect().top - 12 + "px";
            scope.$apply(attr.alSelectable);
        });
    };
}).directive('alInfinite', function() {
    return function(scope, elm, attr) {
        elm.bind('scroll', function(event) {
            if (elm[0].scrollLeft <= attr.alInfinite) {
                scope.$apply(attr.alInfiniteLeft);
            } else if (elm[0].scrollWidth - elm[0].scrollLeft - elm[0].offsetWidth <= attr.alInfinite) {
                scope.$apply(attr.alInfiniteRight);
            }
        });
    };
}).directive('alEatClick', function() {
    return function(scope, elm, attr) {
        elm.bind('click', function(event) {
            event.preventDefault();
        });
    }
}).directive('alCollapsable', function() {
    return function(scope, elm, attr) {
        setTimeout(function() {
            var a_collapse = angular.element("<a href='#collapse' class='collapsable'>&lt;</a>");
            var a_expand = angular.element("<a href='#expand' class='collapsable'>&gt;</a>");
            a_expand.css("visibility", "hidden");
            elm.prepend(a_collapse);
            elm.append(a_expand);
            a_collapse.bind('click', function() {
                elm.css("visibility", "hidden");
                a_expand.css("visibility", "visible");
            });
            a_expand.bind('click', function() {
                elm.css("visibility", "visible");
                a_expand.css("visibility", "hidden");
            });
        }, 100);
    }
});