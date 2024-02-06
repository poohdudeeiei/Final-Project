export function OverlapTime({
  start,
  end,
  refStart,
  refEnd,
}: {
  start: string;
  end: string;
  refStart: string | Date;
  refEnd: string | Date;
}) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const refStartDate =
    typeof refStart === "string" ? new Date(refStart) : refStart;
  const refEndDate = typeof refEnd === "string" ? new Date(refEnd) : refEnd;

  const maxStart = new Date(
    Math.max(startDate.getTime(), refStartDate.getTime())
  );
  const minEnd = new Date(Math.min(endDate.getTime(), refEndDate.getTime()));

  // true if overlap
  return maxStart < minEnd;
}
