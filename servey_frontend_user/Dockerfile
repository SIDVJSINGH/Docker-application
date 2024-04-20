# Stage 1: Build the Angular applications
FROM node:20 as builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Stage 2: Setup httpd and serve the applications
FROM httpd:alpine

# Copy built Angular applications from the previous stage into the httpd HTML directory
WORKDIR /usr/local/apache2/htdocs
COPY --from=builder /app/dist/survey-user .


# Expose port 80
EXPOSE 80

# Command to start httpd
CMD ["httpd", "-D", "FOREGROUND"]
