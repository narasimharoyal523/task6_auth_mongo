# 🔐 Task 6: MongoDB Integration and User Authentication

**Level:** Advanced  
**Objective:**  
- Connect to a real MongoDB database  
- Secure user credentials using bcrypt hashing  
- Generate JWT tokens for authenticated access  
- Protect private routes using middleware

---

## 🛠 Technologies Used

- Node.js + Express.js
- MongoDB + Mongoose
- bcryptjs (password hashing)
- jsonwebtoken (JWT auth)
- EJS
- Body-parser

---

## 📁 Project Structure

task6_auth_mongo/ ├── views/ │ ├── register.ejs │ └── login.ejs ├── server.js ├── package.json

---

## 🎯 Features

- User **registration with hashing**
- **Login system** with credential check
- Generate JWT on successful login
- Protect `/profile` route using middleware
- Display user ID when authenticated

---

## 🧪 How It Works

- **Register**: Hash password and store in MongoDB  
- **Login**: Verify hash and generate token  
- **Profile**: Use token from Authorization header

---

## ⚙️ How to Run

1. Ensure **MongoDB is running**:
   ```bash
   mongod
2. Run the server:
   ```bash
   node server.js
3. Visit in browser:
   ```arduino
   http://localhost:3000/
🔑 Example Flow
Register at /register

Login at /login → get JWT token
