var cvi = cvi || {};


/**
 * @class cvi.Bezier 复杂计算和表示贝塞尔曲线
 * @property {cvi.Point[]} pointArray 贝塞尔曲线上的端点
 * @property {cvi.Point[]} controlPt1 端点间的第一控制点
 * @property {cvi.Point[]} controlPt2 端点间的第二控制点
 * @constructor
 */
cvi.Bezier = function (pointArray) {
    this.initialize(pointArray);
};
cvi.Bezier.prototype.initialize = function (pointArray) {
    this.pointArray = [];
    this.controlPt1 = [];
    this.controlPt2 = [];
    pointArray = pointArray || [];
    for (var i = 0; i < pointArray.length - 1; i += 3) {
        this.pointArray.push(pointArray[i]);
        this.controlPt1.push(pointArray[i + 1]);
        this.controlPt2.push(pointArray[i + 2]);
    }
    var lastPt = pointArray[pointArray.length - 1];
    this.pointArray.push(lastPt);
};

/**
 * 计算贝塞尔曲线总长度
 * @returns {Number}
 */
cvi.Bezier.prototype.getTotalLength = function () {
    var locPoints = this.pointArray;
    var totalLen = 0;
    for(var i = 0; i < locPoints.length - 1; ++i) {
        totalLen += this._getSegmentLength(i);
    }
    return totalLen;
};

/**
 * 计算出给定端点所形成贝塞尔曲线路径
 * @param {Number} step 步长
 * @returns {cvi.Point[]}
 */
cvi.Bezier.prototype.getBezierPointsByStep = function (step) {
    var tempPoints = [];
    var locPoints = this.pointArray;
    var dRemain = 0;

    tempPoints.push(locPoints[0]);
    //TODO 去除locPoints.push(locPoints[0]);
    for (var i = 0; i < locPoints.length - 1; ++i){
        var dLineLen = this._getSegmentLength(i);
        var dNewLen  = dRemain + dLineLen;
        var dCut     = -dRemain;
        while (dNewLen > step) {
            dCut += step;
            var dPrec = dCut / dLineLen;
            var ptSplit = this._splitBezier(dPrec, i);
            tempPoints.push(ptSplit);
            dNewLen -= step;
        }
        dRemain = dNewLen;
    }

    if (dRemain > (step >> 2)) {
        var p = locPoints[locPoints.length - 1];
        tempPoints.push(p);
    }
    locPoints.pop();
    tempPoints.pop();

    return tempPoints;
};

/**
 * 计算贝塞尔曲线上，两个端点间的距离
 * @param {Number} segID 线段下标
 * @returns {Number}
 * @protect
 */
cvi.Bezier.prototype._getSegmentLength = function (segID) {
    var locPoints = this.pointArray;
    var cPoints1 = this.controlPt1;
    var cPoints2 = this.controlPt2;
    var p0 = locPoints[segID];
    var cp1 = cPoints1[segID];
    var cp2 = cPoints2[segID];
    var p3 = locPoints[segID + 1];

    var dx = Math.abs(p0.x - p3.x);
    var dy = Math.abs(p0.y - p3.y);
    var dLen = Math.max(dx, dy);
    if(dLen < 100) dLen = 100;
    var step = 1 / dLen;

    var x, y;
    var t3, t2, t11, t12, t13;
    var dPreX = p0.x;
    var dPreY = p0.y;

    var dBezierLength = 0;
    for(var t = step; t < 1; t += step) {
        t11 = 1 - t;
        t12 = t11 * t11;
        t13 = t12 * t11;
        t2 = t * t;
        t3 = t2 * t;
        var  t_t12_3 = 3 * t * t12 ;
        var  t2_t11_3 = 3 * t2 * t11;
        x =  t13 * p0.x + t_t12_3 * cp1.x + t2_t11_3 * cp2.x + t3 * p3.x;
        y =  t13 * p0.y + t_t12_3 * cp1.y + t2_t11_3 * cp2.y + t3 * p3.y;
        dBezierLength += cvi.pDistance(cvi.p(x, y), cvi.p(dPreX, dPreY));

        dPreX = x;
        dPreY = y;
    }
    return dBezierLength;
};

/**
 * 分隔一段贝塞尔线段，并返回每个分割点
 * @param {Number} dPrecent 百分比
 * @param {Number} segID 线段下标
 * @returns {cvi.Point}
 * @protect
 */
cvi.Bezier.prototype._splitBezier = function (dPrecent, segID) {
    var locPoints = this.pointArray;
    var cPoints1 = this.controlPt1;
    var cPoints2 = this.controlPt2;
    var p0 = locPoints[segID];
    var cp1 = cPoints1[segID];
    var cp2 = cPoints2[segID];
    var p3 = locPoints[segID + 1];

    var sp = cvi.pSub(p0, cp1);
    var dp = cvi.pMult(sp, dPrecent);
    var newPt01 = cvi.pSub(p0, dp);         //新的前一条Bezier曲线的1号控制点

    sp = cvi.pSub(cp1, cp2);
    dp = cvi.pMult(sp, dPrecent);
    var tempPt122 = cvi.pSub(cp1, dp);      //2, 1、2控制点之间连线上的百分比点。

    sp = cvi.pSub(newPt01, tempPt122);
    dp = cvi.pMult(sp, dPrecent);
    var newPt02 = cvi.pSub(newPt01, dp);

    sp = cvi.pSub(cp2, p3);
    dp = cvi.pMult(sp, dPrecent);
    var newPt12 = cvi.pSub(cp2, dp);        //新的后一条Bezier曲线的2号控制点。

    sp = cvi.pSub(tempPt122, newPt12);
    dp = cvi.pMult(sp, dPrecent);
    var newPt11 = cvi.pSub(tempPt122, dp);  //新的后一条Bezier曲线的1号控制点。

    sp = cvi.pSub(newPt02, newPt11);
    dp = cvi.pMult(sp, dPrecent);
    return cvi.pSub(newPt02, dp);
};

/**
 *
 * @class cvi.Spline 样条曲线，只需给出端点，控制点内部计算
 * @extend cvi.Bezier
 * @property {cvi.Point[]} pointArray 贝塞尔曲线上的端点
 * @property {cvi.Point[]} controlPt1 端点间的第一控制点
 * @property {cvi.Point[]} controlPt2 端点间的第二控制点
 * @constructor
 */
cvi.Spline = function (pointArray) {
    this.initialize(pointArray);
};
cvi.Spline.prototype = new cvi.Bezier();
cvi.Spline.prototype.initialize = function (pointArray) {
    this.pointArray = [];
    this.controlPt1 = [];
    this.controlPt2 = [];

    this.pointArray = pointArray.slice(0);

    this._getControlPt();
};

/**
 * 由端点算出控制点
 * @private
 */
cvi.Spline.prototype._getControlPt = function () {
    var locPoints = this.pointArray;
    var cPoints1 = this.controlPt1;
    var cPoints2 = this.controlPt2;

    var len = locPoints.length, q = 1, u = [];
    for (var i = 0; i < len; ++i) {
        if (i == 0) {
            u[i] = cvi.p(q * (locPoints[1].x - locPoints[len - 1].x) >> 1, q * (locPoints[1].y - locPoints[len - 1].y) >> 1);
        } else if (i == len - 1) {
            u[i] = cvi.p(q * (locPoints[0].x - locPoints[i - 1].x) >> 1, q * (locPoints[0].y - locPoints[i - 1].y) >> 1);
        } else {
            u[i] = cvi.p(q * (locPoints[i + 1].x - locPoints[i - 1].x) >> 1, q * (locPoints[i + 1].y - locPoints[i - 1].y) >> 1);
        }
    }
    for (var i = 0; i <= (len - 1); ++i) {
        if (i == (len - 1)) {
            cPoints1[i] = cvi.p(locPoints[i].x + u[i].x / 3, locPoints[i].y + u[i].y / 3);
            cPoints2[i] = cvi.p(locPoints[0].x - u[0].x / 3, locPoints[0].y - u[0].y / 3);
        } else {
            cPoints1[i] = cvi.p(locPoints[i].x + u[i].x / 3, locPoints[i].y + u[i].y / 3);
            cPoints2[i] = cvi.p(locPoints[i + 1].x - u[i + 1].x / 3, locPoints[i + 1].y - u[i + 1].y / 3);
        }
    }
};