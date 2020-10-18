
export let liner = (v => v);

export function cubicBezier(p1x, p1y, p2x, p2y) {

    const ZERO_LIMIT = 1e-6;

    // Calculate the polynomial coefficients, implicit first and last control points are (0,0) and (1,1).
    const cx = 3.0 * p1x;
    const bx = 3.0 * (p2x - p1x) - cx;
    const ax = 1.0 - cx - bx;

    const cy = 3.0 * p1y;
    const by = 3.0 * (p2y - p1y) - cy;
    const ay = 1.0 - cy - by;

    // Public

    function solve(x){
        return sampleCurveY(solveCurveX(x));
    }

    // Private

    function sampleCurveX(t){
        // `ax t^3 + bx t^2 + cx t' expanded using Horner's rule.
        return ((ax * t + bx) * t + cx) * t;
    }

    function sampleCurveY(t){
        return ((ay * t + by) * t + cy) * t;
    }

    function sampleCurveDerivativeX(t){
        return (3.0 * ax * t + 2.0 * bx) * t + cx;
    }

    // Given an x value, find a parametric value it came from.
    function solveCurveX(x, epsilon){
        var t0, t1, t2 = x, x2, derivative;

        // First try a few iterations of Newton's method -- normally very fast.
        for (let i = 0; i < 8; i++) {
            x2 = sampleCurveX(t2) - x;
            if (Math.abs(x2) < epsilon)
                return t2;
            derivative = sampleCurveDerivativeX(t2);
            if (Math.abs(derivative) < 1e-6)
                break;
            t2 = t2 - x2 / derivative;
        }

        // Fall back to the bisection method for reliability.
        t0 = 0.0;
        t1 = 1.0;
        t2 = x;

        if (t2 < t0)
            return t0;
        if (t2 > t1)
            return t1;

        while (t0 < t1) {
            x2 = sampleCurveX(t2);
            if (Math.abs(x2 - x) < ZERO_LIMIT)
                return t2;
            if (x > x2)
                t0 = t2;
            else
                t1 = t2;
            t2 = (t1 - t0) * 0.5 + t0;
        }

        // Failure.
        return t2;
    }
    return solve;
}

export const ease = cubicBezier(.25,.1,.25,1);
export const easeIn = cubicBezier(.42,0,1,1);
export const easeOut = cubicBezier(0,0,.58,1);
export const easeInOut = cubicBezier(.42,0,.58,1);