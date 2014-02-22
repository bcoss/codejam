/// <reference path="../endgate/endgate-0.2.1.d.ts" />
var Entities;
(function (Entities) {
    var Segment = (function () {
        function Segment(x, y, scene) {
            this.x = x;
            this.y = y;

            this.rect = new EndGate.Graphics.Rectangle(this.TranslateCoord(x), this.TranslateCoord(y), 31, 31, EndGate.Graphics.Color.Red);
            scene.Add(this.rect);
        }
        Segment.prototype.Destroy = function (scene) {
            scene.Remove(this.rect);
        };

        Segment.prototype.TranslateCoord = function (coord) {
            return (coord * 30) + 16 + (coord * 2);
        };
        return Segment;
    })();
    Entities.Segment = Segment;
})(Entities || (Entities = {}));
//# sourceMappingURL=Segment.js.map
