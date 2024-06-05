## Description

Project for my diploma

## Getting started
Download Docker Desktop for [Mac](https://desktop.docker.com/mac/main/amd64/Docker.dmg?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=module) , [Linux](https://docs.docker.com/desktop/linux/install/) and [Windows](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe?utm_source=docker&utm_medium=webreferral&utm_campaign=dd-smartbutton&utm_location=header). Docker Compose will be automatically installed. 

Create .env file inside of "server" folder with these lines:
```
JWT_SECRET=your_jwt_secret
DB_HOST='your_host'
DB_PORT=your_port
DB_USERNAME='your_username'
DB_PASSWORD='your_password'
DB_NAME='your_db'
OPENAI_API_KEY=your_openai_api_key_here
```

```
docker compose up -d –build
```

## Features

You can create new data for your dashboards, and make ChatGPT to analyze it