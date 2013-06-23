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
    $scope.addcharacter = function() {
        $scope.alphabet.push({
            "value": "",
            "used": false,
            "valid": true
        });
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
                        "active": true,
                        "editable": true
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
    $scope.showalphabet = false;
    $scope.loadmore = function() {
        for (var i = 1; i < 21; i++) {
            $scope.tape.push({"character": $scope.symbols.BLANK, "active": false, "editable": true});
        }
    };
    $scope.characterselected = function(c) {
        for (var i=0; i < $scope.tape.length; i++) {
            if ($scope.tape[i].editing) {
                $scope.tape[i].character = c;
                $scope.tape[i].editing = false;
            }
        }
        $scope.showalphabet = false;
    };
    $scope.edit = function(cell) {
        if (cell.editable) {
            cell.editing = true;
            $scope.showalphabet = true;
        }
    };
}