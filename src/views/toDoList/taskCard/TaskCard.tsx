import {
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  IconButton,
  Switch,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import type { Task } from '../../../api/task/task.types.ts';
import { getStatusMessage } from '../../../api/task/task.constants.ts';

interface TWProps {
  className?: string;
}

interface TaskCardProps extends TWProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onToggleDone: (id: string) => void;
}

export function TaskCard({ task, onDelete, onEdit, onToggleDone, className }: TaskCardProps) {
  const done = task.status === 'done';

  return (
    <Card
      className={`w-[290px] max-w-md mx-auto md:mx-0 shadow-none md:shadow p-2 md:p-4 transition hover:shadow-lg ${
        done ? 'opacity-70 line-through' : ''
      } ${className ?? ''}`}>
      <CardContent className="flex flex-col gap-2">
        <Typography variant="h6">{task.title}</Typography>
        {task.description && (
          <Typography variant="body2" className="text-gray-600 dark:text-gray-300">
            {task.description}
          </Typography>
        )}
        <Typography variant="caption" className="italic text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions className="flex justify-between pt-0">
        <div className="flex gap-1">
          <IconButton size="small" onClick={() => onEdit(task)}>
            <EditIcon fontSize="inherit" />
          </IconButton>
          <IconButton size="small" onClick={() => onDelete(task.id)}>
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </div>
        <FormControlLabel
          control={<Switch size="small" checked={done} onChange={() => onToggleDone(task.id)} />}
          label={getStatusMessage(task.status)}
        />
      </CardActions>
    </Card>
  );
}
