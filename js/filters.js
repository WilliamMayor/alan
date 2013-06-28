angular.module('alan.filters', []).filter('notempty', function() {
    return function(input) {
        return input.filter(function(character){
            return character.value !== "";
        });
    };
}).filter('addblank', function($rootScope) {
    return function(input) {
        input.unshift($rootScope.symbols.BLANK);
        return input;
    };
}).filter('nbsp', function() {
    return function(input) {
        if (input === "") {
            input = "\u00A0";
        }
        return input;
    };
});