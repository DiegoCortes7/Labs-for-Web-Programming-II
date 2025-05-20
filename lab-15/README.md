# Lab 15 - Using Cookies and Sessions in Node.js

This lab demonstrates how to use cookies and sessions in a Node.js app with Express.

## Routes Overview

- `/` - Home page
- `/set-cookie` - Sets a cookie `username=student`
- `/get-cookie` - Reads the `username` cookie
- `/delete-cookie` - Deletes the cookie
- `/login` - Starts a session with username `student`
- `/profile` - Displays session info (if logged in)
- `/logout` - Ends the session and clears the cookie

## Screenshots

Here are the results of visiting each route:

| Route         | Screenshot         |
|---------------|--------------------|
| `/`           | ![home](./screenshots/home.png) |
| `/set-cookie` | ![set-cookie](./screenshots/set-cookie.png) |
| `/get-cookie` | ![get-cookie](./screenshots/get-cookie.png) |
| `/login`      | ![login](./screenshots/login.png) |
| `/profile`    | ![profile](./screenshots/profile.png) |
| `/logout`     | ![logout](./screenshots/logout.png) |