export const convertPoints = (initialAmount: number): string => {
  const points: number = initialAmount * Math.pow(10, 6);
  const convertedPoints: string = points.toString();
  const usePoints: string = Number(convertedPoints).toLocaleString("fullwide", {
    useGrouping: false,
  });
  return usePoints;
};
