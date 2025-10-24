import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { addActivity } from "../services/API";



const ActivityForm = ({onActivitiesAdded}) => {
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await addActivity(activity);
            onActivitiesAdded();
            setActivity({type: "RUNNING", duration: '', caloriesBurnt: ''})
        } catch (error) {
            console.error("Error adding activity:", error);
        }
    };

    const [activity, setActivity] = useState({
        type: "RUNNING",
        duration: '',
        caloriesBurnt: '',
        additionalMetrics: {}
    })


    return (
        <Box 
            component="form" 
            sx={{ 
                p: 3, 
                border: '1px solid #e0e0e0', 
                borderRadius: 2,
                backgroundColor: '#fafafa',
                maxWidth: 400,
                margin: '0 auto'
            }} 
            onSubmit={handleSubmit}
        >
            <FormControl fullWidth sx={{ mb: 2 }}> 
                <InputLabel id="activity-type-label">Activity Type</InputLabel>
                <Select
                    sx={{ marginTop: 1 }}
                    labelId="activity-type-label"
                    value={activity.type}
                    onChange={(e) => setActivity({ ...activity, type: e.target.value })}
                >
                    <MenuItem value="RUNNING">Running</MenuItem>
                    <MenuItem value="CYCLING">Cycling</MenuItem>
                    <MenuItem value="SWIMMING">Swimming</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Duration (minutes)"
                type="number"
                value={activity.duration}
                onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
            />
            <TextField
                label="Calories Burned"
                type="number"
                value={activity.caloriesBurnt}
                onChange={(e) => setActivity({ ...activity, caloriesBurnt: e.target.value })}
                fullWidth
                sx={{ mb: 2 }}
                variant="outlined"
            />
            <Button 
                type="submit" 
                variant="contained" 
                fullWidth
                sx={{ 
                    mt: 1,
                    py: 1.5,
                    fontWeight: 'bold'
                }}
            >
                Add Activity
            </Button>
        </Box>
    )
}

export default ActivityForm;