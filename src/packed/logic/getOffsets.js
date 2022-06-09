export function getOffsets(pool) {
  const root = Math.floor(Math.sqrt(pool.length));
  const offsets = [];
  for (let index = 0; index < pool.length; index++) {
    const xOffsetFactor = Math.floor(index / root) - Math.floor((root - 1) / 2);
    const yOffsetFactor = (index % root) - Math.floor((root - 1) / 2);
    const offset = new Object({
      x: xOffsetFactor,
      y: yOffsetFactor,
    });
    offsets.push(offset);
  }
  return offsets;
}
