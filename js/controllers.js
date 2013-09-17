function AlphabetCtrl($scope, $timeout) {
    $scope.validate = function(c) {
        if (!c["value"]) {
            c["valid"] = true;
            return;
        }
        for (i = 0; i < $scope.alphabet.length; i++) {
            if ($scope.alphabet[i] != c && $scope.alphabet[i]["value"] === c.value) {
                c["valid"] = false;
                return;
            }
        }
        c["valid"] = true;
    };
    $scope.morecharacters = function() {
        for (var i = 0; i < 5; i++ ) {
            $scope.alphabet.push({
                "value": "",
                "used": false,
                "valid": true
            });
        }
    };
}
function StateCtrl($scope, $rootScope) {
    $scope.step = function() {
        var node = $rootScope.nodes.filter(function(node) { return node["active"];})[0];
        var cell = $rootScope.tape.filter(function(cell) { return cell["active"];})[0];
        var transition = node["transitions"].filter(function(t) {return t["read"] == cell["character"];});
        if (transition.length === 0) {
            console.log("No valid transition", node, cell);
            return;
        }
        cell["character"] = transition[0]["write"];
        cell["active"] = false;
        var i = $rootScope.tape.indexOf(cell);
        switch (transition[0]["move"]) {
            case $rootScope.directions.LEFT:
                $rootScope.tape[i-1]["active"] = true;
                break;
            case $rootScope.directions.RIGHT:
                if (i === $rootScope.tape.length-1) {
                    $rootScope.tape.push({
                        "character": $rootScope.symbols.BLANK,
                        "active": true
                    });
                } else {
                    $rootScope.tape[i+1]["active"] = true;
                }
                break;
        }
        node["active"] = false;
        $scope.halt = transition[0]["state"]["halt"];
        transition[0]["state"]["active"] = true;
    };
}
function TapeCtrl($scope, $rootScope) {
    $scope.active = 10;
    $scope.doc = document;
    $scope.moretape = function(toLeft) {
        if (toLeft === true) {
            $scope.tape.unshift({"character": $scope.symbols.BLANK});
            $scope.active++;
        } else {
            $scope.tape.push({"character": $scope.symbols.BLANK});
        }
    };
    $scope.edit = function(cell) {
        $rootScope.$broadcast('tape-edit', cell);
    };
    $scope.forward = function() {
        $scope.active++;
    };
    $scope.back = function() {
        $scope.active--;
    };
    $scope.rewind = function() {
        for (var i=0; i<$scope.tape.length; i++) {
            if ($scope.tape[i].character !== $scope.symbols.BLANK) {
                if ($scope.active > i) {
                    $scope.active = i;
                }
                return;
            }
        }
    };
    $scope.fastforward = function() {
        for (var i=$scope.tape.length-1; i>=0; i--) {
            if ($scope.tape[i].character !== $scope.symbols.BLANK) {
                if ($scope.active < i) {
                    $scope.active = i;
                }
                return;
            }
        }
    };
}
function SelectorCtrl($scope, $rootScope) {
    $scope.hide = function() {
        $scope.show = false;
    }
    $scope.select = function(value) {
        $scope.previous = $scope.editable;
        $scope.hide();
        if ($scope.editable !== null) {
            $scope.editable.update(value);
        }
        setTimeout(function() {
            $scope.previous = null;
        }, 1000);
    }
    $rootScope.$on('tape-edit', function(event, cell) {
        if ($scope.previous !== cell) {
            $scope.editable = cell;
            $scope.show = true;
        }
    });
    $scope.doc = document;
    $scope.hide();
    $scope.editable = null;
    $scope.previous = null;
}