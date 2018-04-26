var cvi = cvi || {};

cvi.Size = function (width, height) {
    this.initialize(width, height);
};


cvi.Size.prototype.initialize = function (width, height) {
    this.width = width || 0;
    this.height = height || 0;
};

cvi.Size.prototype.clone = function () {
    return new Size(this.width, this.height);
};

cvi.Size.prototype.toString= function () {
    return "[Size:(width = " + this.width + ", height = " + this.height + ")]";
};


