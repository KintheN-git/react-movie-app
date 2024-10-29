export const raitingToPercentage = (raiting) => {
  return (raiting * 10)?.toFixed(0);
};

export const resolveRatingColor = (raiting) => {
  if (raiting >= 7) {
    return "green";
  } else if (raiting >= 4) {
    return "yellow";
  } else {
    return "red";
  }
};

export const minuteToHoursAndMinutes = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const minutesLeft = minutes % 60;
  return `${hours}h ${minutesLeft}m`;
};
