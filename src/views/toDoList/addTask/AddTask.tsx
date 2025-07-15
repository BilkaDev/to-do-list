import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import type { Task, TaskStatus } from '../../../api/task/task.types.ts';

interface AddTaskProps {
  open: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  initial?: Partial<Task>;
}

export function AddTask({ open, onClose, onSave, initial }: AddTaskProps) {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initial?.status ?? 'todo');

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? '');
      setDescription(initial?.description ?? '');
      setStatus(initial?.status ?? 'todo');
    }
  }, [open, initial]);

  const handleSave = () => {
    if (!title.trim()) return;
    const newTask: Task = {
      id: initial?.id ?? uuidv4(),
      title: title.trim(),
      description: description.trim(),
      status,
      createdAt: initial?.createdAt ?? Date.now()
    };
    onSave(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial ? 'Edytuj zadanie' : 'Nowe zadanie'}</DialogTitle>
      <DialogContent className="flex flex-col gap-4 pt-4">
        <TextField
          label="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          label="Opis"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          fullWidth
        />
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          variant="outlined"
          fullWidth>
          <MenuItem value="todo">Do zrobienia</MenuItem>
          <MenuItem value="in_progress">W trakcie</MenuItem>
          <MenuItem value="done">Zrobione</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button variant="contained" onClick={handleSave} disabled={!title.trim()}>
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
}
