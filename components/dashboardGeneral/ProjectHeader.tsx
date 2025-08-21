import React from 'react';
import {
  Paper,
  Typography,
  Box
} from '@mui/material';
import { Project, ProjectStats } from '@/types/types';

interface ProjectHeaderProps {
  project: Project;
  stats: ProjectStats;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, stats }) => {
  return (
    <Paper sx={{ p: 3, mb: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <Box>
          <Typography variant="h4" gutterBottom>
            {project.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {project.description}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
          <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'success.light', color: 'white', borderRadius: 1 }}>
            <Typography variant="h6">
              {stats.completedTasks}/{stats.totalTasks}
            </Typography>
            <Typography variant="body2">Tareas completadas</Typography>
          </Box>

          <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
            <Typography variant="h6">
              {stats.completionPercentage}%
            </Typography>
            <Typography variant="body2">Progreso</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};