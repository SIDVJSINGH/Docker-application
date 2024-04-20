# Stage 1: Build the Angular applications
FROM node:20 as builder

WORKDIR /app

COPY admin_panel /app/admin_panel
COPY servey_frontend_user /app/servey_frontend_user

# Build admin_panel
WORKDIR /app/admin_panel
RUN npm install
RUN npm run build

# Switch back to the original working directory
WORKDIR /app

# Build servey_frontend_user
WORKDIR /app/servey_frontend_user
RUN npm install
RUN npm run build

# Stage 2: Setup httpd and serve the applications
FROM httpd:alpine

# Copy built Angular applications from the previous stage into the httpd HTML directory
WORKDIR /usr/local/apache2/htdocs

COPY --from=builder /app/admin_panel/dist/survey-admin ./survey-admin
COPY --from=builder /app/servey_frontend_user/dist/survey-user ./survey-user

# Copy custom httpd configuration file
COPY httpd.conf ./conf/httpd.conf

# Expose port 80
EXPOSE 80

# Command to start httpd
CMD ["httpd", "-D", "FOREGROUND"]
