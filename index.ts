import { readFileSync } from "node:fs";
const input: string = readFileSync("input.txt", "utf-8");

const [stacksInput, movesInput] = input.split("\n\n");

const getItemsFromLine = (line: string) => {
  let i = 0;
  let columnIndex = 0;
  let result: string[] = [];
  while (i <= line.length) {
    const crate = line.slice(i, i + 3).trim();
    if (crate !== "") {
      result.push(crate[1]);
    } else {
      result.push("");
    }
    i += 4;
    columnIndex += 1;
  }
  return result;
};

const getNumbersFromLine = (line: string) => {
  const result: string[] = [];
  line.split("").forEach((num) => {
    if (!isNaN(parseFloat(num))) {
      result.push(num);
    }
  });
  return result;
};

const stacks = stacksInput.split("\n").map((line) => {
  return line.includes("[") ? getItemsFromLine(line) : getNumbersFromLine(line);
});

const startingStacks = stacks.slice(0, -1).reduce(
  (accumm, current) => (
    current.forEach((box, i) => {
      /\S/.test(box) && accumm[i]?.unshift(box);
    }),
    accumm
  ),
  stacks.slice(-1)[0].map((_) => [] as string[])
);

const instructions = movesInput.split("\n").map((operationString) => {
  const [toMove, from, to] = operationString
    .split(" ")
    .filter((item) => {
      return !isNaN(parseFloat(item));
    })
    .map(Number);

  return { toMove, from: from - 1, to: to - 1 };
});


// const solution = (stacks: string[][]) => {
//   const endStacks: string[][] = stacks;

//   instructions.forEach(({ toMove, from, to }) => {
//     const boxes = endStacks[from].splice(-toMove);
//     endStacks[to].push(...boxes.reverse())
//   });
// return endStacks.map((stack)=> stack.slice(-1)[0]).join("")
// };



const solution2 = (stacks: string[][]) => {
    const endStacks: string[][] = stacks;
  
    instructions.forEach(({ toMove, from, to }) => {
      const boxes = endStacks[from].splice(-toMove);
      endStacks[to].push(...boxes)
    });
  return endStacks.map((stack)=> stack.slice(-1)[0]).join("")
  };
  console.log(solution2(startingStacks))
