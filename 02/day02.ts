const input = Bun.file("input.txt");
const text = await input.text();

const allGames = text
  .split("\n")
  .filter((line) => line)
  .map((line) => line.replace("Game ", ""));

// PART ONE
const maxColorTotals = {
  red: 12,
  green: 13,
  blue: 14,
};

const gamesArr = allGames.map((game) => {
  const id = Number.parseInt(game.split(":")[0]);
  const samples = game
    .split(":")[1]
    .trim()
    .split(";")
    .map((sample) => {
      const sampleObj: Record<string, number> = {};
      sample
        .trim()
        .split(", ")
        .forEach((color) => {
          const reg = /(\d+) (\w+)/; // 1 red
          const info = reg.exec(color);
          if (!info) return;
          sampleObj[info[2]] = Number.parseInt(info[1]);
        });
      return sampleObj;
    });
  return { id, samples }; // { id: "1", samples: [{ red: 1, green: 2, blue: 3 }, ...] }
});

const possibleGames = gamesArr
  .filter((game) => {
    return !game.samples.some(
      (sample) =>
        sample.red > maxColorTotals.red ||
        sample.green > maxColorTotals.green ||
        sample.blue > maxColorTotals.blue
    );
  })
  .map((game) => game.id);

const total = possibleGames.reduce((acc, curr) => acc + curr, 0);
console.log(total);

// PART TWO
const gamesMinArr = allGames.map((game) => {
  const id = Number.parseInt(game.split(":")[0]);
  const minObj: Record<string, number> = {};
  const samples = game
    .split(":")[1]
    .trim()
    .split(";")
    .map((sample) => {
      const sampleObj: Record<string, number> = {};
      sample
        .trim()
        .split(", ")
        .forEach((color) => {
          const reg = /(\d+) (\w+)/; // 1 red
          const info = reg.exec(color);
          if (!info) return;
          if (!minObj[info[2]] || minObj[info[2]] < Number.parseInt(info[1])) {
            minObj[info[2]] = Number.parseInt(info[1]);
          }
        });
      return sampleObj;
    });

  const power = Object.values(minObj).reduce((acc, curr) => acc * curr, 1);

  return { id, power, min: Object.values(minObj) }; // { id: "1", power: 6, min: { red: 1, green: 2, blue: 3 } }
});

const minTotal = gamesMinArr.reduce((acc, curr) => acc + curr.power, 0);
console.log(minTotal);
