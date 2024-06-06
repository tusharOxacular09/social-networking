export function paginate(array, pageNumber, pageSize) {
  // Edge case: page number less than 1
  if (pageNumber < 1) {
    pageNumber = 1;
  }
  // Edge case: page size less than 1
  if (pageSize < 1) {
    pageSize = 1;
  }

  // Calculate the starting index of the page
  const startIndex = (pageNumber - 1) * pageSize;
  // Calculate the ending index of the page
  const endIndex = startIndex + pageSize;

  // Return the slice of the array for the specified page
  return array.slice(startIndex, endIndex);
}
