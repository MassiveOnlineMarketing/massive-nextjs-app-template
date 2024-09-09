
/**
 * Returns the ordinal suffix for a given position.
 * 
 * @param position - The position for which to get the ordinal suffix.
 * @returns The ordinal suffix ('st', 'nd', 'rd', or 'th').
 */
export const getOrdinalSuffix = (position: number) => {
  if (position % 10 === 1 && position % 100 !== 11) {
    return 'st';
  } else if (position % 10 === 2 && position % 100 !== 12) {
    return 'nd';
  } else if (position % 10 === 3 && position % 100 !== 13) {
    return 'rd';
  } else {
    return 'th';
  }
};