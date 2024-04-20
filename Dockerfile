# Stage 1: Build the Angular applications
FROM node:20 as builder

# Create directories for each application
RUN mkdir -p /app/admin_panel /app/servey_frontend_user

# Copy application source code
COPY admin_panel /app/admin_panel
COPY servey_frontend_user /app/servey_frontend_user

# Build admin_panel
WORKDIR /app/admin_panel
RUN npm install
RUN npm run build

# Build servey_frontend_user
WORKDIR /app/servey_frontend_user
RUN npm install
RUN npm run build

# Stage 2: Setup Nginx and serve the applications
FROM nginx:alpine

# Copy built Angular applications from the previous stage into the Nginx HTML directory
COPY --from=builder /app/admin_panel/dist/survey-admin /usr/share/nginx/html/admin_panel
COPY --from=builder /app/servey_frontend_user/dist/survey-user /usr/share/nginx/html/servey_frontend_user

# Copy Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to start Nginx
CMD ["nginx", "-g", "daemon off;"]
