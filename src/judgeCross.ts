type Data = {
  x: number;
  y: number;
};

function crossProduct(vec1: Data, vec2: Data) {
  const cross = vec1.x * vec2.y - vec1.y * vec2.x;
  return cross;
}

//横軸は価格(threshold), 縦軸は％(実際の値)
export function judgeCross(a: Data, b: Data, c: Data, d: Data) {
  //外積AB,AC,ADに使う
  const ab = { x: b.x - a.x, y: b.y - a.y };
  const ac = { x: c.x - a.x, y: c.y - a.y };
  const ad = { x: d.x - a.x, y: d.y - a.y };

  //外積CA,CB, CDに使う
  const ca = { x: a.x - c.x, y: a.y - c.y };
  const cb = { x: b.x - c.x, y: b.y - c.y };
  const cd = { x: d.x - c.x, y: d.y - c.y };

  const cross1 = crossProduct(ab, ac) * crossProduct(ab, ad);
  const cross2 = crossProduct(ca, cd) * crossProduct(cb, cd);

  //両方負であるなら交差していると言える
  return cross1 < 0 && cross2 < 0;
}
