"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_fs_1 = require("node:fs");
var input = (0, node_fs_1.readFileSync)("input.txt", "utf-8");
var _a = input.split("\n\n"), stacksInput = _a[0], movesInput = _a[1];
var getItemsFromLine = function (line) {
    var i = 0;
    var columnIndex = 0;
    var result = [];
    while (i <= line.length) {
        var crate = line.slice(i, i + 3).trim();
        if (crate !== "") {
            result.push(crate[1]);
        }
        else {
            result.push("");
        }
        i += 4;
        columnIndex += 1;
    }
    return result;
};
var getNumbersFromLine = function (line) {
    var result = [];
    line.split("").forEach(function (num) {
        if (!isNaN(parseFloat(num))) {
            result.push(num);
        }
    });
    return result;
};
var stacks = stacksInput.split("\n").map(function (line) {
    return line.includes("[") ? getItemsFromLine(line) : getNumbersFromLine(line);
});
var startingStacks = stacks.slice(0, -1).reduce(function (accumm, current) { return (current.forEach(function (box, i) {
    var _a;
    /\S/.test(box) && ((_a = accumm[i]) === null || _a === void 0 ? void 0 : _a.unshift(box));
}),
    accumm); }, stacks.slice(-1)[0].map(function (_) { return []; }));
var instructions = movesInput.split("\n").map(function (operationString) {
    var _a = operationString
        .split(" ")
        .filter(function (item) {
        return !isNaN(parseFloat(item));
    })
        .map(Number), toMove = _a[0], from = _a[1], to = _a[2];
    return { toMove: toMove, from: from - 1, to: to - 1 };
});
// const solution = (stacks: string[][]) => {
//   const endStacks: string[][] = stacks;
//   instructions.forEach(({ toMove, from, to }) => {
//     const boxes = endStacks[from].splice(-toMove);
//     endStacks[to].push(...boxes.reverse())
//   });
// return endStacks.map((stack)=> stack.slice(-1)[0]).join("")
// };
var solution2 = function (stacks) {
    var endStacks = stacks;
    instructions.forEach(function (_a) {
        var _b;
        var toMove = _a.toMove, from = _a.from, to = _a.to;
        var boxes = endStacks[from].splice(-toMove);
        (_b = endStacks[to]).push.apply(_b, boxes);
    });
    return endStacks.map(function (stack) { return stack.slice(-1)[0]; }).join("");
};
console.log(solution2(startingStacks));
