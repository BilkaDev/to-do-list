import type { TaskStatus } from './task.types.ts';

export const TASK_LOCAL_STORAGE_KEY = 'task';

export function getStatusMessage(status: TaskStatus): string {
  switch (status) {
    case 'todo':
      return 'Do zrobienia';
    case 'in_progress':
      return 'W trakcie';
    case 'done':
      return 'Ukończone';
    default:
      return '';
  }
}
