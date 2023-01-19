/**
 * Used in dayListItem to render the correct text depending on how many spots are remaining
 * @param {*} spots From state.days.spots
 * @returns  A string
 */
export default function formatSpots(spots) {
  return spots === 0 ? 'no spots remaining' :
    spots === 1 ? '1 spot remaining' :
      `${spots} spots remaining`;
}