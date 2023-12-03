const input = Bun.file("input.txt");

const text = await input.text();
const lines = text.split("\n");

// PART ONE
const numRegex = /(\d)/g;
const numArr = lines
  .filter((line) => line)
  .map((line) => {
    const found = line.match(numRegex);
    return Number.parseInt([found?.at(0), found?.at(-1)].join(""));
  });

const total = numArr.reduce((acc, curr) => acc + curr, 0);
console.log(total);

// PART TWO
const numLookup: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

//const wordNumRegex = /(\d|one|two|three|four|five|six|seven|eight|nine)/g;
const overlapRegex = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))./g;
const wordArr = lines
  .filter((line) => line)
  .map((line) => {
    //const found = line.match(wordNumRegex);
    const found = [];
    let match;
    while ((match = overlapRegex.exec(line)) != null) {
      found.push(match[1]);
    }
    const first = found?.at(0);
    const last = found?.at(-1);
    if (!first || !last) return 0;
    return Number.parseInt(
      [numLookup[first] || first, numLookup[last] || last].join("")
    );
  });

const finaltotal = wordArr.reduce((accc, currr) => accc + currr, 0);
console.log(finaltotal);
