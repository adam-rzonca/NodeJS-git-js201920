// 1. Zadaniem jest stworzenie aplikacji składającej się z 2 plików app.js oraz plików z utils.js
// w którym to zostanie zaimplementowana funkcja usuwania zduplikowanych elementów w tablicy.

function uniq(array) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    let item = array[i];

    if (result.indexOf(item) === -1) {
      result.push(item);
    }
  }

  return result;
}

// 2. Dodajmy nową funkcjonalność do naszej aplikacji z zadania 1.
// Stwórzmy funkcję która zwróci różnicę między 2 tablicami.

function diff(tabA, tabB) {
  let result = [];

  for (let i = 0; i < tabA.length; i++) {
    let item = tabA[i];

    if (tabB.indexOf(item) === -1) {
      result.push(item);
    }
  }

  return result;
}

function findDiff() {}

module.exports = {
  uniq: uniq,
  diff: diff
};
