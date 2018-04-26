var cvi = cvi || {};



cvi.Point = function (x, y) {
    this.initialize(x, y);
}


cvi.Point.prototype.initialize = function (x, y) {
    this.x = x || 0;
    this.y = y || 0;
}

cvi.Point.prototype.clone = function () {
    return new Point(this.x, this.y);
}

cvi.Point.prototype.toString= function () {
    return "[Point:(x = " + this.x + ', y = ' + this.y + ")]";
}
