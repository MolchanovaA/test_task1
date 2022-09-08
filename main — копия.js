function loadGrain(levelsArr) {
  if (!Array.isArray(levelsArr) || levelsArr.length <= 2) return 0;
  let grainSumArray = [];

  function checkTankBoards(levels, sumGrain = 0) {
    grainSumArray.push(sumGrain);
    if (levels.length < 2) {
      return;
    } else {
      let flagShtok = 0;
      let flagShtokI = 0;

      let nextHighBoard = 0;

      let boardL = 0;
      let boardLi = 0;

      let boardR = 0;
      let boardRi = 0;

      for (let i = 0; i < levels.length; i++) {
        if (flagShtok < levels[i]) {
          flagShtok = levels[i];
          flagShtokI = i;

          if (flagShtok > levels[i + 1]) {
            break;
          }
        }
      }

      for (let j = flagShtokI + 1; j < levels.length; j++) {
        if (levels[j] > flagShtok) {
          // если нашли выше флагштока то флагшток = правый борт, то что выше - левый борт
          boardL = flagShtok;
          boardLi = flagShtokI;
          boardR = levels[j];
          boardRi = j;
          break;
        } else {
          //если не нашли выше флагштока, то ищем следующий самый высокий элемент. он становится правым бортом, а фл - левым
          if (levels[j] > nextHighBoard) {
            boardL = flagShtok;
            boardLi = flagShtokI;
            nextHighBoard = levels[j];
            boardR = nextHighBoard;
            boardRi = j;
          }
        }
      }
      let tankArr = levels.slice(boardLi + 1, boardRi);

      let tankHeight = boardL > boardR ? boardR : boardL;
      let tankGrain = tankArr.reduce((acc, item) => {
        acc += tankHeight - item;
        return acc;
      }, 0);
      let leastBarge = levels.splice(boardRi);
      sumGrain = sumGrain + tankGrain;
      checkTankBoards(leastBarge, sumGrain);
    }
  }

  checkTankBoards(levelsArr);

  let totalGrain = grainSumArray[grainSumArray.length - 1];
  console.log(totalGrain, "finall");
  return totalGrain;
}

// loadGrain([7, 1]);
// loadGrain([7, 10, 23, 2, 6, 10, 17, 40, 1, 10, 6]);
// loadGrain([4, 5, 3, 1, 1, 2, 7, 6, 7, 2, 1, 3, 2, 1]);
// loadGrain([4, 1, 3]); // 2
// console.log(loadGrain([2, 1, 5, 2, 7, 4, 10])); // 7
console.log(loadGrain([2, 0, 1, 5, 2, 7])); // 6
// loadGrain([2, 4, 2]); // 0
// loadGrain([7, 4]); // 0
// loadGrain([]); // 0
