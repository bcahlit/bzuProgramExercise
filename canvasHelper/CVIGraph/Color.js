var cvi = cvi || {};

/**
 * @class Color3B 用Byte表示三原色
 * @property {Number} r 红色
 * @property {Number} g 绿色
 * @property {Number} b 蓝色
 * @constructor
 */
cvi.Color3B = function (r, g, b) {
    this.initialize(r, g, b);
};

cvi.Color3B.prototype.initialize = function (r, g, b) {
    r = cvi.clamp(r, 0, 255);
    g = cvi.clamp(g, 0, 255);
    b = cvi.clamp(b, 0, 255);
    this.r = r;
    this.g = g;
    this.b = b;
};

/**
 * @description 将三原色数值表示成CSS颜色值
 * @returns {String}
 */
cvi.Color3B.prototype.toStr = function () {
    return cvi.c3bToStr(this);
};

/**
 * @description 克隆颜色对象
 * @returns {cvi.Color3B}
 */
cvi.Color3B.prototype.clone = function () {
    return new cvi.Color3B(this.r, this.g, this.b);
};

/**
 * @class Color3F 用Float表示三原色
 * @property {Number} r 红色
 * @property {Number} g 绿色
 * @property {Number} b 蓝色
 * @constructor
 */
cvi.Color3F = function (r, g, b) {
    this.initialize(r, g, b);
};

cvi.Color3F.prototype.initialize = function (r, g, b) {
    r = cvi.clamp(r, 0, 1);
    g = cvi.clamp(g, 0, 1);
    b = cvi.clamp(b, 0, 1);
    this.r = r;
    this.g = g;
    this.b = b;
};

/**
 * @description 将三原色数值表示成CSS颜色值
 * @returns {string}
 */
cvi.Color3F.prototype.toStr = function () {
    return cvi.c3fToStr(this);
};

/**
 * @description 克隆颜色对象
 * @returns {cvi.Color3F}
 */
cvi.Color3F.prototype.clone = function () {
    return new cvi.Color3F(this.r, this.g, this.b);
};

/**
 * @class 用Byte表示颜色值，另加透明度属性
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a Alpha透明度
 * @constructor
 */
cvi.Color4B = function (r, g, b, a) {
    this.initialize(r, g, b, a);
};

cvi.Color4B.prototype.initialize = function (r, g, b, a) {
    r = cvi.clamp(r, 0, 255);
    g = cvi.clamp(g, 0, 255);
    b = cvi.clamp(b, 0, 255);
    a = cvi.clamp(a, 0, 255);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

/**
 * @description 将数值表示成CSS颜色值
 * @returns {string}
 */
cvi.Color4B.prototype.toStr = function () {
    return cvi.c4bToStr(this);
};

/**
 * @description 克隆颜色对象
 * @returns {cvi.Color4B}
 */
cvi.Color4B.prototype.clone = function () {
    return new cvi.Color4B(this.r, this.g, this.b, this.a);
};

/**
 * @class 用Float表示颜色值，另加透明度属性
 * @param {Number} r
 * @param {Number} g
 * @param {Number} b
 * @param {Number} a Alpha透明度
 * @constructor
 */
cvi.Color4F = function (r, g, b, a) {
    this.initialize(r, g, b, a);
};

cvi.Color4F.prototype.initialize = function (r, g, b, a) {
    r = cvi.clamp(r, 0, 1);
    g = cvi.clamp(g, 0, 1);
    b = cvi.clamp(b, 0, 1);
    a = cvi.clamp(a, 0, 1);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

/**
 * @description 将数值表示成CSS颜色值
 * @returns {string}
 */
cvi.Color4F.prototype.toStr = function () {
    return cvi.c4fToStr(this);
};

/**
 * @description 克隆颜色对象
 * @returns {cvi.Color4F}
 */
cvi.Color4F.prototype.clone = function () {
    return new cvi.Color4F(this.r, this.g, this.b, this.a);
};

/**
 * @description 快速创建Color3B颜色对象
 * @param {Number} r 0-255
 * @param {Number} g 0-255
 * @param {Number} b 0-255
 * @returns {cvi.Color3B}
 */
cvi.c3b = function (r, g, b) {
    return new cvi.Color3B(r, g, b);
};

/**
 * @description 快速创建Color3F颜色对象
 * @param {Number} r 0-1
 * @param {Number} g 0-1
 * @param {Number} b 0-1
 * @returns {cvi.Color3F}
 */
cvi.c3f = function (r, g, b) {
    return new cvi.Color3F(r, g, b);
};

/**
 * @description 将Byte表示转化成Float表示
 * @param {cvi.Color3B} c3b
 * @returns {cvi.Color3F}
 */
cvi.c3bToc3f = function (c3b) {
    var r = (c3b.r / 255);
    var g = (c3b.g / 255);
    var b = (c3b.b / 255);
    return cvi.c3f(r, g, b);
};

/**
 * @description 将Float表示转化成Byte表示
 * @param {cvi.Color3F} c3f
 * @returns {cvi.Color3B}
 */
cvi.c3fToc3b = function (c3f) {
    var r = Math.floor(c3f.r * 255);
    var g = Math.floor(c3f.g * 255);
    var b = Math.floor(c3f.b * 255);
    return cvi.c3b(r, g, b);
};

/**
 * @description 将Byte表示转化成CSS颜色值
 * @param {cvi.Color3B} c3b
 * @returns {string}
 */
cvi.c3bToStr = function (c3b) {
    var r = c3b.r;
    var g = c3b.g;
    var b = c3b.b;

    var result = '#';
    result += r < 16 ? ('0' + r) : r.toString(16);
    result += g < 16 ? ('0' + g) : g.toString(16);
    result += b < 16 ? ('0' + b) : b.toString(16);
    return result;
};

/**
 * @description 将Float表示转化成CSS颜色值
 * @param {cvi.Color3F} c3f
 * @returns {string}
 */
cvi.c3fToStr = function (c3f) {
    var c3b = cvi.c3fToc3b(c3f);
    return cvi.c3bToStr(c3b);
};

/**
 * @description 快速创建Color4B颜色对象
 * @param {Number} r 0-255
 * @param {Number} g 0-255
 * @param {Number} b 0-255
 * @param {Number} a 0-255
 * @returns {cvi.Color4B}
 */
cvi.c4b = function (r, g, b, a) {
    return new cvi.Color4B(r, g, b, a);
};

/**
 * @description 快速创建Color4F颜色对象
 * @param {Number} r 0-1
 * @param {Number} g 0-1
 * @param {Number} b 0-1
 * @param {Number} a 0-1
 * @returns {cvi.Color4F}
 */
cvi.c4f = function (r, g, b, a) {
    return new cvi.Color4F(r, g, b, a);
};

/**
 * @description 将Float表示转化成Byte表示
 * @param {cvi.Color4F} c4f
 * @returns {cvi.Color4B}
 */
cvi.c4fToc4b = function (c4f) {
    var r = Math.floor(c4f.r * 255);
    var g = Math.floor(c4f.g * 255);
    var b = Math.floor(c4f.b * 255);
    var a = Math.floor(c4f.a * 255);
    return cvi.c4b(r, g, b, a);
};

/**
 * @description 将Byte表示转化成Float表示
 * @param {cvi.Color4B} c4b
 * @returns {cvi.Color4F}
 */
cvi.c4bToc4f = function (c4b) {
    var r = (c4b.r / 255);
    var g = (c4b.g / 255);
    var b = (c4b.b / 255);
    var a = (c4b.a / 255);
    return cvi.c4f(r, g, b, a);
};

/**
 * @description 将Byte表示转化成CSS颜色值
 * @param {cvi.Color4B} c4b
 * @returns {string}
 */
cvi.c4bToStr = function (c4b) {
    var result = 'rgba(';
    result += c4b.r + ',';
    result += c4b.g + ',';
    result += c4b.b + ',';
    result += c4b.a / 255 + ')';
    return result;
};

/**
 * @description 将Float表示转化成CSS颜色值
 * @param {cvi.Color4F} c4f
 * @returns {string}
 */
cvi.c4fToStr = function (c4f) {
    var result = 'rgba(';
    result += Math.floor(c4f.r * 255) + ',';
    result += Math.floor(c4f.g * 255) + ',';
    result += Math.floor(c4f.b * 255) + ',';
    result += c4f.a + ')';
    return result;
};

/**
 * @description 颜色相加
 * @param {cvi.Color3B} c3b1
 * @param {cvi.Color3B} c3b2
 * @returns {cvi.Color3B}
 */
cvi.c3bAdd = function (c3b1, c3b2) {
    return cvi.c3b(c3b1.r + c3b2.r, c3b1.g + c3b2.g, c3b1.b + c3b2.b)
};

/**
 * @description 颜色相减
 * @param {cvi.Color3B} c3b1
 * @param {cvi.Color3B} c3b2
 * @returns {cvi.Color3B}
 */
cvi.c3bSub = function (c3b1, c3b2) {
    return cvi.c3b(c3b1.r - c3b2.r, c3b1.g - c3b2.g, c3b1.b - c3b2.b)
};
