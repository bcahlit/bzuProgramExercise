var cvi = cvi || {};

cvi.Rectangle = function (x, y, width, height) {
    this.initialize(x, y, width, height);
};


cvi.Rectangle.prototype.initialize = function (x, y, width, height) {
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 0;
    this.height = height || 0;

    this.origin = cvi.p(x, y);
    this.size = cvi.size(width, height);
};

cvi.Rectangle.prototype.clone = function () {
    return new Rectangle(this.x, this.y, this.width, this.height);
};

cvi.Rectangle.prototype.toString = function () {
    return "[Rectangle:(x = " + this.x + ', y = ' + this.y + ", width = " + this.width + ", height = " + this.height + ")]";
};

