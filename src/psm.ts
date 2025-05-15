import { judgeCross } from "./judgeCross";
import { PSMResults } from "./calculateRatios";

type Data = {
  x: number;
  y: number;
};

function range(ratio1: string, ratio2: string) {
  const data = PSMResults;
  for (let i = 0; i < data.length - 1; i++) {
    let a = { x: data[i].threshold, y: data[i][ratio1] };
    let b = { x: data[i + 1].threshold, y: data[i + 1][ratio1] };
    let c = { x: data[i].threshold, y: data[i][ratio2] };
    let d = { x: data[i + 1].threshold, y: data[i + 1][ratio2] };
    // console.log(a);

    //交差した場合はここで交点を求める
    if (judgeCross(a, b, c, d)) {
      const intersection = getIntersection(a, b, c, d);
      if (intersection) {
        return intersection;
      }
    }
  }
}

//連立方程式をとく
function getIntersection(a: Data, b: Data, c: Data, d: Data) {
  const k1 = (b.y - a.y) / (b.x - a.x);
  const section1 = a.y - k1 * a.x;

  const k2 = (d.y - c.y) / (d.x - c.x);
  const section2 = c.y - k2 * c.x;

  const cx = (section2 - section1) / (k1 - k2);
  return cx;
}

//最高 = 高すぎる * 安い
//妥協 = 高い * 安い
//理想 = 高すぎる * 安すぎる
//最低品質保証 = 高い * 安すぎる
function main() {
  const max_price = Math.ceil(range("tooExpensiveRatio", "cheapRatio")!);
  const compromise_price = Math.ceil(range("expensiveRatio", "cheapRatio")!);
  const ideal_price = Math.ceil(range("tooExpensiveRatio", "tooCheapRatio")!);
  const min_price = Math.ceil(range("expensiveRatio", "tooCheapRatio")!);

  console.log(`最高価格 : ${max_price}円`);
  console.log(`妥協価格 : ${compromise_price}円`);
  console.log(`理想価格 : ${ideal_price}円`);
  console.log(`最低品質保証価格 :${min_price}円`);

  //以下は小数点以下確認用
  // console.log(`最高: ${range("tooExpensiveRatio", "cheapRatio")}円`);
  // console.log(`妥協 : ${range("expensiveRatio", "cheapRatio")}円`);
  // console.log(`理想 : ${range("tooExpensiveRatio", "tooCheapRatio")}円`);
  // console.log(
  //   `最低 :${range("expensiveRatio", "tooCheapRatio")}円`
  // );
}

main();
