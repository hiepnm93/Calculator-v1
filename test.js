const math_cal = require('./calculator');

test('* 10 * a to equal 10*a', () => {
  expect(math_cal.cal(10, "*2")).toBe(20);
  expect(math_cal.cal(10, "*0")).toBe(0);
  expect(math_cal.cal(10, "*1")).toBe(10);
  expect(math_cal.cal(10, "*-1")).toBe(-10);
  expect(math_cal.cal(1.5, "*-1")).toBe(Infinity);
});

test('/ 10 / a to equal 10/a', () => {
  expect(math_cal.cal(10, "/2")).toBe(5);
  expect(math_cal.cal(0, "/1")).toBe(0);
  expect(math_cal.cal(5, "/2")).toBe(2.5);
  expect(math_cal.cal(5, "/3")).toBe(5/3);
  expect(math_cal.cal(1.5, "/3")).toBe(Infinity);
});

test('sum a', () => {
  expect(math_cal.cal(10, "sum")).toBe(1);
  expect(math_cal.cal(0, "sum")).toBe(0);
  expect(math_cal.cal(52, "sum")).toBe(7);
  expect(math_cal.cal(5, "sum")).toBe(5);
  expect(math_cal.cal(52111, "sum")).toBe(10);
  expect(math_cal.cal(1.5, "sum")).toBe(Infinity);
});


test('/ 10 / 0 to equal Infinity', () => {
  expect(math_cal.cal(10, "/0")).toBe(Infinity);
});

test('/ 0 / 0 to equal NaN', () => {
  expect(math_cal.cal(0, "/0").toString()).toBe("NaN");
});

test('<shift 123456', () => {
  expect(math_cal.cal(123456, "<shift").toString()).toBe("234561");
  expect(math_cal.cal(2, "<shift").toString()).toBe("2");
});

test('mirror a mirror to equal aa', () => {
  expect(math_cal.cal(0, "mirror")).toBe(0);
  expect(math_cal.cal(1, "mirror")).toBe(11);
  expect(math_cal.cal(13, "mirror")).toBe(1331);
  expect(math_cal.cal(1.5, "mirror")).toBe(Infinity);
});

test('<< aa << to equal a', () => {
  expect(math_cal.cal(0, "<<")).toBe(0);
  expect(math_cal.cal(1, "<<")).toBe(0);
  expect(math_cal.cal(13, "<<")).toBe(1);
  expect(math_cal.cal(140041, "<<")).toBe(14004);
  expect(math_cal.cal(1.5, "<<")).toBe(Infinity);
});

test("math_cal.math(140,[ 'mirror', 'mirror', '<<', '<<', '+9', '+9' ]) = 1400411418", () => {
  expect(math_cal.math(140,[ 'mirror', 'mirror', '<<', '<<', '+9', '+9' ])).toBe(1400411418);
});

test("math_cal.math(140[ 'mirror', 'mirror', 'mirror', 'mirror', 'mirror', 'mirror' ]", () => {
  expect(math_cal.math(140,[ 'mirror', 'mirror', 'mirror', 'mirror', 'mirror', 'mirror' ])).toBe(Infinity);
});
test("math_cal.math(140[ '+9', '<<', '-3', 'mirror', '+9', '+9' ]", () => {
  expect(math_cal.math(140,[ '+9', '<<', '-3', 'mirror', '+9', '+9' ])).toBe(1129);
});


test('math_cal.find() ', () => {
    expect(math_cal.find(125,20,8,["sum","mirror"])).toBe(0);
});