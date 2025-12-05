export function taskQuery(filter) {
  if (filter === "PENDING") return "?status=PENDING";
  if (filter === "IN_PROGRESS") return "?status=IN_PROGRESS";
  if (filter === "COMPLETED") return "?status=COMPLETED";
  return "";
}