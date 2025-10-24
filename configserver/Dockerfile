# Use OpenJDK 21 as base image (since the pom.xml specifies Java 25, but we'll use the closest stable version)
FROM openjdk:21-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml first (for better Docker layer caching)
COPY mvnw .
COPY mvnw.cmd .
COPY .mvn .mvn
COPY pom.xml .

# Make Maven wrapper executable
RUN chmod +x ./mvnw

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the port that the config server runs on
EXPOSE 8888

# Set the startup command
CMD ["java", "-jar", "target/configserver-0.0.1-SNAPSHOT.jar"]