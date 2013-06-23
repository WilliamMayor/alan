'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('alan', []).directive( [ 'focus', 'blur', 'keyup', 'keydown', 'keypress' ].reduce( function ( container, name ) {
    var directiveName = 'ng' + name[ 0 ].toUpperCase( ) + name.substr( 1 );

    container[ directiveName ] = [ '$parse', function ( $parse ) {
        return function ( scope, element, attr ) {
            var fn = $parse( attr[ directiveName ] );
            element.bind( name, function ( event ) {
                scope.$apply( function ( ) {
                    fn( scope, {
                        $event : event
                    } );
                } );
            } );
        };
    } ];

    return container;
}, { } ) );

app.run(function($rootScope) {
    $rootScope.log = function(l) {
        console.log(l);
    };
    var rs = $rootScope;

    rs.doc = window.document;

    rs.directions = {LEFT: "left", RIGHT: "right"};
    rs.symbols = {BLANK: {"value": ""}, EOT: {"value": ">"}};

    rs.alphabet = [];
    rs.nodes = [];
    rs.tape = [{"character": rs.symbols.EOT, "active": false, "editable": false}];
    for (var i = 0; i < 20; i++) {
        rs.tape.push({"character": rs.symbols.BLANK, "active": false, "editable": true});
    }
    rs.states = [];

    rs.alphabet.push({"value": "0", "used": true, "valid": true});
    rs.alphabet.push({"value": "1", "used": true, "valid": true});
    for (i = 0; i < 50; i++) {
        rs.alphabet.push({"value": "", "used": false, "valid": true});
    }
    rs.tape[1] = {"character": rs.alphabet[1], "active": true, "editable": true};
    rs.tape[2] = {"character": rs.alphabet[1], "active": false, "editable": true};
    rs.tape[3] = {"character": rs.alphabet[1], "active": false, "editable": true};
    rs.tape[4] = {"character": rs.alphabet[1], "active": false, "editable": true};

    var n7 = {
        "transitions": [],
        "halt": true,
        "active": false
    };
    var n3 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "state": null
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "state": null
        }, {
            "read": rs.symbols.EOT,
            "write": rs.symbols.EOT,
            "move": rs.directions.RIGHT,
            "state": n7
        }],
        "halt": false,
        "active": false
    };
    n3["transitions"][0]["state"] = n3;
    n3["transitions"][1]["state"] = n3;
    var n6 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.RIGHT,
            "state": null
        }, {
            "read": rs.symbols.BLANK,
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "state": n3
        }],
        "halt": false,
        "active": false
    };
    n6["transitions"][0]["state"] = n6;
    var n5 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.RIGHT,
            "state": n6
        }],
        "halt": false,
        "active": false
    };
    var n4 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "state": n3
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "state": null
        }, {
            "read": rs.symbols.EOT,
            "write": rs.symbols.EOT,
            "move": rs.directions.RIGHT,
            "state": n5
        }],
        "halt": false,
        "active": false
    };
    n4["transitions"][1]["state"] = n4;
    var n2 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[1],
            "move": rs.directions.LEFT,
            "state": n3
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[0],
            "move": rs.directions.LEFT,
            "state": n4
        }],
        "halt": false,
        "active": false
    };
    var n1 = {
        "transitions": [{
            "read": rs.alphabet[0],
            "write": rs.alphabet[0],
            "move": rs.directions.RIGHT,
            "state": null
        }, {
            "read": rs.alphabet[1],
            "write": rs.alphabet[1],
            "move": rs.directions.RIGHT,
            "state": null
        }, {
            "read": rs.symbols.BLANK,
            "write": rs.symbols.BLANK,
            "move": rs.directions.LEFT,
            "state": n2
        }],
        "halt": false,
        "active": true
    };
    n1["transitions"][0]["state"] = n1;
    n1["transitions"][1]["state"] = n1;
    rs.nodes.push(n1, n2, n3, n4, n5, n6, n7);
});
