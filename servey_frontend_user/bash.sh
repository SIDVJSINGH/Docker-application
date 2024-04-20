docker build -t my-angular-app .
# docker run -p 80:80 my-angular-app
docker tag my-angular-app:latest sidvjsingh/angular-frontend:1.0.4
docker push sidvjsingh/angular-frontend:1.0.4

# docker run -d -p 80:80 sidvjsingh/angular-frontend:1.0.4
# docker run -d -p 6022:6022 sidvjsingh/backend_survay:	1.0.1