// types/types.ts
export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'alta' | 'media' | 'baja';
  dueDate: string;
  tags: string[]; // Cambiado a array de strings para simplificar
}

export interface Column {
  id: string;
  name: string;
  tasks: Task[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  startDate: string;
  deadline: string;
  progress: number;
}

export interface Stats {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
  completionPercentage: number;
}

export interface Activity {
  id: string;
  action: string;
  task: string;
  timestamp: string;
  user: string;
}

export interface ProjectData {
  project: Project;
  columns: Column[];
  stats: Stats;
  recentActivity: Activity[];
  tags: Tag[];
}

export interface KanbanData {
  columns: Column[];
  project: Project;
  stats: Stats;
  recentActivity: Activity[];
  tags: Tag[];
}