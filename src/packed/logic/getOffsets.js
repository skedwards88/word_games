export function getOffsets(pool, maxLength) {
  const root = Math.floor(Math.sqrt(maxLength));
  const offsets = [];
  for (let index = 0; index < pool.length; index++) {
    const yOffsetFactor = Math.floor(index / root) - Math.floor((root - 1) / 2);
    const xOffsetFactor = (index % root) - Math.floor((root - 1) / 2);
    const offset = new Object({
      x: xOffsetFactor,
      y: yOffsetFactor,
    });
    offsets.push(offset);
  }
  return offsets;
}

export function getPositionalFractions(pool, maxLength) {
  const offsets = getOffsets(pool, maxLength);

  const vhInPx =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
    100;
  const vwInPx =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    100;

  const fractionalPositions = [];
  for (let index = 0; index < pool.length; index++) {
    const xOffset = offsets[index].x;
    const yOffset = offsets[index].y;

    const xFractionalPosition =
      (48 * vwInPx + xOffset * Math.floor(50 / Math.sqrt(maxLength)) * vwInPx) /
      vwInPx;
    const yFractionalPosition =
      (68 * vhInPx + yOffset * Math.floor(30 / Math.sqrt(maxLength)) * vhInPx) /
      vhInPx;

    const fractionalPosition = new Object({
      x: xFractionalPosition,
      y: yFractionalPosition,
    });
    fractionalPositions.push(fractionalPosition);
  }
  return fractionalPositions;
}
