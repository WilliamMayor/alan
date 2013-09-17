'use strict';

function Character(value) {
    this.value = value;
    this.valid = true;
}

function Cell(character) {
    this.character = character;
}
Cell.prototype.update = function(character) {
    this.character = character;
}

// Declare app level module which depends on filters, and services
var app = angular.module('alan', ['alan.directives', 'alan.filters']);

app.run(function($rootScope) {
    var rs = $rootScope;

    rs.directions = {LEFT: new Character("\u21FD"), RIGHT: new Character("\u21FE")};
    rs.symbols = {BLANK: new Character("\u00A0")};

    rs.alphabet = [];
    rs.nodes = [];
    rs.tape = [];
    rs.states = [];

    rs.alphabet.push(new Character("0"));
    rs.alphabet.push(new Character("1"));
    
    for (var i=0; i<10; i++) {
        rs.tape.push(new Cell(rs.symbols.BLANK));
    }
    rs.tape.push(new Cell(rs.alphabet[1]));
    rs.tape.push(new Cell(rs.alphabet[1]));
    rs.tape.push(new Cell(rs.alphabet[1]));
    rs.tape.push(new Cell(rs.alphabet[1]));
    for (var i=0; i<10; i++) {
        rs.tape.push(new Cell(rs.symbols.BLANK));
    }
});
