# 📝 [MyBlog](https://myblog-production-f5c3.up.railway.app/)

MyBlog is a full-stack blogging platform built using **Node.js, Express, MongoDB, and EJS**.  
The application focuses on secure authentication, user-owned content, and clean backend architecture.

---

### 🚀 Live Demo

- The application is deployed
- [ClickMe](https://myblog-production-f5c3.up.railway.app/) to view the live demo 

---

## ✨ What this project does

- 👤 Allows users to create an account and authenticate securely  
- 🔒 Ensures only signed-in users can create blogs  
- 🧾 Restricts delete actions to content owners and admins
- 🗄️ Stores all data using structured MongoDB schemas  

---

## 🚀 Core Features

### 🔐 Authentication & Access Control
- Password hashing with salt  
- JWT-based authentication  
- Login and logout functionality  
- Middleware-protected routes  
- Unauthorized users cannot create blogs or comments  

---

### ✍️ Blogs
- Create blog posts with title and content and cover image
- Delete blogs **only if you are the creator or the admin**  
- Ownership checks enforced on the server  

---

### 💬 Comments
- Add comments on blog posts  
- Comments are linked to authenticated users  
- Anonymous commenting is restricted  

---

### 👤 User Management
- Users can delete their own account  
- Sessions are invalidated on logout  

---

## 🛠️ Tech Stack
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT  
- **Templating:** EJS  

---

## 📁 Project Structure
```
controllers/
middlewares/
models/
routes/
services/
views/
public/
app.js
package.json
package-lock.json
.env
.gitignore
```

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone <repository-url>
cd BLOG
```

### 2️⃣ Install dependencies
```bash
Copy code
npm install
```

### 3️⃣ Configure environment variables
```bash
Create a .env file in the root directory:
PORT=your_port
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Start the server
```bash
npm start
Open in browser:
http://localhost:PORT
```

## 🔗 API Endpoints

---

### 🔐 Authentication

- Authentication is handled using JWT stored in cookies, with middleware-based user resolution.

```bash
POST /user/signup
```
Register a new user

```bash
POST /user/signin
```
Authenticate user and create session

```bash
GET /user/logout
```
Logout the current user

---

### 📝 Blogs
```bash
GET /
```
Fetch and display all blogs (homepage)

```bash
GET /blog/add-new
```
Render add blog form (authenticated users only)

```bash
GET /blog/:id
```
Fetch a specific blog along with its comments

```bash
POST /blog
```
Create a new blog with optional cover image upload

```bash
DELETE /blog/:id
```
Delete a blog (author or admin only)

---

### 💬 Comments
```bash
POST /blog/comment/:id
```
Add a comment to a specific blog

```bash
DELETE /blog/comment/:commentId
```
Delete a comment (comment author, blog owner, or admin only)

-----


## 🔍 How access is enforced
- 🚫 Blogs cannot be created without authentication
- 🛑 Users cannot delete blogs they do not own
- 🧠 Middleware validates JWT on protected routes
- 🔐 Passwords are never stored in plain text

## 🔮 Possible Improvements
- Edit blog functionality
- Upvote and Downvote
- View Blogs By Various Filters
- User Profiles
- Search optimization
- Admin moderation tools

## 🧾 License

### MIT License © 2025 Anjali Mittal  
-----

Made with ❤️ by [Anjali Mittal](https://github.com/Anjali-Mittal)
