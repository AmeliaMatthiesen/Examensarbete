import cron from 'node-cron';
import Task from '../models/Task.js';
import { calculateNextOccurrence } from '../utils/calculateNextOccurrence.js';

cron.schedule('0 * * * *', async () => {
  try {
    const now = new Date();

    // Hämta tasks som ska upprepas nu eller tidigare
    const tasksToClone = await Task.find({
      isRecurring: true,
      nextOccurrence: { $lte: now }
    });

    for (const task of tasksToClone) {
      // Skapa en ny task baserat på den gamla, men med nytt datum
      await Task.create({
        user: task.user,
        title: task.title,
        description: task.description,
        status: 'todo',
        dueDate: task.nextOccurrence,
        isRecurring: task.isRecurring,
        recurring: task.recurring,
        repeatInterval: task.repeatInterval,
        nextOccurrence: null,
        subtasks: task.subtasks,
        googleEventId: null // Undvik att återanvända gammalt Google Calendar-event
      });

      // Uppdatera originaltaskens nästa återkomst
      const next = calculateNextOccurrence(
        task.nextOccurrence,
        task.recurring,
        task.repeatInterval || 1 // Fallback ifall repeatInterval är undefined
      );

      task.nextOccurrence = next;
      await task.save();
    }

    console.log(`[cron] ✅ Recurring tasks processed (${tasksToClone.length}) at ${new Date().toISOString()}`);
  } catch (err) {
    console.error('[cron] ❌ Failed to process recurring tasks:', err);
  }
});
