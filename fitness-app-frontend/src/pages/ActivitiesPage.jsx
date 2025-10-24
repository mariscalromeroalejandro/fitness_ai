import { Box } from '@mui/material';
import React from 'react';
import ActivityForm from '../components/ActivityForm';
import ActivityList from '../components/ActivityList';

const ActivitiesPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        <ActivityForm onActivitiesAdded = { () => window.location.reload() } />
        <ActivityList />
    </Box>)
};

export default ActivitiesPage;