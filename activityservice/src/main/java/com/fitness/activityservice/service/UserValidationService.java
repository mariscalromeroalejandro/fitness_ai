package com.fitness.activityservice.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserValidationService {

    private final WebClient.Builder webClientBuilder;

    public boolean validateUser(String userId) {
    try {
        Boolean response = webClientBuilder.build()
        .get()
        .uri("http://user-service/api/users/{userId}/validate", userId)
        .retrieve()
        .bodyToMono(Boolean.class)
        .block();

    return Boolean.TRUE.equals(response);
    } catch (WebClientResponseException e) {
        System.err.println("WebClient error while validating user " + userId + ": " + e.getStatusCode());
            return false;
    } catch (Exception e) {
            System.err.println("Unexpected error validating user " + userId + ": " + e.getMessage());
            return false;
        }
}

}
