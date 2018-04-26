var cvi = cvi || {};

cvi.DegToRad = Math.PI / 180;
cvi.RadToDeg = 180 / Math.PI;

cvi.p = function (x, y) {
    if (arguments.length == 0)
        return new cvi.Point(0, 0);
    return new cvi.Point(x, y);
};

cvi.size = function (width, height) {
    if (arguments.length == 0)
        return new cvi.Size(0, 0);
    return new cvi.Size(width, height);
};

/**
 * 快速创建矩形对象
 * @param {Number} x 矩形原点x坐标
 * @param {Number} y 矩形原点y坐标
 * @param {Number} width 矩形宽度
 * @param {Number} height 矩形长度
 * @returns {cvi.Rectangle}
 */
cvi.rect = function (x, y, width, height) {
    if (arguments.length == 0)
        return new cvi.Rectangle(0, 0, 0, 0);
    if (arguments.length == 2)
        return new cvi.Rectangle(x.x, x.y, y.width, y.height);
    if (arguments.length == 4)
        return new cvi.Rectangle(x, y, width, height);
};

/**
 * 检测矩形是否包含点
 * @param {cvi.Rectangle} rect
 * @param {cvi.Point} point
 * @returns {boolean}
 */
cvi.rectContainsPoint = function (rect, point) {
    var left = rect.x;
    var right = rect.x + rect.width;
    var top = rect.y;
    var bottom = rect.y + rect.height;
    return (left <= point.x && right >= point.x && top <= point.y && bottom >= point.y);
};

/**
 * 检测两矩形是否相交
 * @param {cvi.Rectangle} rect1
 * @param {cvi.Rectangle} rect2
 * @returns {boolean}
 */
cvi.rectIntersectsRect = function (rect1, rect2) {
    var left1 = rect1.x;
    var right1 = rect1.x + rect1.width;
    var top1= rect1.y;
    var bottom1 = rect1.y + rect1.height;
    var left2 = rect2.x;
    var right2 = rect2.x + rect2.width;
    var top2 = rect2.y;
    var bottom2 = rect2.y + rect2.height;
    return !(left2 > right1 || left1 > right2 || top1 > bottom2 || top2 > bottom1);
};

cvi.pAdd = function (p1, p2) {
    return cvi.p(p1.x + p2.x, p1.y + p2.y);
};

cvi.pSub = function (p1, p2) {
    return cvi.p(p1.x - p2.x, p1.y - p2.y);
};

cvi.pMult = function (point, value) {
    return cvi.p(point.x * value, point.y * value);
};

cvi.pDistance = function (p1, p2) {
    var p = cvi.pSub(p1, p2);
    return Math.sqrt(p.x * p.x + p.y * p.y);
};


cvi.clamp = function (value, min, max) {
    return value < min ? min : (value > max ? max : value);
};

/**
 * 两点所成直线于x轴正向夹角，从p1指向p2，角度按画布规定
 * @param {cvi.Point} p1 起始点
 * @param {cvi.Point} p2 终止点
 * @return {Number} 返回度数
 */
cvi.pAngle = function (p1, p2) {
    var length = cvi.pDistance(p1, p2);
    var dx = p2.x - p1.x;
    var dy = p2.y - p1.y;
    var cosv = dx / length ;
    var sinv = dy / length ;
    var radiu;
    if(sinv >= 0) radiu = Math.acos(cosv);
    else if(sinv < 0) radiu = Math.PI * 2 - Math.acos(cosv);
    return radiu * cvi.RadToDeg;
};