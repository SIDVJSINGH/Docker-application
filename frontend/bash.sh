docker build -t my-angular-app .
docker run -p 80:80 my-angular-app
docker tag my-angular-app:latest sidvjsingh/angular-frontend:1.0.1
docker push sidvjsingh/angular-frontend:1.0.1