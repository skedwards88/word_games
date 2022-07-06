export function getPositionalFractions({poolLetters, maxLettersAcross}) {

  console.log(`max across ${maxLettersAcross}`)
  const vhInPx =
    Math.max(document.documentElement.clientHeight, window.innerHeight || 0) /
    100;
  const vwInPx =
    Math.max(document.documentElement.clientWidth, window.innerWidth || 0) /
    100;
  const vMin = Math.min(vhInPx, vwInPx);
  const vMax = Math.max(vhInPx, vwInPx);
  // Font size is min(6vmax, 9vmin)
  // Determine which is smaller in px, then use the corresponding percentage.
  const letterWidth = 6 * vMax < 9 * vMin ? 6 : 9;

  const fractionalPositions = [];
  for (let index = 0; index < poolLetters.length; index++) {
    const xOffset = index % maxLettersAcross;
    const yOffset = Math.floor(index / maxLettersAcross);

    const xSpan = 80; // Span across this percentage of the screen
    const xFractionalPosition =
      xOffset * (xSpan / maxLettersAcross) + // Divide the span by the number of elements, times offset
      xSpan / maxLettersAcross / 2 + // Center the element in the area
      (100 - xSpan) / 2 - // Adjust for not spanning across whole screen
      letterWidth / 2; // Adjust for width of the letter

    const ySpan = 35; // Span across this percentage of the screen
    const yFractionalPosition =
      yOffset * (ySpan / maxLettersAcross) + // Divide the span by the number of elements, times offset
      ySpan / maxLettersAcross / 2 + // Center the element in the area
      (100 - maxLettersAcross) / 2 - // Adjust for not spanning across whole screen
      letterWidth / 2 + // Adjust for width of the letter
      25; // Offset to be lower on the screen

    const fractionalPosition = new Object({
      x: xFractionalPosition,
      y: yFractionalPosition,
    });
    fractionalPositions.push(fractionalPosition);
  }
  return fractionalPositions;
}
