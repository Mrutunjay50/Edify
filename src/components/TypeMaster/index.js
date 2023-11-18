const array1 = ["hllo", "my", "name", "is", "yoiu", "jkhadsc"];
const array2 = ["hoppme", "my", "naswp", "ibhjdfv"];

const arr2 = [];

for (let index = 0; index < array1.length; index++) {
  if (array1[index] !== undefined && array2[index] !== undefined) {
    const arr = [array1[index]];
    const arr1 = [array2[index]];
    if (arr.length === arr1.length) {
      for (let i = 0; i < arr.length; i++) {
        arr2.push(arr[i] + arr1[i].slice(arr[i].length));
      }
    }
  } else if (array1[index] !== null && array2[index] === undefined) {
    arr2.push(array1[index]);
  }
}

// if (arr.length === arr1.length) {
//   for (let i = 0; i < arr.length; i++) {
//     arr2.push(arr[i] + arr1[i].slice(arr[i].length));
//   }
// }

console.log(arr2);
