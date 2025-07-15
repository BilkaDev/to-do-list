import { useLocalStorage } from '../../common/hooks/useLocalStorage.tsx';
import type { Task } from './task.types.ts';
import { TASK_LOCAL_STORAGE_KEY } from './task.constants.ts';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASK_LOCAL_STORAGE_KEY, []);

  const upsertTask = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.some((t) => t.id === task.id);
      return exists ? prev.map((t) => (t.id === task.id ? task : t)) : [...prev, task];
    });
  };
  const deleteTask = (id: string) => setTasks((prev) => prev.filter((t) => t.id !== id));
  const toggleDone = (id: string) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t))
    );

  return { tasks, toggleDone, deleteTask, upsertTask };
}
