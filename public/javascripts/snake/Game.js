/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="Snake.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Core;
(function (Core) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(canvas) {
            _super.call(this, canvas);

            this.snake = new Entities.Snake(15, 10, this.Scene, this.Input);
        }
        Game.prototype.Initialize = function () {
            var grid = new EndGate.Graphics.Grid(400, 400, 25, 25, 32, 32, true, EndGate.Graphics.Color.Black);

            this.Scene.Add(grid);
        };

        Game.prototype.Update = function (gameTime) {
            this.snake.Update(gameTime);
        };
        return Game;
    })(EndGate.Game);
    Core.Game = Game;
})(Core || (Core = {}));
//# sourceMappingURL=Game.js.map
