docker build -t backend_survay .
docker run -p 6022:6022 backend_survay
docker tag backend_survay:latest sidvjsingh/backend_survay:1.0.1
docker push sidvjsingh/backend_survay:1.0.1