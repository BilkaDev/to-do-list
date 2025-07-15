import { useMemo, useState } from 'react';
import {
  AppBar,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography
} from '@mui/material';
import { Add as AddIcon, Sort as SortIcon } from '@mui/icons-material';
import { TaskCard } from './taskCard/TaskCard.tsx';
import { AddTask } from './addTask/AddTask.tsx';
import { useTasks } from '../../api/task/useTasks.ts';

import type { Task, TaskStatus } from '../../api/task/task.types.ts';
import { getStatusMessage } from '../../api/task/task.constants.ts';

const taskStatusOptions: {
  value: TaskStatus | 'all';
  label: string;
}[] = [
  { value: 'all', label: 'Wszystkie' },
  { value: 'todo', label: getStatusMessage('todo') },
  { value: 'in_progress', label: getStatusMessage('in_progress') },
  { value: 'done', label: getStatusMessage('done') }
];

export function ToDoList() {
  const { tasks, upsertTask, deleteTask, toggleDone } = useTasks();
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    return tasks
      .filter((t) =>
        [t.title, t.description].some((field) => field.toLowerCase().includes(query.toLowerCase()))
      )
      .filter((t) => (statusFilter === 'all' ? true : t.status === statusFilter))
      .sort((a, b) => (sortAsc ? a.createdAt - b.createdAt : b.createdAt - a.createdAt));
  }, [tasks, query, statusFilter, sortAsc]);

  const openAddForm = () => {
    setEditingTask(undefined);
    setFormOpen(true);
  };
  const openEditForm = (task: Task) => {
    setEditingTask(task);
    setFormOpen(true);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <AppBar position="static" className="bg-indigo-600 dark:bg-indigo-700">
          <Toolbar className="flex justify-between">
            <Typography variant="h6">Zarządzanie zadaniami</Typography>
            <IconButton color="inherit" onClick={openAddForm} aria-label="dodaj">
              <AddIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="p-4 flex flex-col md:flex-row gap-4 items-stretch md:items-end bg-white shadow-sm">
          <TextField
            label="Szukaj"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full md:w-1/3"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as TaskStatus | 'all')}
            className="w-full md:w-48"
            variant="outlined">
            {taskStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Button
            startIcon={<SortIcon />}
            variant="outlined"
            onClick={() => setSortAsc((v) => !v)}
            className="w-full md:w-[180px]">
            {sortAsc ? 'Najstarsze' : 'Najnowsze'}
          </Button>
        </div>
        <div className="flex-1 p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 overflow-y-auto">
          {filtered.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={deleteTask}
              onEdit={openEditForm}
              onToggleDone={toggleDone}
            />
          ))}
          {filtered.length === 0 && (
            <Typography className="col-span-full text-center text-gray-500 mt-8">
              Brak zadań
            </Typography>
          )}
        </div>
        <AddTask
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSave={upsertTask}
          initial={editingTask}
        />
      </div>
    </div>
  );
}
