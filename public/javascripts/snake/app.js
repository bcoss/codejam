/// <reference path="Game.ts" />
/// <reference path="../jquery/jquery.d.ts" />
(function ($, window) {
    var canvas = document.createElement("canvas"), holder = $('#game-holder'), game = null;

    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    game = new Core.Game(canvas);

    game.Initialize();
})($, window);
//# sourceMappingURL=app.js.map
