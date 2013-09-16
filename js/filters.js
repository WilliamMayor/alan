angular.module('alan.filters', []).filter('notempty', function() {
    return function(input) {
        return input.filter(function(character){
            return character.value !== "";
        });
    };
});