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

export function getPositions(pool) {
  const offsets = getOffsets(pool);

  const vhInPx =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
    100;
  const vwInPx =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    100;

  const positions = [];
  for (let index = 0; index < pool.length; index++) {
    const xOffset = offsets[index].x;
    const yOffset = offsets[index].y;
    const xPosition = 50 * vwInPx + xOffset * 8 * vwInPx;
    const yPosition = 70 * vhInPx + yOffset * 8 * vhInPx;
    const position = new Object({
      // x: `${xPosition}px`,
      // y: `${yPosition}px`,
      x: xPosition,
      y: yPosition,
    });
    positions.push(position);
  }
  return positions;
}
