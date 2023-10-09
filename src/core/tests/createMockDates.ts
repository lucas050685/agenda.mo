export function createMockDates(){
  const today = new Date();
  
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  const nextMonth = new Date(today);
  nextMonth.setMonth(today.getMonth() + 1);

  const lastMonth = new Date(today);
  lastMonth.setMonth(today.getMonth() - 1);

  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const lastWeek = new Date(today);
  lastWeek.setDate(today.getDate() - 7);

  return {
    today,
    tomorrow,
    nextMonth,
    nextWeek,
    lastMonth,
    lastWeek,
  };
}
