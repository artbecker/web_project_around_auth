# Around the U.S. - Authentication Project

A travel photography sharing platform built with React, featuring user authentication, photo uploads, and social interactions.

## 🌟 Features

- **User Authentication**: Complete registration and login system
- **Photo Management**: Upload, view, and delete travel photos
- **Social Interactions**: Like photos from other users
- **Profile Management**: Edit user profile information
- **Responsive Design**: Optimized for desktop and mobile devices
- **Form Validation**: Real-time validation for all user inputs

## 🛠️ Technologies Used

- **Frontend**: React.js, HTML5, CSS3
- **Routing**: React Router
- **API Integration**: RESTful API consumption
- **Authentication**: JWT tokens
- **Styling**: CSS Modules/BEM methodology

## 🔐 Authentication Flow

- **Users must register/login** to access the main application
- **Protected routes** redirect unauthenticated users to login
- **JWT tokens** are used for API authentication
- **Automatic token validation** and refresh

## 🌐 API Integration

**The application connects to TripleTen's backend services:**

- **Base URL:** https://se-register-api.en.tripleten-services.com/v1
- **Authentication endpoints:** /signup, /signin
- **Protected routes require Authorization:** Bearer {token} header

## 📄 License

This project is part of the **TripleTen Web Development Program**.

## 📝 Nota ao revisor

Deixei **lang="en"** pois fiz todo o projeto em inglês, incluindo os títulos, campos de formulário e mensagens de erro.

# https://artbecker.github.io/web_project_around_auth/
