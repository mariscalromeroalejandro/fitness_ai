package com.fitness.aiservice.service;


import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fitness.aiservice.model.Activity;
import com.fitness.aiservice.model.Recommendation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ActivityAIService {
    private final GeminiService geminiService;

    public Recommendation generateRecommendation(Activity activity) {
        String prompt = createPromptForActivity(activity);
        String aiResponse = geminiService.getAnswer(prompt);
        return processAiResponse(activity, aiResponse);        
    }

    private Recommendation processAiResponse(Activity activity, String aiResponse) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(aiResponse);
            JsonNode textNode = rootNode
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text");

            String jsonContent = textNode.asText()
                    .replaceAll("```json\\n", "")
                    .replaceAll("\\n```", "")
                    .trim();
            JsonNode analysisJson = mapper.readTree(jsonContent);
            JsonNode analysisNode = analysisJson.path("analysis");
            StringBuilder fullAnalysis = new StringBuilder();
            analysisNode.fieldNames().forEachRemaining(key -> {
                String value = analysisNode.path(key).asText();
                if (!value.isBlank()) {
                    String prefix = key.substring(0, 1).toUpperCase() + key.substring(1) + ": ";
                    addAnalysisSection(fullAnalysis, analysisNode, key, prefix);
                }
            });
            List<String> improvements = extractKeyValueList(analysisJson.path("improvements"), "area", "recommendation");
            List<String> suggestions = extractKeyValueList(analysisJson.path("suggestions"), "workout", "description");
            List<String> safety = extractSafetyGuidelines(analysisJson.path("safety"));

            return Recommendation.builder()
            .activityId(activity.getId())
            .userId(activity.getUserId())
            .activityType(activity.getType())
            .recommendation(fullAnalysis.toString().trim())
            .improvements(improvements)
            .suggestions(suggestions)
            .safety(safety)
            .build();

        } catch (Exception e) {
            log.error("Error processing AI response: {}", e.getMessage());
            return createDefaultRecommendation(activity);
        }
    }

    private Recommendation createDefaultRecommendation(Activity activity) {
            return Recommendation.builder()
            .activityId(activity.getId())
            .userId(activity.getUserId())
            .activityType(activity.getType())
            .recommendation("AI analysis unavailable. Please try again later.")
            .improvements(List.of("No specific recommendations provided."))
            .suggestions(List.of("No specific suggestions provided."))
            .safety(List.of("No specific safety guidelines provided."))
            .build();
    }
    
    private List<String> extractKeyValueList(JsonNode arrayNode, String keyField, String valueField) {
        List<String> result = new ArrayList<>();
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                String key = node.path(keyField).asText();
                String value = node.path(valueField).asText();
                if (!key.isBlank() && !value.isBlank()) {
                    result.add(String.format("%s: %s", key, value));
                }
            }
        }
        return result.isEmpty() ? List.of("No specific recommendations provided.") : result;
    }
    
    private List<String> extractSafetyGuidelines(JsonNode safetyNode) {
        List<String> safety = new ArrayList<>();
        if (safetyNode.isArray()) {
            for (JsonNode node : safetyNode) {
                String point = node.asText();
                if (!point.isBlank()) {
                    safety.add(point);
                }
            }
        }
        return safety.isEmpty() ? List.of("No specific safety guidelines provided.") : safety;
    }

    private void addAnalysisSection(StringBuilder fullAnalysis, JsonNode analysisNode, String key, String prefix) {
        if (!analysisNode.path(key).isMissingNode()) {
            fullAnalysis.append(prefix)
            .append(analysisNode.path(key).asText())
                    .append("\n\n");
        }
    }

    private String createPromptForActivity(Activity activity) {
        return String.format(
            """
            Analyze this fitness activity and provide detailed recommendations in the following EXACT JSON format:
            {
                "analysis": {
                    "overall": "Overall analysis here",
                    "pace": "Pace analysis here",
                    "heartRate": "Heart rate analysis here",
                    "caloriesBurnt": "Calories burned analysis here"
                },
                "improvements": [
                    {
                        "area": "Area to improve",
                        "recommendation": "Specific suggestion for improvement"
                    }
                ],
                "suggestions": [
                    {
                        "workout": "Workout name",
                        "description": "Detailed workout description"
                    }
                ],
                "safety": [
                    "Safety point 1",
                    "Safety point 2"
                ]
            }
            Analyze this activity:
            Activity type: %s
            Duration: %d minutes
            Calories Burnt: %d
            Additional metrics: %s

            Provide detailed analysis focusing on performance, improvements, next workout.
            Ensure response follows the EXACT JSON format shown above
            """,
            activity.getType(),
            activity.getDuration(),
            activity.getCaloriesBurnt(),
            activity.getAdditionalMetrics()
        );
    }
}
