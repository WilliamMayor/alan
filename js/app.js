'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('alan', ['alan.directives', 'alan.filters']);

app.run(function($rootScope) {
    $rootScope.log = function(l) {
        console.log(l);
    };
    var rs = $rootScope;

    rs.doc = window.document;

    rs.directions = {LEFT: "left", RIGHT: "right"};
    rs.symbols = {BLANK: {"value": ""}, EOT: {"value": ">"}};

    rs.alphabet = [];
    rs.nodes = {};
    rs.tape = [{"character": rs.symbols.EOT, "active": false, "editable": false}];
    for (var i = 0; i < 20; i++) {
        rs.tape.push({"character": rs.symbols.BLANK, "active": false, "editable": true});
    }
    rs.states = [];

    
    rs.tape[1] = {"character": rs.alphabet[1], "active": true, "editable": true};
    rs.tape[2] = {"character": rs.alphabet[0], "active": false, "editable": true};
    rs.tape[3] = {"character": rs.alphabet[1], "active": false, "editable": true};
    rs.tape[4] = {"character": rs.alphabet[1], "active": false, "editable": true};

    var n7 = {
        "transitions": [],
        "halt": true,
        "active": false,
        "x": 400,
        "y": 100,
        "loop": {"x": 0, "y": 0}
    };
    var n3 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "node": "3"
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "node": "3"
        }, {
            "read": rs.symbols.EOT,
            "write": rs.symbols.EOT,
            "move": rs.directions.RIGHT,
            "node": "7"
        }],
        "halt": false,
        "active": false,
        "x": 300,
        "y": 100,
        "loop": {"x": 300, "y": 10}
    };
    var n6 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.RIGHT,
            "node": "6"
        }, {
            "read": rs.symbols.BLANK,
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "node": "3"
        }],
        "halt": false,
        "active": false,
        "x": 400,
        "y": 200,
        "loop": {"x": 400, "y": 300}
    };
    var n5 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.RIGHT,
            "node": "6"
        }],
        "halt": false,
        "active": false,
        "x": 300,
        "y": 200,
        "loop": {"x": 0, "y": 0}
    };
    var n4 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "node": "3"
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "node": "4"
        }, {
            "read": rs.symbols.EOT,
            "write": rs.symbols.EOT,
            "move": rs.directions.RIGHT,
            "node": "5"
        }],
        "halt": false,
        "active": false,
        "x": 200,
        "y": 200,
        "loop": {"x": 200, "y": 300}
    };
    var n2 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "node": "3"
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "node": "4"
        }],
        "halt": false,
        "active": false,
        "x": 200,
        "y": 100,
        "loop": {"x": 0, "y": 0}
    };
    var n1 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.RIGHT,
            "node": "1"
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[1],
            "move": rs.directions.RIGHT,
            "node": "1"
        }, {
            "read": rs.symbols.BLANK,
            "write": rs.symbols.BLANK,
            "move": rs.directions.LEFT,
            "node": "2"
        }],
        "halt": false,
        "active": true,
        "x": 100,
        "y": 100,
        "loop": {"x": 100, "y": 200}
    };

    rs.nodes['1'] = n1;
    rs.nodes['2'] = n2;
    rs.nodes['3'] = n3;
    rs.nodes['4'] = n4;
    rs.nodes['5'] = n5;
    rs.nodes['6'] = n6;
    rs.nodes['7'] = n7;
});
