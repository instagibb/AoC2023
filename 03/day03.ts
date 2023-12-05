//const input = Bun.file("example.txt");
const input = Bun.file("input.txt");
const text = await input.text();

// PART ONE
const partData = text.split("\n").filter((line) => line);

type Info = {
  line: number;
};

type PartInfo = Info & {
  number: number;
  start: number;
  end: number;
};

type SymbolInfo = Info & {
  symbol: string;
  index: number;
};

const regex = /(\d+)|([^.])/g;
const partInfo: PartInfo[] = [];
const symbolInfo: SymbolInfo[] = [];
partData.forEach((part, i) => {
  let info;
  while ((info = regex.exec(part.trim()))) {
    if (info[1]) {
      partInfo.push({
        line: i,
        number: Number.parseInt(info[0]),
        start: regex.lastIndex - info[1].length,
        end: regex.lastIndex - 1,
      });
    } else if (info[2]) {
      symbolInfo.push({
        line: i,
        symbol: info[0],
        index: regex.lastIndex - info[2].length,
      });
    }
  }
});

const validParts: PartInfo[] = [];

partInfo.forEach((pi) => {
  if (
    symbolInfo
      .filter((si) => si.line >= pi.line - 1 && si.line <= pi.line + 1)
      .some((si) => si.index >= pi.start - 1 && si.index <= pi.end + 1)
  ) {
    validParts.push(pi);
  }
});

const total = validParts.reduce((acc, curr) => acc + curr.number, 0);
console.log(total);

// PART TWO
type GearRatio = {
  gear1: number;
  gear2: number;
  ratio: number;
};

const validGears: GearRatio[] = [];
symbolInfo
  .filter((si) => si.symbol === "*")
  .forEach((si) => {
    const gears = partInfo
      .filter((pi) => pi.line >= si.line - 1 && pi.line <= si.line + 1)
      .filter((pi) => si.index >= pi.start - 1 && si.index <= pi.end + 1);
    if (gears.length == 2) {
      const gear1 = gears[0].number;
      const gear2 = gears[1].number;
      validGears.push({ gear1, gear2, ratio: gear1 * gear2 });
    }
  });

const gearRatioTotal = validGears.reduce((acc, curr) => acc + curr.ratio, 0);
console.log(gearRatioTotal);
