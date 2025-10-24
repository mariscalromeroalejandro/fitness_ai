package com.fitness.gateway;

import org.springframework.http.server.reactive.ServerHttpRequest;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;

import com.fitness.gateway.user.UserService;
import com.fitness.gateway.user.RegisterRequest;
import com.nimbusds.jwt.SignedJWT;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class KeycloakUserSyncFilter implements WebFilter {
    private final UserService userService;

    public KeycloakUserSyncFilter(UserService userService) {
        this.userService = userService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String token = exchange.getRequest().getHeaders().getFirst("Authorization");
        String userId = exchange.getRequest().getHeaders().getFirst("X-User-ID");
        RegisterRequest registerRequest = getUserDetails(token);

        if (userId == null) {
            userId = registerRequest.getKeycloakId();
        }

        if (userId != null && token != null) {
            String finalUserId = userId;
            return userService.validateUser(userId)
                .flatMap(exists -> {
                    if (!exists) {
                            if (registerRequest != null) {
                                // log.info("Syncing user from Keycloak: " + registerRequest.getEmail());
                                return userService.registerUser(registerRequest)
                                    .then(Mono.empty());
                            } else {

                                log.info("User not found, consider syncing from Keycloak");
                                return Mono.empty();
                            }
                    } else {
                        log.info("User already exists, skipping sync");
                        return Mono.empty();
                    }
                })
                .then(Mono.defer(() -> {
                    ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                        .header("X-User-ID", finalUserId)
                        .build();
                    return chain.filter(exchange.mutate().request(mutatedRequest).build());
                }));
        }
        return chain.filter(exchange);
    }

    private RegisterRequest getUserDetails(String token) {
        try {
            String tokenWithoutBearer = token.replace("Bearer ", "").trim();
            SignedJWT signedJWT = SignedJWT.parse(tokenWithoutBearer);
            JWTClaimsSet claims = signedJWT.getJWTClaimsSet();

            RegisterRequest request = new RegisterRequest();
            request.setEmail(claims.getStringClaim("email"));
            request.setKeycloakId(claims.getStringClaim("sub"));
            request.setPassword("defaultPassword123"); 
            request.setFirstName(claims.getStringClaim("given_name"));
            request.setLastName(claims.getStringClaim("family_name"));
            return request;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
