/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="GameObj.ts" />
var Entities;
(function (Entities) {
    var Snake = (function () {
        function Snake(segs, x, y, scene) {
            // direction snake is facing
            // 0 is up
            // 1 is right
            // 2 is down
            // 3 is left
            this.dir = 1;
            this.lastMoveTime = 0;
            this.x = x;
            this.y = y;
            this.segs = segs;
            this.shape = new EndGate.Graphics.Rectangle(this.TranslateCoord(x), this.TranslateCoord(y), 31, 31, EndGate.Graphics.Color.Red);
            scene.Add(this.shape);
        }
        Snake.prototype.Update = function (gameTime) {
            if (gameTime.Total.Milliseconds - this.lastMoveTime > 1000) {
                this.lastMoveTime = gameTime.Total.Milliseconds;

                this.Move();
            }
        };

        Snake.prototype.Move = function () {
            switch (this.dir) {
                case 0:
                    --this.x;
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

            this.shape.Position.X = this.TranslateCoord(this.x);
            this.shape.Position.Y = this.TranslateCoord(this.y);
        };

        Snake.prototype.TranslateCoord = function (coord) {
            return (coord * 30) + 16 + (coord * 2);
        };
        return Snake;
    })();
    Entities.Snake = Snake;
})(Entities || (Entities = {}));
//# sourceMappingURL=Snake.js.map
