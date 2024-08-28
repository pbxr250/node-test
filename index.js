
const SIZE = 10,
  BORDER_NUMBER = 100;

/**
 * Get Random number in interval [-100, 100] including borders
 * @returns {int} Random number.
 */
const getRand = () =>
  -BORDER_NUMBER + Math.floor(2 * Math.random() * BORDER_NUMBER + 1);

// Generate array
const array = Array.from({ length: SIZE }, () =>
  Array.from({ length: SIZE }, () => getRand())
);

// Finding rows with min value
const rowMinIndex = findRowMinNumber();
console.log(`Global Min value = ${rowMinIndex.value}, can be found in rows: ${rowMinIndex.indexArray.toString()}`);

// Min positive values
const minPosColumn = findMinPositives();

//Min replace values
const minReplaceColumn = findMinReplaces();


// Showing result table
console.table(visualize());


/**
 * // Transforming array to object for better visualization
 * @returns {array} Transformed array.
 */
function visualize() {
  let transformedArray = array.reduce((finalObject, innerArray, rowIndex) => {
    let rowIndexFinal = rowIndex + 1;
    if (rowMinIndex.indexArray.includes(rowIndexFinal))
      rowIndexFinal += ' *'
    else
      rowIndexFinal += '  '
    let columns = innerArray.reduce(
      (innerObject, value, colIndex) => {
        innerObject[colIndex + 1] = value;
        return innerObject;
      }, {}
    );
    columns['Min Positive'] = minPosColumn[rowIndex];
    columns['Min Num of Replaces'] = minReplaceColumn[rowIndex];
    finalObject[rowIndexFinal] = columns;
    return finalObject;
  }, {});

  

  return transformedArray;
}


/**
 * Task 1 : finds row with min number
 * @returns {object} Value and array of indices from 1 to SIZE.
 */
function findRowMinNumber() {
  let minRows = array.reduce((arr, innerArr) => {
    arr.push(Math.min(...innerArr));
    return arr;
  }, []);
  let minValue = Math.min(...minRows);
  // Array of indices in case of many rows with *
  let minIndices = [];
  for (let i = 0; i < minRows.length; i++) {
    if (minRows[i] === minValue) 
      minIndices.push(i + 1);
  }

  return { 'value': minValue, 'indexArray': minIndices };
}

/**
 * Task 2 : finds minimum positive numbers
 * @returns {array} Array of minimum positive numbers.
 */
function findMinPositives() {
  let minPosColumn = Array(SIZE).fill('no positives')

  for (let i = 0; i < array.length; i++) {
    let arr = array[i].filter( num => num > 0)
    let ts = Math.min(arr);
    if (arr.length !== 0)
      minPosColumn[i] = Math.min(...arr);
  }

  return minPosColumn;
}

/**
 * Task 3 : Min replace
 * @returns {int} min.
 */
function findMinReplaces() {
  let minReplaceColumn = Array(SIZE).fill(0)

  for (let i = 0; i < array.length; i++) {
    let arr = array[i];
    let min = 0;
    let left = 0,
        right = 2
    while (right < arr.length) {
      let count = 1;
      let current = arr[left];
      for (let j = left + 1; j <= right; j++) {
        if (Math.sign(current) === Math.sign(arr[j]))
          count++;
        current = arr[j];
      }
      if (count == 3) {
        min++;
        left += 3;
        right += 3;
      } else {
        left++;
        right++;
      }
    }

    minReplaceColumn[i] = min;
    
  }

  return minReplaceColumn;
}