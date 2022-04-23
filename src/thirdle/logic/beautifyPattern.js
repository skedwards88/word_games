export function beautifyPattern(pattern) {
  // Convert a regex pattern into a human readable pattern for gameplay
  return pattern
    .replaceAll("[A-Z]+", "...")
    .replaceAll("$", "")
    .replaceAll("^", "")
}