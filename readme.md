# 📚 Library Management API

A RESTful API built using **Express**, **TypeScript**, and **MongoDB** (Mongoose) to manage books in a library system.

---

## 🚀 Features

- Add, update, delete books
- Filter, sort, and search books
- Borrow books with business logic validation
- Aggregated borrow summary per book
- Mongoose schema validation, middleware, static methods

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** MongoDB with Mongoose ODM
- **Validation:** Mongoose schema validation + business logic

---

## 📂 Folder Structure

src/
│
├── models/ # Mongoose models (Book, Borrow)
├── controllers/ # Route handler logic
├── utils/ # Utility functions/methods
├── middlewares/ # Custom middlewares
├── app.ts # Express app setup
└── server.ts # App server entry point