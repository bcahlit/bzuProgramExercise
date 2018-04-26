var cvi = cvi || {};


var CVIGraph = function () {
    this.initialize();
    this.children = [];
};
CVIGraph.prototype = new CVIShapeBase();

CVIGraph.prototype.gLineStyle = CVIShapeBase.prototype.lineStyle;
CVIGraph.prototype.gSetClose = CVIShapeBase.prototype.setClose;
CVIGraph.prototype.gNotFill = CVIShapeBase.prototype.notFill;
CVIGraph.prototype.gFillColor = CVIShapeBase.prototype.fillColor;
CVIGraph.prototype.gLinearGradientFill = CVIShapeBase.prototype.linearGradientFill;
CVIGraph.prototype.gRadialGradientFill = CVIShapeBase.prototype.radialGradientFill;
CVIGraph.prototype.gPatternFill = CVIShapeBase.prototype.patternFill;

/**
 * 改变线条样式函数，利用CVIGraph绘制的图形全部改变
 * @param {cvi.Color3B|String} lineColor 线条颜色
 * @param {Number} lineWidth 线宽
 * @param {String} lineCap 线帽样式
 * @param {String} lineJoin 线段连接处样式
 * @param {Number} miterLimit 斜接限制
 * @param {Array} lineDash 线点样式
 * @returns {CVIGraph}
 */
CVIGraph.prototype.lineStyle = function (lineColor, lineWidth, lineCap, lineJoin, miterLimit, lineDash) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.lineStyle(lineColor, lineWidth, lineCap, lineJoin, miterLimit, lineDash);
    }
    return this;
};

/**
 * @description 设置图形头尾闭合
 * @param {Boolean} close 是否闭合曲线
 * @returns {CVIGraph}
 */
CVIGraph.prototype.setClose = function (close) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.setClose(close);
    }
    return this;
}

/**
 * @description 设置图形不填充
 * @returns {CVIGraph}
 */
CVIGraph.prototype.notFill = function () {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.notFill();
    }
    return this;
}

/**
 * @description 设置图形填充颜色
 * @param {cvi.Color3B|String} color B填充颜色
 * @returns {CVIGraph}
 */
CVIGraph.prototype.fillColor = function (color) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.fillColor(color);
    }
    return this;
}

/**
 * @description 设置图形线性渐变填充颜色
 * @param {cvi.Point} startP 起始位置
 * @param {cvi.Point} endP 终止位置
 * @param {cvi.Color3B|String|Number[]} ratios 起始颜色 或 相对位置数组
 * @param {cvi.Color3B|String|cvi.Color3B[]} colors 终止颜色 或 对应位置颜色数组
 * @returns {CVIGraph}
 */
CVIGraph.prototype.linearGradientFill = function (startP, endP, ratios, colors) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.linearGradientFill(startP, endP, ratios, colors);
    }
    return this;
};

/**
 * @description 设置图形径向渐变填充颜色
 * @param {cvi.Point} startP 起始位置
 * @param {Number} r0 起始圆半径
 * @param {cvi.Point} endP 终止位置
 * @param {Number} r1 终止圆半径
 * @param {cvi.Color3B|String|Number[]} ratios 起始颜色 或 相对位置数组
 * @param {cvi.Color3B|String|cvi.Color3B[]} colors 终止颜色 或 对应位置颜色数组
 * @returns {CVIGraph}
 */
CVIGraph.prototype.radialGradientFill = function (startP, r0, endP, r1, ratios, colors) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.radialGradientFill(startP, r0, endP, r1, ratios, colors);
    }
    return this;
};

/**
 * @description 设置图形图案填充
 * @param {canvas|Image} image
 * @param {String} repetition  填充方式，有"repeat", "repeat-x", "repeat-y", "no-repeat"
 * @returns {CVIGraph}
 */
CVIGraph.prototype.patternFill = function (image, repetition) {
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.patternFill(image, repetition);
    }
    return this;
};

/**
 * @description 生成矩形绘图对象
 * @param {cvi.Rectangle} rect 矩形对象，可利用cvi.rect函数快速创建
 * @returns {CVIRect}
 */
CVIGraph.prototype.rect = function (rect) {
    var shape = new CVIRect(rect);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.roundRect = function (rect, topLeft, topRight, bottomLeft, bottomRight) {
    var shape = new CVIRoundRect(rect, topLeft, topRight, bottomLeft, bottomRight);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.arc = function (point, radius, startAngle, endAngle, anticlockwise) {
    var shape = new CVIArc(point, radius, startAngle, endAngle, anticlockwise);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.lineTo = function (pointAry) {
    var shape = new CVILine(pointAry);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.quadTo = function (originPt, pointAry) {
    var shape = new CVIQuadraticCurve(originPt, pointAry);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.bezierTo = function (originPt, pointAry) {
    var shape = new CVIBezierCurve(originPt, pointAry);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.splineTo = function (pointAry) {
    var shape = new CVISpline(pointAry);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.ellipse = function (originPt, xHalfLen, yHalfLen) {
    var shape = new CVIEllipse(originPt, xHalfLen, yHalfLen);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.polygon = function (originPt, len, sides) {
    var shape = new CVIPolygon(originPt, len, sides);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.star = function (originPt, maxLen, minLen, angles) {
    var shape = new CVIStarShape(originPt, maxLen, minLen, angles);
    this.initShape(shape);
    return shape;
};

CVIGraph.prototype.initShape = function (shape) {
    this.children.push(shape);
    shape.lineStyle(this.lineColor, this.lineWidth, this.lineCap, this.lineJoin, this.miterLimit, this.lineDash);
    shape.setClose(this.close);
    switch (this.fillType) {
        case cvi.NOT_FILL       : shape.notFill();break;
        case cvi.NORMAL_FILL    : shape.fillColor(this.startColor);break;
        case cvi.LINEAR_FILL    : shape.linearGradientFill(this.startPoint, this.endPoint,
            this.ratios.length ? this.ratios : this.startColor, this.colors.length ? this.colors : this.endColor);break;
        case cvi.RADIAL_FILL    : shape.radialGradientFill(this.startPoint, this.r1,  this.endPoint, this.r1,
            this.ratios.length ? this.ratios : this.startColor, this.colors.length ? this.colors : this.endColor);break;
        case cvi.PATTREN_FILL   : shape.patternFill(this.pattern, this.repetition);break;
        default                 : console.log("some problems happen when initialize shape.");break;
    }
};

CVIGraph.prototype.draw = function(ctx){
    var len = this.children.length;
    for (var i = 0; i < len; ++i) {
        var child = this.children[i];
        child.draw(ctx, false);
    }
    return true;
};