/// <reference path="../endgate/endgate-0.2.1.d.ts" />
/// <reference path="GameObj.ts" />
/// <reference path="Segment.ts" />

module Entities {
    export class Snake implements Core.GameObj {
        // location of snake
        private x: number;
        private y: number;

        // list of segments used
        private segs: Entities.Segment[] = [];

        // direction snake is facing
        // 0 is up
        // 1 is right
        // 2 is down
        // 3 is left
        private dir: number = 2;

        // time in millis for the snake to move
        private moveIteration: number = 300;

        // time in millis of the last movement
        private lastMoveTime: number = 0;

        // rendering scene
        private scene: EndGate.Rendering.Scene2d;

        // position of berry
        private berryX: number;
        private berryY: number;

        // underlying rectangle for a berry
        private berryRect: EndGate.Graphics.Rectangle;

        constructor(x: number, y: number, scene: EndGate.Rendering.Scene2d, input: EndGate.Input.InputManager) {
            this.x = x;
            this.y = y;
            var seg = new Entities.Segment(x, y, scene);
            this.segs.push(seg);
            this.scene = scene;

            this.berryRect = new EndGate.Graphics.Rectangle(
                0,
                0,
                31,
                31,
                EndGate.Graphics.Color.Blue
            );
            this.SpawnBerry();
            scene.Add(this.berryRect);

            input.Keyboard.OnCommandUp("Left", () => {
                if(this.dir != 1) this.dir = 3;
            });
            input.Keyboard.OnCommandUp("Right", () => {
                if(this.dir != 3) this.dir = 1;
            });
            input.Keyboard.OnCommandUp("Up", () => {
                if(this.dir != 2) this.dir = 0;
            });
            input.Keyboard.OnCommandUp("Down", () => {
                if(this.dir != 0) this.dir = 2;
            });
        }

        public Update(gameTime: EndGate.GameTime): void {
            if(gameTime.Total.Milliseconds - this.lastMoveTime > this.moveIteration) {
                this.lastMoveTime = gameTime.Total.Milliseconds;

                this.Move();
                if(this.CheckDeath()) {
                    this.Reset();
                }
            }
        }

        private Reset(): void {
            for(var i = 0; i < this.segs.length; i++) {
                this.segs[i].Destroy(this.scene);
            }
            this.dir = 2;
            this.x = 15;
            this.y = 10;
            var seg = new Entities.Segment(this.x, this.y, this.scene);
            this.segs = [];
            this.segs.push(seg);
            this.SpawnBerry();
        }

        private CheckDeath(): boolean {
            var deathBySelf = false;
            for(var i = 0; i < this.segs.length - 1; i++) {
                if(this.x === this.segs[i].x && this.y === this.segs[i].y) {
                    deathBySelf = true;
                }
            }
            return this.OutOfBounds(this.x, this.y) || deathBySelf;
        }

        private OutOfBounds(x: number, y: number): boolean {
            var transX = this.TranslateCoord(x);
            var transY = this.TranslateCoord(y);
            return transX < 0 || transX > 800 || transY < 0 || transY > 800;
        }

        private Move(): void {
            switch(this.dir) {
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
            if(this.x === this.berryX && this.y === this.berryY) {
                eaten = true;
                this.SpawnBerry();
            }
            if(!eaten) { //not eaten this frame
                this.segs[0].Destroy(this.scene);
                this.segs.shift();
            }
        }

        private SpawnBerry(): void {
            this.berryX = Math.round(Math.random() * 24);
            this.berryY = Math.round(Math.random() * 24);
            this.berryRect.Position.X = this.TranslateCoord(this.berryX);
            this.berryRect.Position.Y = this.TranslateCoord(this.berryY);
        }

        private TranslateCoord(coord: number): number {
            return (coord * 30) + 16 + (coord * 2);
        }
    }
}