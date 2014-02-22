/// <reference path="../endgate/endgate-0.2.1.d.ts" />

module Entities {
    export class Segment {
        // location of segment
        public x: number;
        public y: number;

        // underlying rectangle of segment
        private rect: EndGate.Graphics.Rectangle;

        constructor(x: number, y: number, scene: EndGate.Rendering.Scene2d) {
            this.x = x;
            this.y = y;

            this.rect = new EndGate.Graphics.Rectangle(
                this.TranslateCoord(x),
                this.TranslateCoord(y),
                31,
                31,
                EndGate.Graphics.Color.Red);
            scene.Add(this.rect);
        }

        public Destroy(scene: EndGate.Rendering.Scene2d) {
            scene.Remove(this.rect);
        }

        private TranslateCoord(coord: number): number {
            return (coord * 30) + 16 + (coord * 2);
        }
    }
}