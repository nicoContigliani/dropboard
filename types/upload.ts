// types/upload.ts
import { KanbanData } from '@/components/ResponsiveKanbanBoard/KanbanBoard';

export interface UploadData {
  _id: string;
  data: KanbanData;
  metadata: {
    source: string;
  };
  owner: {
    id: string;
    email: string;
  };
  group: string[];
  createdAt: string;
  updatedAt: string;
}