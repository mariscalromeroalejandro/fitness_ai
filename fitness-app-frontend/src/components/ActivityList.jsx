import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getActivities } from "../services/API";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { ActivityTypesEmojiMap, ActivityTypes } from "../enums/activityTypes.enum";

const ActivityList = () => {

  const [activities, setActivities] = React.useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const fetchedActivities = await getActivities();
      setActivities(fetchedActivities.data);
    } catch (error) {
      console.error("Error fetching activities: ", error);
    }
  }
  useEffect(() => { 
    fetchActivities();
    console.log("Activities: ", activities)
  }, [])

  return (
    <div>
      <Typography variant="h4" sx={{ padding: 2 }}>
        Your Activities
      </Typography>
    <Grid container spacing={3} sx={{ padding: 2 }}>
      {activities?.map((activity) => (
        <Grid item xs={12} sm={6} md={4} key={activity.id}>
          <Card 
            sx={{ 
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 3
              }
            }}
            onClick={() => navigate(`/activities/${activity.id}`, { state: { activity } })}
          >
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                {ActivityTypesEmojiMap[activity.type] || '🏃'} {activity.type}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>
                ⏱️ Duration: {activity.duration} minutes
              </Typography>
              <Typography variant="body1" color="text.secondary">
                🔥 Calories: {activity.caloriesBurnt} kcal
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    </div>
  );
};

export default ActivityList;
