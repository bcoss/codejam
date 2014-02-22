/// <reference path="Game.ts" />
/// <reference path="../jquery/jquery.d.ts" />


(function ($, window) {
    var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.createElement("canvas"),
        holder: JQuery = $('#game-holder'),
        game: Core.Game = null;

    canvas.width = holder.width();
    canvas.height = holder.height();
    holder.append(canvas);

    game = new Core.Game(canvas);

    game.Initialize();
})($, window);