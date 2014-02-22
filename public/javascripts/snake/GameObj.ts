/// <reference path="../endgate/endgate-0.2.1.d.ts" />

module Core {
    export interface GameObj {
        Update(gameTime: EndGate.GameTime): void;
    }
}