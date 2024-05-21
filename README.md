## Description

URL Denzel shortener - a link shortener that makes long URLs shorter with fewer characters than the original link, while also making link management convenient: you can save a link as a bookmark (liked an article) and return to it later or share it with a friend by providing a QR code.

Additionally, the shortener helps marketing companies collect necessary data for analytics (number of link clicks, number of unique users, etc.).

## Getting started


## Shortening the new link

You can use ```curl``` command to shorten the link:


```
 curl -XPOST -d "url=https://google.com" localhost:3001/api/shorten
```

Here's the response:


```
 {"hash":"http://localhost:3001/api/shorten/q0rwl"}
```

Open a web browser and visit ```http://localhost:3000/api/shorten/q0rwl``` to access the official Google website.