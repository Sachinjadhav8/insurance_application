# Use Java 17 runtime
FROM eclipse-temurin:17-jdk-jammy

# App directory
WORKDIR /app

# Copy jar
COPY target/insurance-backend-1.0.0.jar app.jar

# Expose backend port
EXPOSE 8080

# Run app
ENTRYPOINT ["java","-jar","app.jar"]

