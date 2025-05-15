import { labelMap } from "./readCsv";

const expensive = labelMap.expensive;
const cheap = labelMap.cheap;
const tooExpensive = labelMap.tooExpensive;
const tooCheap = labelMap.tooCheap;

const thresholds = Array.from({ length: 12 }, (_, i) => (i + 1) * 50); // [50, 100, ..., 600]

function getRatios(
  array: number[],
  thresholds: number[]
): { [key: number]: number } {
  const total = array.length;
  const result: { [key: number]: number } = {};

  for (const threshold of thresholds) {
    const count = array.filter((v) => v <= threshold).length;
    const ratio = count / total;
    // 小数点第2位で四捨五入（＝小数点第1位まで）
    result[threshold] = Math.round(ratio * 100 * 10) / 10;
  }

  return result;
}

function getRatiosAbove(
  array: number[],
  thresholds: number[]
): { [key: number]: number } {
  const total = array.length;
  const result: { [key: number]: number } = {};

  for (const threshold of thresholds) {
    const count = array.filter((v) => v >= threshold).length;
    const ratio = count / total;
    result[threshold] = Math.round(ratio * 100 * 10) / 10; // 小数点第2位で四捨五入
  }

  return result;
}

function getPSMResult() {
  const PSMResults: { [key: string]: number }[] = [];
  for (let i = 0; i < thresholds.length; i++) {
    const threshold = thresholds[i];
    PSMResults.push({
      threshold: threshold,
      expensiveRatio: ExpensiveRatios[threshold],
      cheapRatio: CheapRatios[threshold],
      tooExpensiveRatio: tooExpensiveRatios[threshold],
      tooCheapRatio: tooCheapRatios[threshold],
    });
  }
  return PSMResults;
}

const ExpensiveRatios = getRatios(expensive, thresholds);
const tooExpensiveRatios = getRatios(tooExpensive, thresholds);
const CheapRatios = getRatiosAbove(cheap, thresholds);
const tooCheapRatios = getRatiosAbove(tooCheap, thresholds);

export const PSMResults = getPSMResult();
