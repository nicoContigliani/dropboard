export interface Tag {
    name: string;
    color?: string;
  }
  
  export interface Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    dueDate: string;
    tags: Tag[];
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
  
  export interface ProjectStats {
    totalTasks: number;
    completedTasks: number;
    inProgressTasks: number;
    overdueTasks: number;
    completionPercentage: number;
  }
  
  export interface ProjectData {
    project: Project;
    columns: Column[];
    stats: ProjectStats;
  }