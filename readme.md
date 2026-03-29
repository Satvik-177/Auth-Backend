# Backend Authentication System

A RESTful backend application built using Node.js, Express, and MongoDB with JWT-based authentication and middleware architecture.

## Tech Stack
- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- bcrypt (Password hashing)

## Features
- User Registration & Login
- JWT-based Authentication
- Protected Routes
- Middleware-based Architecture
- Centralized Error Handling

## Folder Structure

src/
 ├── controllers/
 ├── models/
 ├── routes/
 ├── middlewares/
 ├── config/

 ## API Endpoints

### Auth Routes
- POST /api/auth/register
- POST /api/auth/login

### User Routes
- GET /api/users/profile (Protected)

## Authentication Flow

<<<<<<< HEAD
1. User registers → data stored in DB
2. User logs in → JWT token generated
3. Token sent in headers for protected routes
4. Middleware verifies token and allows access
=======
### 🔥 When to use try-catch?

👉 Use it where errors are thrown **synchronously** or with `async/await`.

---

### ✅ 1. Synchronous Code

```js
try {
    let data = JSON.parse('invalid json');
} catch (err) {
    console.log("Error caught:", err.message);
}
```

**Use cases:**

* JSON parsing
* Calculations
* Direct function calls

---

### ✅ 2. With async/await (Most Important)

```js
try {
    const user = await User.findById(id);
} catch (err) {
    console.log("DB error:", err);
}
```

**Use cases:**

* Database operations
* API calls
* File handling
* bcrypt hashing

---

### ❌ 3. Where try-catch does NOT work

```js
try {
    setTimeout(() => {
        throw new Error("Error inside async");
    }, 1000);
} catch (err) {
    console.log("This will NOT catch the error");
}
```

👉 Reason: Error occurs in a different async callback scope.

---

### 🧠 Rule

👉 *"An error must be thrown in the same scope where try-catch is defined."*

---

## 🔹 HTTP Status Codes

| Code | Meaning                                |
| ---- | -------------------------------------- |
| 200  | OK – Request successful                |
| 201  | Created – Resource created             |
| 400  | Bad Request – Invalid client data      |
| 401  | Unauthorized – Authentication required |
| 403  | Forbidden – Access denied              |
| 404  | Not Found – Resource does not exist    |
| 500  | Internal Server Error – Server failure |

---

## 🔹 Async/Await Usage

Used for:

* Database operations
* API calls
* File operations
* Password hashing (bcrypt)

---

## 🔹 Bcrypt (Password Hashing)

* Adds **random salt** to password
* Performs multiple hashing rounds

👉 Same password produces different hashes every time

| Salt Rounds | Effect              |
| ----------- | ------------------- |
| 5–8         | Faster, less secure |
| 10–12       | Industry standard   |
| 12–15       | Slower, more secure |

---

## 🔹 Controller Error Handling

A single try-catch (or asyncHandler) can handle all errors in async controllers.

```text
Error → catch → 500 Internal Server Error
```

---

## 🔹 Register API Flow

```text
Client (POST /register)
        ↓
express.json()
        ↓
Controller
        ↓
Extract data
        ↓
Check user exists
        ↓
[Exists?]
   ↙        ↘
Yes          No
↓            ↓
Error        Hash password
             ↓
        Save user
             ↓
        Send response
```

---

## 🔹 Register vs Login

| Register         | Login             |
| ---------------- | ----------------- |
| Creates user     | Verifies user     |
| Saves to DB      | Fetches from DB   |
| Hashes password  | Compares password |
| No JWT (usually) | Generates JWT     |

---

## 🔐 Authentication & JWT

### Step 1: Signup

* Store user data in DB
* Hash password

---

### Step 2: Login

* Verify credentials
* Generate JWT token

---

## 🔑 JWT Structure

```
HEADER.PAYLOAD.SIGNATURE
```

### Example Payload

```json
{
  "id": "user_id",
  "iat": 1700000000,
  "exp": 1700259200
}
```

---

## 🔐 Signature Concept

```
SIGNATURE = hash(Header + Payload + SECRET_KEY)
```

👉 Only server knows the secret key

---

## 🔍 JWT Verification Flow

```text
Client → Request with token
        ↓
Server → Verify token
        ↓
Extract user ID
        ↓
Fetch user from DB
        ↓
Allow access
```

---

## 🔄 Complete Flow

1. Signup → User stored in DB
2. Login → JWT generated
3. Client stores token
4. Future requests include token
5. Server verifies token and fetches user

---

## 🔥 Key Concepts

### Authentication vs Authorization

* Authentication → Login verification
* Authorization → Access control based on role/token

---

### Why use ID?

* Unique
* Fast lookup
* Lightweight payload

---

### Why not send email/password repeatedly?

* Insecure ❌
* Heavy ❌
* JWT already proves identity ✔

---

### Response Best Practices

* Send: id, name, email
* Never send password ❌

---

## 🔹 Routes vs Controllers

* Routes → Entry points (API endpoints)
* Controllers → Business logic

---

## 🔐 Auth Middleware Flow

```text
Request (with token)
        ↓
Extract token from header
        ↓
Verify JWT
        ↓
Extract ID
        ↓
Fetch user from DB
        ↓
Attach user to req.user
        ↓
next()
```

---

## 🔐 Protected Routes

👉 Accessible only by authenticated users

```text
Request → Auth Middleware → Controller → Response
```

---

## 🔹 Async Error Flow (Production Level)

```text
Error → throw Error()
        ↓
asyncHandler
        ↓
next(err)
        ↓
errorMiddleware
        ↓
Response
```

---

## 💯 Final Summary

* Signup → Create user
* Login → Verify password + generate JWT
* JWT → Identity proof
* Token used in every request
* Server verifies token and fetches user

---

## 🔥 One-line Master Formula

👉 Login = Password Verification
👉 JWT = Identity Proof
👉 ID = Fast DB Lookup

---

## 💣 One-line Concepts

* asyncHandler → Catches errors
* errorMiddleware → Handles errors
* protect middleware → Verifies authentication



## Multer

Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. 

Global middleware -> No
Local middlware -> Yes , so no need to use app.use()


---

END OF DOCUMENT
>>>>>>> fd3d6a7 (feat: added file upload functionality using multer with protected route)

--------------------------------------------------------
## "Morgan = automatic request logger for debugging and monitoring APIs"

👉 "Morgan logs every request coming to your server"

🔥 Other formats of morgan

Format	        Use
"dev"	        short + colored (development)
"combined"	detailed logs (production)
"tiny"	        very minimal
"common"	standard Apache logs

---------------------------------------------------------

## RATE LIMITER

💣 Real problem

👉 agar rate limiting na ho:

Ek user → 1000 requests/sec 💀

👉 result:

server slow
crash
brute force attack

🔥 Internally kya hota hai?

👉 maan le ek user request bhejta hai:

IP: 192.168.1.1

🔁 Step-by-step flow

Request aayi
   ↓
Rate limiter middleware chala
   ↓
IP check kiya
   ↓
Is IP ka count nikala
   ↓
[Condition]
   ↓
✔ limit ke andar → allow
❌ limit cross → block (429)

👉 express-rate-limit internally karta hai:

store = {
  "192.168.1.1": {
    count: 5,
    firstRequestTime: timestamp
  }
}

🚀 Real-world use

login API → brute force rokna
public APIs → spam control
payment APIs → security