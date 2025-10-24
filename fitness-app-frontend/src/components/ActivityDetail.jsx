import { useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { getActivityRecommendation } from "../services/API";
import { Card, CardContent, Typography } from "@mui/material";
import { ActivityTypesEmojiMap } from "../enums/activityTypes.enum";
import { Recommendation } from "./Recommendation";

const ActivityDetail = () => {
  const { id: activityId } = useParams();
  const location = useLocation();
  const activity = location.state?.activity;

  const [recommendation, setRecommendation] = useState(null);

  useEffect(() => {
    const fetchActivityDetail = async () => {
      try {
        const response = await getActivityRecommendation(activityId);
        setRecommendation({
          recommendation: response.data.recommendation,
          improvements: response.data.improvements,
          suggestions: response.data.suggestions,
          safety: response.data.safety
        });
      } catch (error) {
        console.error(error)
      }
    }
    fetchActivityDetail();
  }, [activityId]);

  if (!activity) {
    return <Typography>Loading...</Typography>
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Typography variant="h4" component="h2" sx={{ mb: 3, textAlign: 'center' }}>
        Activity Detail
      </Typography>
      <Card sx={{ boxShadow: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h3" sx={{ mb: 2, color: 'primary.main' }}>
            {activity.type} {ActivityTypesEmojiMap[activity.type]}
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            🕒 Duration: {activity.duration} minutes
          </Typography>
          <Typography variant="h6" sx={{ mb: 1 }}>
            🥵 Calories burned: {activity.caloriesBurnt} kcal
          </Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>
            📅 Date: {new Date(activity.createdAt).toLocaleDateString()} at: {new Date(activity.createdAt).toLocaleTimeString()}
          </Typography>
          {recommendation ? 
          <Recommendation recommendation={recommendation} />
          : (
            <Typography variant="body1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
              No recommendation available.
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityDetail;
