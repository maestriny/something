// convert a quadratic bezier to a cubic bezier (6 values: c1x,c1y,c2x,c2y,ex,ey)
export function quadToCubic(
  sx: number,
  sy: number,
  cpx: number,
  cpy: number,
  ex: number,
  ey: number,
): number[] {
  return [
    sx + (2 / 3) * (cpx - sx),
    sy + (2 / 3) * (cpy - sy),
    ex + (2 / 3) * (cpx - ex),
    ey + (2 / 3) * (cpy - ey),
    ex,
    ey,
  ];
}

// express a straight line as a degenerate cubic bezier (6 values)
export function lineToCubic(sx: number, sy: number, ex: number, ey: number): number[] {
  return [
    sx + (ex - sx) / 3,
    sy + (ey - sy) / 3,
    sx + (2 * (ex - sx)) / 3,
    sy + (2 * (ey - sy)) / 3,
    ex,
    ey,
  ];
}

// split a cubic bezier at t=0.5 using de Casteljau
function splitCubicHalf(
  sx: number,
  sy: number,
  c1x: number,
  c1y: number,
  c2x: number,
  c2y: number,
  ex: number,
  ey: number,
): [number[], number[]] {
  const m01x = (sx + c1x) / 2;
  const m01y = (sy + c1y) / 2;
  const m12x = (c1x + c2x) / 2;
  const m12y = (c1y + c2y) / 2;
  const m23x = (c2x + ex) / 2;
  const m23y = (c2y + ey) / 2;

  const m012x = (m01x + m12x) / 2;
  const m012y = (m01y + m12y) / 2;
  const m123x = (m12x + m23x) / 2;
  const m123y = (m12y + m23y) / 2;

  const mx = (m012x + m123x) / 2;
  const my = (m012y + m123y) / 2;

  return [
    [m01x, m01y, m012x, m012y, mx, my],
    [m123x, m123y, m23x, m23y, ex, ey],
  ];
}

// primary top wave (used for login): fills from top, wavy bottom edge
export function primaryTopPoints(w: number, h: number): number[] {
  return [
    0,
    0,
    ...lineToCubic(0, 0, w, 0),
    ...lineToCubic(w, 0, w, h * 0.6),
    ...quadToCubic(w, h * 0.6, w * 0.78, h, w * 0.5, h * 0.7),
    ...quadToCubic(w * 0.5, h * 0.7, w * 0.18, h * 0.4, 0, h * 0.76),
    ...lineToCubic(0, h * 0.76, 0, 0),
  ];
}

// secondary top (register)
export function secondaryTopPoints(w: number, h: number): number[] {
  const cubic = quadToCubic(w, h * 0.58, w * 0.4, h * 1.1, 0, h * 0.52);
  const [first, second] = splitCubicHalf(
    w,
    h * 0.58,
    cubic[0],
    cubic[1],
    cubic[2],
    cubic[3],
    cubic[4],
    cubic[5],
  );

  return [
    0,
    0,
    ...lineToCubic(0, 0, w, 0),
    ...lineToCubic(w, 0, w, h * 0.58),
    ...first,
    ...second,
    ...lineToCubic(0, h * 0.52, 0, 0),
  ];
}

// primary bottom (login): fills from bottom, wavy top edge
export function primaryBottomPoints(w: number, h: number): number[] {
  const cubic = quadToCubic(0, h * 0.48, w * 0.4, h * 0.1, w, h * 0.42);
  const [first, second] = splitCubicHalf(
    0,
    h * 0.48,
    cubic[0],
    cubic[1],
    cubic[2],
    cubic[3],
    cubic[4],
    cubic[5],
  );

  return [
    0,
    h * 0.48,
    ...first,
    ...second,
    ...lineToCubic(w, h * 0.42, w, h),
    ...lineToCubic(w, h, 0, h),
    ...lineToCubic(0, h, 0, h * 0.48),
  ];
}

// secondary bottom (register)
export function secondaryBottomPoints(w: number, h: number): number[] {
  return [
    0,
    h * 0.24,
    ...quadToCubic(0, h * 0.24, w * 0.18, h * 0.6, w * 0.5, h * 0.3),
    ...quadToCubic(w * 0.5, h * 0.3, w * 0.78, 0, w, h * 0.4),
    ...lineToCubic(w, h * 0.4, w, h),
    ...lineToCubic(w, h, 0, h),
    ...lineToCubic(0, h, 0, h * 0.24),
  ];
}

// interpolate between two sets of 32 path values and build an SVG path string
export function buildInterpolatedPath(a: number[], b: number[], t: number): string {
  'worklet';
  const l = (i: number): number => a[i] + (b[i] - a[i]) * t;

  return (
    `M${l(0)},${l(1)}` +
    ` C${l(2)},${l(3)} ${l(4)},${l(5)} ${l(6)},${l(7)}` +
    ` C${l(8)},${l(9)} ${l(10)},${l(11)} ${l(12)},${l(13)}` +
    ` C${l(14)},${l(15)} ${l(16)},${l(17)} ${l(18)},${l(19)}` +
    ` C${l(20)},${l(21)} ${l(22)},${l(23)} ${l(24)},${l(25)}` +
    ` C${l(26)},${l(27)} ${l(28)},${l(29)} ${l(30)},${l(31)}` +
    'Z'
  );
}
