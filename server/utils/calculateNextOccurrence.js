import dayjs from 'dayjs';

export const calculateNextOccurrence = (dueDate, recurring, interval = 1) => {
  if (!dueDate || !dayjs(dueDate).isValid()) return null;

  const base = dayjs(dueDate);
  const safeInterval = Math.max(1, parseInt(interval) || 1);

  switch (recurring) {
    case 'daily':
      return base.add(safeInterval, 'day').toDate();
    case 'weekly':
      return base.add(safeInterval, 'week').toDate();
    case 'monthly':
      return base.add(safeInterval, 'month').toDate();
    case 'yearly':
      return base.add(safeInterval, 'year').toDate();
    default:
      return null;
  }
};
