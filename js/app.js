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
    rs.Character = Character;
    rs.Cell = Cell;

    rs.log = function(l) {
        console.log(l);
    };

    rs.doc = window.document;

    rs.directions = {LEFT: new Character("\u21FD"), RIGHT: new Character("\u21FE")};
    rs.symbols = {BLANK: new Character("\u00A0")};

    rs.alphabet = [];
    rs.nodes = [];
    rs.tape = [];
    rs.states = [];

    rs.alphabet.push(new Character("0"));
    rs.alphabet.push(new Character("1"));

    rs.mousemove = function(e) {
        rs.mouseX = event.pageX;
        rs.mouseY = event.pageY;
    }

    rs.cellEdit = function(editable) {
        rs.editable = editable;
        rs.withDirections = false;
        rs.showSelector = true;
    }
    
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
