angular.module('alan.filters', []).filter('notempty', function() {
    return function(input) {
        return input.filter(function(character) {
            return character.value !== "";
        });
    };
}).filter('replaceempty', function() {
    var replacement = new Cell(new Character("\u203C"));
    return function(input) {
        return input.map(function(cell) {
            if (cell.character.value === "") {
            	return replacement;
            }
            return cell;
        });
    };
});