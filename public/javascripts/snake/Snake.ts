/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="GameObj.ts" />

module Entities {
    export class Snake implements Core.GameObj {
        // location of snake
        private x: number;
        private y: number;

        // segments of snake
        private segs: number;

        // underlying shape representing shape
        private shape: EndGate.Graphics.Rectangle;

        // direction snake is facing
        // 0 is up
        // 1 is right
        // 2 is down
        // 3 is left
        private dir: number = 1;

        private lastMoveTime: number = 0;

        constructor(segs: number, x: number, y: number, scene: EndGate.Rendering.Scene2d) {
            this.x = x;
            this.y = y;
            this.segs = segs;
            this.shape = new EndGate.Graphics.Rectangle(
                this.TranslateCoord(x),
                this.TranslateCoord(y),
                31,
                31,
                EndGate.Graphics.Color.Red);
            scene.Add(this.shape);
        }

        public Update(gameTime: EndGate.GameTime): void {
            if(gameTime.Total.Milliseconds - this.lastMoveTime > 1000) {
                this.lastMoveTime = gameTime.Total.Milliseconds;

                this.Move();
            }
        }

        private Move(): void {
            switch(this.dir) {
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
        }

        private TranslateCoord(coord: number): number {
            return (coord * 30) + 16 + (coord * 2);
        }
    }
}