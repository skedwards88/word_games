export function partitionArray(array, partitionSize) {
  let partitioned = [];
  for (let i = 0; i < array.length; i += partitionSize) {
    partitioned.push(array.slice(i, i + partitionSize));
  }
  return partitioned;
}
