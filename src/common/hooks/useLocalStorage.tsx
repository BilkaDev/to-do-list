import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskStatus } from '../../api/task/task.types.ts';
import { TASK_LOCAL_STORAGE_KEY } from '../../api/task/task.constants.ts';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) return JSON.parse(item) as T;

      if (key === TASK_LOCAL_STORAGE_KEY) {
        const defaultTasks: Task[] = Array.from({ length: 10 }, (_, i) => ({
          id: uuidv4(),
          title: `Zadanie ${i + 1}`,
          description: `Opis zadania numer ${i + 1}`,
          status: ['todo', 'in_progress', 'done'][i % 3] as TaskStatus,
          createdAt: Date.now() - i * 1000 * 60 * 60
        }));
        return defaultTasks as T;
      }

      return initialValue;
    } catch (error) {
      console.error('useLocalStorage get error', error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('useLocalStorage set error', error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
