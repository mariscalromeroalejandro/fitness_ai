package com.fitness.gateway.user;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import com.fitness.gateway.user.RegisterRequest;

import reactor.core.publisher.Mono;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final WebClient userServiceWebClient;

    public Mono<Boolean> validateUser(String userId) {
        return userServiceWebClient
                .get()
                .uri("http://user-service/api/users/{userId}/validate", userId)
                .retrieve()
                .bodyToMono(Boolean.class)
                .onErrorResume(WebClientResponseException.class, ex -> {
                    if (ex.getStatusCode() == HttpStatus.NOT_FOUND)
                        return Mono.error(new RuntimeException("User not found: " + userId));
                    else if (ex.getStatusCode() == HttpStatus.BAD_REQUEST)
                        return Mono.error(new RuntimeException("Invalid Request: " + userId));
                    return Mono.error(new RuntimeException("Unexpected error: " + ex.getMessage()));
                });
    }
    
    public Mono<UserResponse> registerUser(RegisterRequest request) {
        return userServiceWebClient
                .post()
                .uri("/api/users/register")
                .bodyValue(request)
                .retrieve()
                .bodyToMono(UserResponse.class)
                .onErrorResume(WebClientResponseException.class, ex -> {
                    if (ex.getStatusCode() == HttpStatus.BAD_REQUEST) return Mono.error(new RuntimeException("Invalid registration data"));
                    else if (ex.getStatusCode() == HttpStatus.INTERNAL_SERVER_ERROR) return Mono.error(new RuntimeException("User service error"));
                    return Mono.error(new RuntimeException("Unexpected error: " + ex.getMessage()));
                });
    }
}
