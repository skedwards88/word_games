export function getPositionalFractions({
  poolLetters,
  maxLettersAcross,
  stagger = false,
}) {
  // Span across this percentage of the screen
  const xSpan = 80;
  const ySpan = 80;

  const maxLettersHigh = Math.ceil(poolLetters.length / maxLettersAcross);

  // Letter width/height is min(6vmax, 9vmin)
  // Determine which is smaller in px, then use the corresponding percentage.
  const vhInPx =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
    100;
  const vwInPx =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    100;
  const vMin = Math.min(vhInPx, vwInPx);
  const vMax = Math.max(vhInPx, vwInPx);
  const letterDiameter = 6 * vMax < 9 * vMin ? 6 : 9;

  const fractionalPositions = [];
  for (let index = 0; index < poolLetters.length; index++) {
    let xOffset = index % maxLettersAcross;
    const yOffset = Math.floor(index / maxLettersAcross);
    if (stagger && yOffset % 2) {
      xOffset = xOffset + 0.5;
    }

    const xFractionalPosition =
      xOffset * (xSpan / maxLettersAcross) + // Divide the span by the number of elements, times offset
      xSpan / maxLettersAcross / 2 + // Center the element in the area
      (100 - xSpan) / 2 - // Adjust for not spanning across whole width
      letterDiameter / 2; // Adjust for width of the letter

    const yFractionalPosition =
      yOffset * (ySpan / maxLettersHigh) + // Divide the span by the number of elements, times offset
      ySpan / maxLettersHigh / 2 + // Center the element in the area
      (100 - ySpan) / 2 - // Adjust for not spanning across whole height
      letterDiameter; // Adjust for height of the letter

    const fractionalPosition = new Object({
      x: xFractionalPosition,
      y: yFractionalPosition,
    });
    fractionalPositions.push(fractionalPosition);
  }
  return fractionalPositions;
}
