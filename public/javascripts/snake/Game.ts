/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="Snake.ts" />

module Core {
    export class Game extends EndGate.Game {
        private snake: Entities.Snake;

        constructor(canvas: HTMLCanvasElement) {
            super(canvas);

            this.snake = new Entities.Snake(1, 15, 10, this.Scene);
        }

        public Initialize(): void {

            var grid = new EndGate.Graphics.Grid(400, 400, 25, 25, 32, 32, true, EndGate.Graphics.Color.Black);

            this.Scene.Add(grid);
        }

        public Update(gameTime: EndGate.GameTime): void {
            this.snake.Update(gameTime);
        }
    }
}