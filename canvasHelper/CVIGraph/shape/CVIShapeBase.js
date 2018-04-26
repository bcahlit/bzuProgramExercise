var cvi = cvi || {};

cvi.NOT_FILL = 0;
cvi.NORMAL_FILL = 1;
cvi.LINEAR_FILL = 2;
cvi.RADIAL_FILL = 3;
cvi.PATTREN_FILL = 4;

var CVIShapeBase = function() {
    this.initialize();
};

CVIShapeBase.prototype.initialize = function () {
    this.fillType    = cvi.NOT_FILL;
    this.startColor  = "#000000";
    this.endColor    = "#000000";
    this.startPoint  = cvi.p(0, 0);
    this.endPoint    = cvi.p(0, 0);
    this.r0          = 0;
    this.r1          = 0;
    this.ratios      = [];
    this.colors      = [];
    this.pattern     = null;
    this.repetition  = "repeat";     //"repeat", "repeat-x", "repeat-y", "no-repeat"

    this.lineColor   = "#000000";
    this.lineWidth   = 1;

    this.lineCap     = "butt";    //"butt", "round", "square"
    this.lineJoin    = "miter";    //"miter", "round", "bevel"
    this.miterLimit  = 10.0;
    this.lineDash    = null;

    this.close       = false;
};

CVIShapeBase.prototype.setLineColor = function (color) {
    this.lineColor = color;
    return this;
};


CVIShapeBase.prototype.setLineWidth = function (width) {
    this.lineWidth = width;
    return this;
};

CVIShapeBase.prototype.setLineCap = function (type) {
    this.lineCap = type;
    return this;
};

CVIShapeBase.prototype.setLineJoin = function (type) {
    this.lineJoin = type;
    return this;
};


CVIShapeBase.prototype.setMiterLimit = function (value) {
    this.miterLimit = value;
    return this;
};

CVIShapeBase.prototype.setLineDash = function (segments) {
    this.lineDash = segments;
    return this;
};

CVIShapeBase.prototype.setClose = function (close) {
    this.close = close;
    return this;
};

CVIShapeBase.prototype.lineStyle = function (lineColor, lineWidth, lineCap, lineJoin, miterLimit, lineDash) {
    this.lineColor = lineColor || this.lineColor;
    this.lineWidth = lineWidth || this.lineWidth;
    this.lineCap = lineCap || this.lineCap;
    this.lineJoin = lineJoin || this.lineJoin;
    this.miterLimit = miterLimit || this.miterLimit;
    this.lineDash = lineDash || this.lineDash;
    return this;
};

CVIShapeBase.prototype.notFill = function () {
    this.fillType = cvi.NOT_FILL;
    return this;
};

CVIShapeBase.prototype.fillColor = function (color) {
    this.fillType = cvi.NORMAL_FILL;
    this.startColor = color;;
    return this;
};

CVIShapeBase.prototype.linearGradientFill = function (startP, endP, ratios, colors) {
    this.fillType = cvi.LINEAR_FILL;
    this.startPoint = startP;
    this.endPoint = endP;
    this.ratios = [];
    this.colors = [];
    if (ratios instanceof Array) {
        this.ratios = ratios.slice(0);
        this.colors = colors.slice(0);
    } else if (ratios instanceof String || ratios instanceof Object) {
        this.startColor = ratios;
        this.endColor = colors;
    }
    return this;
};

CVIShapeBase.prototype.radialGradientFill= function(startP, r0, endP, r1, ratios, colors){
    this.fillType = cvi.RADIAL_FILL;
    this.startPoint = startP;
    this.endPoint = endP;
    this.r0 = r0;
    this.r1 = r1;
    this.ratios = [];
    this.colors = [];
    if (ratios instanceof Array) {
        this.ratios = ratios.slice(0);
        this.colors = colors.slice(0);
    } else if (ratios instanceof String || ratios instanceof Object) {
        this.startColor = ratios;
        this.endColor = colors;
    }
    return this;
};

CVIShapeBase.prototype.patternFill = function (image, repetition) {
    this.fillType = cvi.PATTREN_FILL;
    this.pattern = image;
    this.repetition = repetition || "repeat";
    return this;
};

CVIShapeBase.prototype.draw = function (ctx) {
    ctx.save();
    ctx.strokeStyle = this._convertColor(this.lineColor);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.lineCap;
    ctx.lineJoin = this.lineJoin;
    ctx.miterLimit = this.miterLimit;
    if (this.lineDash) ctx.setLineDash(this.lineDash);
    ctx.beginPath();
    this._doDraw(ctx);
    if (this.close) ctx.closePath();
    if (this.lineWidth > 0) ctx.stroke();
    this._doFill(ctx);
    ctx.restore();
};

CVIShapeBase.prototype._convertColor = function (color) {
    if (typeof color == "string") {
        return color;
    } else {
        return color.toStr();
    }
};

CVIShapeBase.prototype._doFill = function (ctx) {
    switch (this.fillType) {
        case cvi.NOT_FILL:
            break;
        case cvi.NORMAL_FILL:
            ctx.fillStyle = this._convertColor(this.startColor);
            ctx.fill();
            break;
        case cvi.LINEAR_FILL: {
            var gradient = ctx.createLinearGradient(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y);
            if (this.ratios.length > 0) {
                for (var i = 0; i < this.ratios.length; ++i) {
                    gradient.addColorStop(this.ratios[i], this._convertColor(this.colors[i]));
                }
            } else {
                gradient.addColorStop(0, this._convertColor(this.startColor));
                gradient.addColorStop(1, this._convertColor(this.endColor));
            }
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
        }
        case cvi.RADIAL_FILL: {
            var gradient = ctx.createRadialGradient(
                this.startPoint.x, this.startPoint.y, this.r0,
                this.endPoint.x, this.endPoint.y, this.r1);
            if (this.ratios.length > 0) {
                for (var i = 0; i < this.ratios.length; ++i) {
                    gradient.addColorStop(this.ratios[i], this._convertColor(this.colors[i]));
                }
            } else {
                gradient.addColorStop(0, this._convertColor(this.startColor));
                gradient.addColorStop(1, this._convertColor(this.endColor));
            }
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
        }
        case cvi.PATTREN_FILL: {
            var gradient = ctx.createPattern(this.pattern, this.repetition);
            ctx.fillStyle = gradient;
            ctx.fill();
            break;
        }
        default :
            console.log("some problems happen when do fill.");
            break;
    }
};

CVIShapeBase.prototype._doDraw = function (ctx) {
    //override me
};



var CVIRect = function (rect) {
    this.initialize(rect);
};
CVIRect.prototype = new CVIShapeBase();

CVIRect.prototype.Shape_init = CVIRect.prototype.initialize;
CVIRect.prototype.initialize = function (rect) {
    this.Shape_init();
    this.rect = rect;
};

CVIRect.prototype._doDraw = function (ctx) {
    var rect = this.rect;
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
};




var CVIRoundRect = function (rect, topLeft, topRight, bottomLeft, bottomRight) {
    this.initialize(rect, topLeft, topRight, bottomLeft, bottomRight);
};
CVIRoundRect.prototype = new CVIRect();

CVIRoundRect.prototype.Rect_init = CVIRoundRect.prototype.initialize;
CVIRoundRect.prototype.initialize = function (rect, topLeft, topRight, bottomLeft, bottomRight) {
    this.Rect_init(rect);

    this.cornerTL = topLeft;
    this.cornerTR = topRight || topLeft;
    this.cornerBL = bottomLeft || topLeft;
    this.cornerBR = bottomRight || topLeft;

    if ((this.cornerTL + this.cornerTR) > rect.width || (this.cornerBL + this.cornerBR) > rect.width ||
        (this.cornerTL + this.cornerBL) > rect.height || (this.cornerTR + this.cornerBR) > rect.height) {
        this.cornerTL = this.cornerTR = this.cornerBL = this.cornerBR = 0;
    }
};

CVIRoundRect.prototype._doDraw = function (ctx) {
    var x = this.rect.x;
    var y = this.rect.y;
    var w = this.rect.width;
    var h = this.rect.height;

    ctx.moveTo(x + this.cornerTL, y);
    ctx.lineTo(x + w - this.cornerTR, y);
    ctx.arc(x + w - this.cornerTR, y + this.cornerTR, this.cornerTR, -Math.PI/2, 0, false);
    ctx.lineTo(x + w, y + h - this.cornerBR);
    ctx.arc(x + w - this.cornerBR, y + h - this.cornerBR, this.cornerBR, 0, Math.PI/2, false);
    ctx.lineTo(x + this.cornerBL, y + h);
    ctx.arc(x + this.cornerBL, y + h - this.cornerBL, this.cornerBL, Math.PI/2, Math.PI, false);
    ctx.lineTo(x, y + this.cornerTL);
    ctx.arc(x + this.cornerTL, y + this.cornerTL, this.cornerTL, Math.PI, Math.PI*3/2, false);
};


var CVIArc = function (point, radius, startAngle, endAngle, anticlockwise) {
    this.initialize(point, radius, startAngle, endAngle, anticlockwise)
};
CVIArc.prototype = new CVIShapeBase();

CVIArc.prototype.Shape_init = CVIArc.prototype.initialize;
CVIArc.prototype.initialize = function (point, radius, startAngle, endAngle, anticlockwise) {
    this.Shape_init();
    this.origin = point;
    this.radius = radius;
    this.startAngle = startAngle / 180 * Math.PI || 0;
    this.endAngle = endAngle / 180 * Math.PI || (Math.PI * 2);
    this.anticlockwise = anticlockwise || false;
};

CVIArc.prototype._doDraw = function (ctx) {
    ctx.arc(this.origin.x, this.origin.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
};


var CVILine = function (pointAry) {
    this.initialize(pointAry)
};
CVILine.prototype = new CVIShapeBase();

CVILine.prototype.Shape_init = CVILine.prototype.initialize;
CVILine.prototype.initialize = function (pointAry) {
    this.Shape_init();
    pointAry = pointAry || [];
    this._pointAry = pointAry.slice(0);
};

CVILine.prototype._doDraw = function (ctx) {
    ctx.moveTo(this._pointAry[0].x, this._pointAry[0].y);
    for (var i = 1; i < this._pointAry.length; ++i) {
        ctx.lineTo(this._pointAry[i].x, this._pointAry[i].y);
    }
};

var CVIQuadraticCurve = function (originPt, pointAry) {
    this.initialize(originPt, pointAry)
};
CVIQuadraticCurve.prototype = new CVILine();

CVIQuadraticCurve.prototype.Line_init = CVIQuadraticCurve.prototype.initialize;
CVIQuadraticCurve.prototype.initialize = function (originPt, pointAry) {
    var ary = pointAry.slice(0);
    if (ary.length % 2 != 0) ary.pop();
    this._pointAry = ary;
    this._origin = originPt;
};

CVIQuadraticCurve.prototype._doDraw = function (ctx) {
    ctx.moveTo(this._origin.x, this._origin.y);
    for (var i = 0; i < this._pointAry.length; i += 2) { //
        ctx.quadraticCurveTo(this._pointAry[i].x, this._pointAry[i].y,this._pointAry[i + 1].x, this._pointAry[i + 1].y);
    }
};


var CVIBezierCurve = function (originPt, pointAry) {
    this.initialize(originPt, pointAry)
};
CVIBezierCurve.prototype = new CVILine();

CVIBezierCurve.prototype.Line_init = CVIBezierCurve.prototype.initialize;
CVIBezierCurve.prototype.initialize = function (originPt, pointAry) {
    var ary = pointAry.slice(0);
    while (ary.length % 3 != 0) ary.pop();
    this._pointAry = ary;
    this._origin = originPt;
};

CVIBezierCurve.prototype._doDraw = function (ctx) {
    ctx.moveTo(this._origin.x, this._origin.y);
    for (var i = 0; i < this._pointAry.length; i += 3) { //
        ctx.bezierCurveTo(this._pointAry[i].x, this._pointAry[i].y,this._pointAry[i + 1].x, this._pointAry[i + 1].y,
            this._pointAry[i + 2].x, this._pointAry[i + 2].y);
    }
};

var CVISpline = function (pointAry) {
    this.initialize(pointAry)
};
CVISpline.prototype = new CVILine();

CVISpline.prototype.Line_init = CVISpline.prototype.initialize;
CVISpline.prototype.initialize = function (pointAry) {
    this.Line_init(pointAry);
    this.controlPt1 = [];
    this.controlPt2 = [];
    this._getControlPt();
};

CVISpline.prototype._getControlPt = function () {
    var points = this._pointAry;
    var cp1 = this.controlPt1;
    var cp2 = this.controlPt2;

    var len = points.length, q = 1, u = [];
    for (var i = 0; i < len; ++i) {
        if (i == 0) {
            u[i] = cvi.p(q * (points[1].x - points[len - 1].x) >> 1, q * (points[1].y - points[len - 1].y) >> 1);
        } else if (i == len - 1) {
            u[i] = cvi.p(q * (points[0].x - points[i - 1].x) >> 1, q * (points[0].y - points[i - 1].y) >> 1);
        } else {
            u[i] = cvi.p(q * (points[i + 1].x - points[i - 1].x) >> 1, q * (points[i + 1].y - points[i - 1].y) >> 1);
        }
    }
    for (var i = 0; i <= (len - 1); ++i) {
        if (i == (len - 1)) {
            cp1[i] = cvi.p(points[i].x + u[i].x / 3, points[i].y + u[i].y / 3);
            cp2[i] = cvi.p(points[0].x - u[0].x / 3, points[0].y - u[0].y / 3);
        } else {
            cp1[i] = cvi.p(points[i].x + u[i].x / 3, points[i].y + u[i].y / 3);
            cp2[i] = cvi.p(points[i + 1].x - u[i + 1].x / 3, points[i + 1].y - u[i + 1].y / 3);
        }
    }
};

CVISpline.prototype._doDraw = function (ctx) {
    var len = this._pointAry.length;

    ctx.moveTo(this._pointAry[0].x, this._pointAry[0].y);
    for (var i = 0; i < len - 1; ++i) { //
        ctx.bezierCurveTo(this.controlPt1[i].x, this.controlPt1[i].y,this.controlPt2[i].x, this.controlPt2[i].y,
            this._pointAry[i + 1].x, this._pointAry[i + 1].y);
    }
    if (this.close) {
        ctx.bezierCurveTo(this.controlPt1[len - 1].x, this.controlPt1[len - 1].y, this.controlPt2[len - 1].x, this.controlPt2[len - 1].y,
            this._pointAry[0].x, this._pointAry[0].y);
    }
};


var CVIStarShape = function (originPt, maxLen, minLen, angles) {
    this.initialize(originPt, maxLen, minLen, angles)
};
CVIStarShape.prototype = new CVIShapeBase();

CVIStarShape.prototype.Shape_init = CVIStarShape.prototype.initialize;
CVIStarShape.prototype.initialize = function (originPt, maxLen, minLen, angles) {
    this.Shape_init();
    this.origin = originPt;
    this.maxLen = maxLen;
    this.minLen = minLen || maxLen * 2 / 5;
    this.angles = angles || 5;
};

CVIStarShape.prototype._doDraw = function (ctx) {
    var o = this.origin;
    var min = this.minLen;
    var max = this.maxLen;
    var count = this.angles;
    var angle = Math.PI / count;

    ctx.moveTo(o.x, o.y - max);
    for (var i = 1; i <= count * 2; i += 2) {
        ctx.lineTo(o.x - Math.sin(angle * i) * min, o.y - Math.cos(angle * i) * min);
        ctx.lineTo(o.x - Math.sin(angle * (i + 1)) * max, o.y - Math.cos(angle * (i + 1)) * max);
    }
};



var CVIPolygon = function (originPt, len, sides) {
    this.initialize(originPt, len, sides)
};
CVIPolygon.prototype = new CVIShapeBase();

CVIPolygon.prototype.Shape_init = CVIPolygon.prototype.initialize;
CVIPolygon.prototype.initialize = function (originPt, len, sides) {
    this.Shape_init();
    this.origin = originPt;
    this.length = len;
    this.sides = sides;
};

CVIPolygon.prototype._doDraw = function (ctx) {
    var o = this.origin;
    var len = this.length;
    var sides = this.sides;
    var angle = Math.PI * 2 / sides;
    var offset = Math.PI;

    ctx.moveTo(o.x, o.y - len);
    for (var i = 1; i <= sides; ++i) {
        ctx.lineTo(o.x + Math.sin(offset + angle * i) * len, o.y + Math.cos(offset + angle * i) * len);
    }
};


var CVIEllipse = function (originPt, xHalfLen, yHalfLen) {
    this.initialize(originPt, xHalfLen, yHalfLen)
};
CVIEllipse.prototype = new CVIShapeBase();

CVIEllipse.prototype.Shape_init = CVIEllipse.prototype.initialize;
CVIEllipse.prototype.initialize = function (originPt, xHalfLen, yHalfLen) {
    this.Shape_init();
    this.origin = originPt;
    this.xHalfLen = xHalfLen;
    this.yHalfLen = yHalfLen;
};

CVIEllipse.prototype._doDraw = function (ctx) {
    var o = this.origin;
    var xh = this.xHalfLen;
    var yh = this.yHalfLen;
    var ox = 0.5 * xh, oy = 0.6 * yh;

    ctx.moveTo(o.x, o.y + yh);
    ctx.bezierCurveTo(o.x + ox, o.y + yh, o.x + xh, o.y + oy, o.x + xh, o.y);
    ctx.bezierCurveTo(o.x + xh, o.y - oy, o.x + ox, o.y - yh, o.x, o.y - yh);
    ctx.bezierCurveTo(o.x - ox, o.y - yh, o.x - xh, o.y - oy, o.x - xh, o.y);
    ctx.bezierCurveTo(o.x - xh, o.y + oy, o.x - ox, o.y + yh, o.x, o.y + yh);
    //ctx.ellipse(o.x, o.y, xh, yh, 0, 0, Math.PI * 2, false);
};
