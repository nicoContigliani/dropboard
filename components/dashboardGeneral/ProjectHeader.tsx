// // import React from 'react';
// // import {
// //   Paper,
// //   Typography,
// //   Box
// // } from '@mui/material';
// // import { Project, ProjectStats } from '@/types/types';

// // interface ProjectHeaderProps {
// //   project: Project;
// //   stats: ProjectStats;
// // }

// // export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, stats }) => {
// //   return (
// //     <Paper sx={{ p: 3, mb: 2 }}>
// //       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
// //         <Box>
// //           <Typography variant="h4" gutterBottom>
// //             {project.name}
// //           </Typography>
// //           <Typography variant="body1" color="text.secondary">
// //             {project.description}
// //           </Typography>
// //         </Box>

// //         <Box sx={{ display: 'flex', gap: 2, mt: { xs: 2, md: 0 } }}>
// //           <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'success.light', color: 'white', borderRadius: 1 }}>
// //             <Typography variant="h6">
// //               {stats.completedTasks}/{stats.totalTasks}
// //             </Typography>
// //             <Typography variant="body2">Tareas completadas</Typography>
// //           </Box>

// //           <Box sx={{ textAlign: 'center', p: 1.5, bgcolor: 'info.main', color: 'white', borderRadius: 1 }}>
// //             <Typography variant="h6">
// //               {stats.completionPercentage}%
// //             </Typography>
// //             <Typography variant="body2">Progreso</Typography>
// //           </Box>
// //         </Box>
// //       </Box>
// //     </Paper>
// //   );
// // };


// import React from 'react';
// import {
//   Box,
//   Typography,
//   Chip,
//   LinearProgress,
//   useTheme
// } from '@mui/material';
// import {
//   CheckCircle,
//   Schedule,
//   TrendingUp
// } from '@mui/icons-material';
// import { Project } from '@/types/types';

// interface ProjectHeaderProps {
//   project: Project;
//   stats: any;
// }

// export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, stats }) => {
//   const theme = useTheme();
  
//   const daysRemaining = Math.ceil(
//     (new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
//   );

//   const getDaysColor = () => {
//     if (daysRemaining <= 0) return 'error';
//     if (daysRemaining < 7) return 'warning';
//     return 'default';
//   };

//   return (
//     <Box 
//       sx={{ 
//         mb: 3,
//         p: 2,
//         backgroundColor: 'rgba(255, 255, 255, 0.7)',
//         backdropFilter: 'blur(10px)',
//         borderRadius: '12px',
//         border: '1px solid',
//         borderColor: 'rgba(255, 255, 255, 0.3)',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
//       }}
//     >
//       {/* Header principal */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
//         <Box sx={{ flex: 1 }}>
//           <Typography 
//             variant="h6" 
//             sx={{ 
//               fontWeight: 600,
//               mb: 0.5,
//               color: 'text.primary',
//               fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//             }}
//           >
//             {project.name}
//           </Typography>
//           <Typography 
//             variant="body2" 
//             color="text.secondary"
//             sx={{ 
//               mb: 1.5,
//               fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//               lineHeight: 1.4
//             }}
//           >
//             {project.description}
//           </Typography>
//         </Box>

//         {/* Stats elegantes */}
//         <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
//           <Chip
//             icon={<CheckCircle sx={{ fontSize: '16px' }} />}
//             label={`${stats.completedTasks}/${stats.totalTasks}`}
//             size="small"
//             variant="filled"
//             sx={{ 
//               fontSize: '0.75rem',
//               fontWeight: 500,
//               backgroundColor: 'rgba(0, 0, 0, 0.04)',
//               border: '0.5px solid rgba(0, 0, 0, 0.1)',
//               height: '28px'
//             }}
//           />
//           <Chip
//             icon={<Schedule sx={{ fontSize: '16px' }} />}
//             label={`${daysRemaining}d`}
//             size="small"
//             color={getDaysColor()}
//             variant="filled"
//             sx={{ 
//               fontSize: '0.75rem',
//               fontWeight: 500,
//               height: '28px'
//             }}
//           />
//         </Box>
//       </Box>

//       {/* Progress Bar estilo macOS */}
//       <Box sx={{ width: '100%' }}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//           <Typography 
//             variant="caption" 
//             color="text.secondary"
//             sx={{ 
//               fontSize: '0.7rem',
//               fontWeight: 500,
//               fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//             }}
//           >
//             Proyecto
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//             <TrendingUp sx={{ fontSize: '14px', color: 'text.secondary' }} />
//             <Typography 
//               variant="caption" 
//               color="text.secondary"
//               sx={{ 
//                 fontSize: '0.7rem',
//                 fontWeight: 600,
//                 fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//               }}
//             >
//               {project.progress}%
//             </Typography>
//           </Box>
//         </Box>
        
//         <LinearProgress
//           variant="determinate"
//           value={project.progress}
//           sx={{
//             height: '6px',
//             borderRadius: '3px',
//             backgroundColor: 'rgba(0, 0, 0, 0.06)',
//             '& .MuiLinearProgress-bar': {
//               borderRadius: '3px',
//               background: 'linear-gradient(90deg, #007AFF 0%, #5856D6 100%)',
//               transition: 'transform 0.4s cubic-bezier(0.65, 0, 0.35, 1)'
//             }
//           }}
//         />
        
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.5 }}>
//           <Typography 
//             variant="caption" 
//             color="text.secondary"
//             sx={{ 
//               fontSize: '0.7rem',
//               fontWeight: 500,
//               fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//             }}
//           >
//             Tareas
//           </Typography>
//           <Typography 
//             variant="caption" 
//             color="text.secondary"
//             sx={{ 
//               fontSize: '0.7rem',
//               fontWeight: 600,
//               fontFamily: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI"',
//             }}
//           >
//             {stats.completionPercentage}% completado
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   );
// };


import React from 'react';
import {
  Box,
  Typography,
  Chip,
  LinearProgress,
  useTheme
} from '@mui/material';
import {
  CheckCircle,
  Schedule,
  TrendingUp
} from '@mui/icons-material';
import { Project } from '@/types/types';

interface ProjectHeaderProps {
  project: Project;
  stats: any;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project, stats }) => {
  const theme = useTheme();
  
  const daysRemaining = Math.ceil(
    (new Date(project.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  const getDaysColor = () => {
    if (daysRemaining <= 0) return 'error';
    if (daysRemaining < 7) return 'warning';
    return 'default';
  };

  return (
    <Box 
      sx={{ 
        mb: 3,
        p: 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 6px 24px rgba(0, 0, 0, 0.05)',
        fontFamily: '"Poppins", "Segoe UI", sans-serif',
      }}
    >
      {/* Header principal */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              mb: 0.5,
              color: theme.palette.text.primary,
              letterSpacing: '0.3px',
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {project.name}
          </Typography>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ 
              mb: 1.5,
              fontFamily: '"Poppins", sans-serif',
              fontSize: '0.9rem',
              lineHeight: 1.6
            }}
          >
            {project.description}
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            icon={<CheckCircle sx={{ fontSize: '16px' }} />}
            label={`${stats.completedTasks}/${stats.totalTasks}`}
            size="small"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: '12px',
              px: 1,
              fontFamily: '"Poppins", sans-serif',
            }}
          />
          <Chip
            icon={<Schedule sx={{ fontSize: '16px' }} />}
            label={`${daysRemaining}d`}
            size="small"
            color={getDaysColor()}
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              borderRadius: '12px',
              px: 1,
              fontFamily: '"Poppins", sans-serif',
            }}
          />
        </Box>
      </Box>

      {/* Progress Section */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Avance del Proyecto
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TrendingUp sx={{ fontSize: '14px', color: 'text.secondary' }} />
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{ 
                fontSize: '0.75rem',
                fontWeight: 600,
                fontFamily: '"Poppins", sans-serif',
              }}
            >
              {project.progress}%
            </Typography>
          </Box>
        </Box>
        
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{
            height: '8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(0,0,0,0.06)',
            '& .MuiLinearProgress-bar': {
              borderRadius: '6px',
              background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
              transition: 'transform 0.4s ease-in-out'
            }
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.8 }}>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 500,
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            Tareas
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary"
            sx={{ 
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: '"Poppins", sans-serif',
            }}
          >
            {stats.completionPercentage}% completado
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
