/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="GameObj.ts" />
/// <reference path="Segment.ts" />
var Entities;
(function (Entities) {
    var Snake = (function () {
        function Snake(x, y, scene, input) {
            var _this = this;
            // list of segments used
            this.segs = [];
            // direction snake is facing
            // 0 is up
            // 1 is right
            // 2 is down
            // 3 is left
            this.dir = 2;
            // time in millis for the snake to move
            this.moveIteration = 300;
            // time in millis of the last movement
            this.lastMoveTime = 0;
            this.x = x;
            this.y = y;
            var seg = new Entities.Segment(x, y, scene);
            this.segs.push(seg);
            this.scene = scene;

            this.berryRect = new EndGate.Graphics.Rectangle(0, 0, 31, 31, EndGate.Graphics.Color.Blue);
            this.SpawnBerry();
            scene.Add(this.berryRect);

            input.Keyboard.OnCommandUp("Left", function () {
                if (_this.dir != 1)
                    _this.dir = 3;
            });
            input.Keyboard.OnCommandUp("Right", function () {
                if (_this.dir != 3)
                    _this.dir = 1;
            });
            input.Keyboard.OnCommandUp("Up", function () {
                if (_this.dir != 2)
                    _this.dir = 0;
            });
            input.Keyboard.OnCommandUp("Down", function () {
                if (_this.dir != 0)
                    _this.dir = 2;
            });
        }
        Snake.prototype.Update = function (gameTime) {
            if (gameTime.Total.Milliseconds - this.lastMoveTime > this.moveIteration * (1 - (this.segs.length / 100))) {
                this.lastMoveTime = gameTime.Total.Milliseconds;

                this.Move();
                if (this.CheckDeath()) {
                    this.Reset();
                }
            }
        };

        Snake.prototype.Reset = function () {
            for (var i = 0; i < this.segs.length; i++) {
                this.segs[i].Destroy(this.scene);
            }
            this.dir = 2;
            this.x = 15;
            this.y = 10;
            var seg = new Entities.Segment(this.x, this.y, this.scene);
            this.segs = [];
            this.segs.push(seg);
            this.SpawnBerry();
        };

        Snake.prototype.CheckDeath = function () {
            var deathBySelf = false;
            for (var i = 0; i < this.segs.length - 1; i++) {
                if (this.x === this.segs[i].x && this.y === this.segs[i].y) {
                    deathBySelf = true;
                }
            }
            return this.OutOfBounds(this.x, this.y) || deathBySelf;
        };

        Snake.prototype.OutOfBounds = function (x, y) {
            var transX = this.TranslateCoord(x);
            var transY = this.TranslateCoord(y);
            return transX < 0 || transX > 800 || transY < 0 || transY > 800;
        };

        Snake.prototype.Move = function () {
            switch (this.dir) {
                case 0:
                    --this.y;
                    break;
                case 1:
                    ++this.x;
                    break;
                case 2:
                    ++this.y;
                    break;
                case 3:
                    --this.x;
                    break;
            }

            var eaten = false;
            this.segs.push(new Entities.Segment(this.x, this.y, this.scene));
            if (this.x === this.berryX && this.y === this.berryY) {
                eaten = true;
                this.SpawnBerry();
            }
            if (!eaten) {
                this.segs[0].Destroy(this.scene);
                this.segs.shift();
            }
        };

        Snake.prototype.SpawnBerry = function () {
            this.berryX = Math.round(Math.random() * 24);
            this.berryY = Math.round(Math.random() * 24);
            this.berryRect.Position.X = this.TranslateCoord(this.berryX);
            this.berryRect.Position.Y = this.TranslateCoord(this.berryY);
        };

        Snake.prototype.TranslateCoord = function (coord) {
            return (coord * 30) + 16 + (coord * 2);
        };
        return Snake;
    })();
    Entities.Snake = Snake;
})(Entities || (Entities = {}));
//# sourceMappingURL=Snake.js.map
