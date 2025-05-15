import fs from "fs";
import { parse } from "csv-parse/sync";

const csvText = fs.readFileSync("./src/data.csv", "utf-8");

const records = parse(csvText, {
  columns: true,
  skip_empty_lines: true,
});

const labelTranslation: { [jp: string]: string } = {
  高い: "expensive",
  安い: "cheap",
  高すぎる: "tooExpensive",
  安すぎる: "tooCheap",
};

export const labelMap: { [label: string]: number[] } = {};

for (const jpLabel in labelTranslation) {
  const enLabel = labelTranslation[jpLabel];
  labelMap[enLabel] = [];
}

// データを振り分け
for (const row of records) {
  for (const jpLabel in labelTranslation) {
    const enLabel = labelTranslation[jpLabel];
    const value = parseFloat(row[jpLabel]);
    labelMap[enLabel].push(value);
  }
}
