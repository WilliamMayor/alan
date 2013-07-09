function AlphabetCtrl($scope) {
    var Character = function(value) {
        this.value = value;
        this.used = false;
        this.valid = true;
    };

    $scope.validate = function(c) {
        c.valid = true;
        if (c.value) {
            for (i = 0; i < $scope.alphabet.length; i++) {
                if ($scope.alphabet[i] != c && $scope.alphabet[i].value === c.value) {
                    c.valid = false;
                    return;
                }
            }
        }
    };
    $scope.morecharacters = function() {
        for (var i = 0; i < 5; i++ ) {
            $scope.alphabet.push(new Character(""));
        }
    };

    $scope.alphabet.push(new Character("0"));
    $scope.alphabet.push(new Character("1"));
}
function StateCtrl($scope) {
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

    var Transition = function(from, read, write, move, to) {
        var destinations = Transition.prototype.all[from.id] || {};
        var t = destinations[to.id];
        if (typeof t !== "undefined"){
            t.paths.push({"read": read, "write": write, "move": move});
            return t;
        }
        this.from = from;
        this.to = to;
        this.paths = [];
        this.paths.push({"read": read, "write": write, "move": move});
    };

    Transition.prototype.all = {};

    Transition.prototype.describe = function(path) {
        var parts = [
            path.read.value,
            path.write.value,
            path.move
        ].map(function(e) {
            if (e === "") {
                return "_";
            } else if (e === $scope.directions.LEFT) {
                return "\u2190";
            } else if (e === $scope.directions.LEFT) {
                return "\u2192";
            }
            return e;
        }).join(", ");
    };

    Transition.prototype.draw = function(context) {
        context.beginPath();
        context.font = "normal 14px sans-serif";
        context.fillStyle = "#000000";
        context.strokeStyle = "#000000";

        var fonth = this.paths.length*16;

        context.moveTo(this.from.x, this.from.y);
        context.lineTo(this.to.x, this.to.y);
        context.stroke();

        if (self) {
            context.beginPath();
            context.arc(this.to.x, this.to.y, 5, 0, Math.PI*2, true);
            context.stroke();
            context.fillStyle = "#FFFFFF";
            context.fill();
            context.fillStyle = "#000000";
            context.closePath();

        }

        context.textBaseline = "middle";
        context.textAlign = "center";
        var fontt = (this.from.y + this.to.y - fonth)/2;
        var fontx = (this.from.x + this.to.x)/2;
        for (var i = 0; i < this.paths.length; i++) {
            var y = fontt + 8 + i*16;
            var text = this.describe(this.paths[i]);
            var width = context.measureText(text).width;
            context.fillStyle = "#FFFFFF";
            context.fillRect(fontx - width/2 - 2, y-8, width+4, 16);
            context.fillStyle = "#000000";
            context.fillText(text, fontx, y);
        }
        context.closePath();
    }

    var Node = function(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.halt = false;
        this.active = false;
        this.invalid = false;
        this.transitions = [];

        this.loopback = {'x': x, 'y': y - 50};
    }

    Node.prototype.draw = function(context) {
        context.beginPath();
        context.strokeStyle = "#000000";
        context.fillStyle = (this.active) ? "#75ae3a" : "#aad3e2";
        if (this.invalid) {
            context.fillStyle = "#bc443e";
        }
        if (this.halt) {
            context.rect(this.x - 25, this.y - 25, 50, 50);
        } else {
            context.arc(this.x, this.y, 25, 0, Math.PI*2, true);
        }
        context.stroke();
        context.fill();
        context.fillStyle = "#000000";
        context.font = "normal 18px sans-serif";
        context.textBaseline = "middle";
        context.textAlign = "center";
        context.fillText(id, this.x, this.y);
        context.closePath();
    }

    var CanvasState = function(canvas) {
        var state = this;

        canvas.addEventListener('selectstart', function(e) {e.preventDefault(); return false;}, false);
        canvas.addEventListener('mousedown', function(e) {
            var mouse = state.getMouse(e);
            var mx = mouse.x;
            var my = mouse.y;
            var shapes = state.shapes;
            var l = shapes.length;
            for (var i = l-1; i >= 0; i--) {
              if (shapes[i].contains(mx, my)) {
                var mySel = shapes[i];
                // Keep track of where in the object we clicked
                // so we can move it smoothly (see mousemove)
                state.dragoffx = mx - mySel.x;
                state.dragoffy = my - mySel.y;
                state.dragging = true;
                state.selection = mySel;
                state.valid = false;
                return;
              }
            }
            // havent returned means we have failed to select anything.
            // If there was an object selected, we deselect it
            if (state.selection) {
              state.selection = null;
              state.valid = false; // Need to clear the old selection border
            }
          }, true);
    }

    $scope.resize = function() {
        $scope.canvas.width = window.innerWidth;
        $scope.canvas.height = window.innerHeight;
        $scope.draw(); 
    };

    $scope.draw = function() {
        
    };

    $scope.canvas = document.getElementById('canvas');
    if(!$scope.canvas.getContext) {
        alert("Your browser does not support the HTML5 canvas element. You should upgrade it if you want to use alan. Sorry :(");
    }
    $scope.context = $scope.canvas.getContext('2d');
    window.addEventListener('resize', $scope.resize, false);
    $scope.resize();
}
function TapeCtrl($scope, $rootScope) {
    $scope.showalphabet = false;
    $scope.moretape = function() {
        for (var i = 0; i < 5; i++) {
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