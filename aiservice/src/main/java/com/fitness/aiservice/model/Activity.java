package com.fitness.aiservice.model;

import java.time.LocalDateTime;
import java.util.Map;

import lombok.Data;

@Data
public class Activity {
    private String id;
    private String type;
    private String userId;
    private Integer duration;
    private Integer caloriesBurnt;
    private LocalDateTime startTime;
    private Map<String, Object> additionalMetrics;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
