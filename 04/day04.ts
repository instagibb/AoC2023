//const input = Bun.file("example.txt");
const input = Bun.file("input.txt");
const text = await input.text();

const cardData = text
  .split("\n")
  .filter((line) => line)
  .map((line) => line.replace("Card ", ""));

type Card = {
  cardId: number;
  winningNumbers: number[];
  gameNumbers: number[];
};

// PART ONE
const numRegex = /(\d+)/g;
const scratchCards: Card[] = cardData.map((card) => {
  const cardId = Number.parseInt(card.split(":")[0]);
  const numbers = card.split(":")[1].trim().split("|");
  const winningNumbers = numbers[0]
    .match(numRegex)
    ?.map((num) => Number.parseInt(num));
  const gameNumbers = numbers[1]
    .match(numRegex)
    ?.map((num) => Number.parseInt(num));
  return {
    cardId,
    winningNumbers: winningNumbers ?? [],
    gameNumbers: gameNumbers ?? [],
  };
});

type PointCard = Card & { points: number };

const pointCards: PointCard[] = scratchCards.map((card) => {
  let points = 0;
  card.gameNumbers.forEach((num) => {
    if (card.winningNumbers.includes(num)) {
      if (points === 0) {
        points = 1;
      } else {
        points = points * 2;
      }
    }
  });
  return { ...card, points };
});

const total = pointCards.reduce((acc, curr) => acc + curr.points, 0);
console.log(total);

// PART TWO
type CopyCard = Card & { copiesWon: number };

const copyCards = scratchCards.map((card) => {
  const copiesWon = card.gameNumbers.filter((num) =>
    card.winningNumbers.includes(num)
  ).length;
  return { ...card, copiesWon };
});

const copyCardsWithWinnings: CopyCard[] = [];

const processCard = (ogCard: CopyCard) => {
  copyCardsWithWinnings.push(ogCard);
  if (ogCard.copiesWon > 0) {
    copyCards
      .filter(
        (c) =>
          c.cardId > ogCard.cardId &&
          c.cardId <= ogCard.cardId + ogCard.copiesWon
      )
      .forEach(processCard);
  }
};

copyCards.forEach(processCard);

console.log(copyCardsWithWinnings.length);
