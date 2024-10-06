# Credit Sea Assignment

## Overview

This is a loan management system built with a modern tech stack, enabling **users** to create loans, **verifiers** to update loan statuses, and **admins** to manage all users, verifiers, and loans. The system is designed to streamline the loan approval process by assigning verifiers to handle loan requests and allowing admins to oversee the entire workflow.

The frontend is built using **Vite + React + TypeScript**, while the backend uses **Node.js + TypeScript**, both powered by **Bun** for fast performance. The UI utilizes **Material-UI** and **Tailwind CSS** for styling.

---

## Roles and Permissions

1. **User**:
   - **Create Loans**: A user can create a loan request by providing necessary details like the loan amount, tenure, employment status, etc.
   - **View Loan Status**: Users can see the status of their loan request (e.g., pending, approved, verified, or rejected).

2. **Verifier**:
   - **Assigned to Loans**: Verifiers are appointed to specific loans for review.
   - **Update Loan Status**: Verifiers can change the loan status from `pending` to either `approved`, `rejected`, or `verified` based on their evaluation.

3. **Admin**:
   - **Manage Verifiers**: Admins can create, edit, and manage verifiers.
   - **View All Users and Loans**: Admins have access to a list of all loan applicants (users) and their loans.
   - **Manage Loan Status**: Admins can view and track the status of all loans.

---

## Features

### **1. User Features:**
- **Loan Application**: Users can apply for loans by entering personal, financial, and employment information.
- **Loan Tracking**: Users can track the progress of their loan application (e.g., whether it's `pending`, `approved`, `rejected`, or `verified`).

### **2. Verifier Features:**
- **Assigned Loans**: Verifiers are automatically assigned to loans and can update the status after reviewing them.
- **Status Update**: The verifier can update the loan status to either `approved`, `verified`, or `rejected`.

### **3. Admin Features:**
- **View All Loans and Users**: Admins can view details of all loans and borrowers, including the current loan status.
- **Verifier Management**: Admins can add or remove verifiers and assign them to loans for review.

---

## API Documentation

### **1. Create User (Registration)**

- **Endpoint**: `POST /api/auth/register`
- **Description**: Registers a new user (default role: `user`).
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "123-456-7890",
    "address": "123 Main St",
    "password": "securepassword"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "user": {
      "id": "userId",
      "role": "user"
    }
  }
  ```

### **2. Create Loan**

- **Endpoint**: `POST /api/user/loans`
- **Description**: Allows a user to create a loan request.
- **Request Body**:
  ```json
  {
    "fullName": "John Doe",
    "amount": 10000,
    "tenure": 12,
    "employmentStatus": "employed",
    "reason": "Personal Loan",
    "employmentAddress1": "123 Main St",
    "employmentAddress2": "Suite 456",
    "termsAccepted": true,
    "creditInfoDisclosure": true
  }
  ```
- **Response**:
  ```json
  {
    "message": "Loan created successfully",
    "loan": {
      "id": "loanId",
      "status": "pending"
    }
  }
  ```

### **3. Update Loan Status**

- **Endpoint**: `POST /api/verifier/loans/status`
- **Description**: Allows a verifier or admin to update the status of a loan.
- **Request Body**:
  ```json
  {
    "loanId": "loanId",
    "status": "approved" // or "pending", "rejected", "verified"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Loan status updated",
    "loan": {
      "id": "loanId",
      "status": "approved"
    }
  }
  ```

### **4. View Loans**

- **Endpoint**: `GET /api/admin/loans`
- **Description**: Retrieves a list of all loans for an admin.
- **Response**:
  ```json
  [
    {
      "id": "loanId",
      "fullName": "John Doe",
      "amount": 10000,
      "status": "pending",
      "assignedVerifier": {
        "id": "verifierId",
        "name": "Verifier Name"
      }
    }
  ]
  ```
### **5. View Loans**

- **Endpoint**: `GET /api/verifier/loans`
- **Description**: Retrieves a list of all loans for a verifier.
- **Response**:
  ```json
  [
    {
      "id": "loanId",
      "fullName": "John Doe",
      "amount": 10000,
      "status": "pending",
      "assignedVerifier": {
        "id": "verifierId",
        "name": "Verifier Name"
      }
    }
  ]
  ```
### **6. View Loans**

- **Endpoint**: `GET /api/user/loan`
- **Description**: Retrieves a list of all loans for a user.
- **Response**:
  ```json
  [
    {
      "id": "loanId",
      "fullName": "John Doe",
      "amount": 10000,
      "status": "pending",
      "assignedVerifier": {
        "id": "verifierId",
        "name": "Verifier Name"
      }
    }
  ]
  ```
---

## Data Models

### **1. User Model**

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  phone: string;
  address: string;
  password: string;
  role: 'user' | 'verifier' | 'admin';
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'verifier', 'admin'], default: 'user' },
});

export default mongoose.model<IUser>('User', UserSchema);
```

### **2. Loan Model**

```typescript
import mongoose, { Document, Schema } from 'mongoose';

export interface ILoan extends Document {
  user: string;
  fullName: string;
  amount: number;
  tenure: number;
  employmentStatus: 'unemployed' | 'employed';
  reason: string;
  employmentAddress1: string;
  employmentAddress2?: string;
  termsAccepted: boolean;
  creditInfoDisclosure: boolean;
  assignedVerifier: string;
  status: 'pending' | 'approved' | 'verified' | 'rejected';
}

const LoanSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  fullName: { type: String, required: true },
  amount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  employmentStatus: { type: String, enum: ['unemployed', 'employed'], required: true },
  reason: { type: String, required: true },
  employmentAddress1: { type: String, required: true },
  employmentAddress2: { type: String, optional: true },
  termsAccepted: { type: Boolean, required: true },
  creditInfoDisclosure: { type: Boolean, required: true },
  assignedVerifier: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'approved', 'verified', 'rejected'], default: 'pending' },
}, { timestamps: true });

const Loan = mongoose.model<ILoan>('Loan', LoanSchema);

export default Loan;
```

---

## Tech Stack

### **Frontend**:
- **Vite + React + TypeScript**
- **Material-UI**: For the UI components like buttons, tables, and forms.
- **Tailwind CSS**: For responsive and custom styling.

### **Backend**:
- **Node.js + TypeScript**: For building the API.
- **Bun**: As a fast JavaScript runtime.
- **Mongoose**: For MongoDB ORM.

### **Database**:
- **MongoDB**: For storing user and loan information.

---

## Setup Instructions

### **1. Clone the Repository**
```bash
git clone https://github.com/srs-sudeep/creditsea
cd creditsea
```

### **2. Install Dependencies**

#### Backend
```bash
cd server
bun install
```

#### Frontend
```bash
cd creditsea
bun install
```

### **3. Set Environment Variables for server and client**
Create a `.env` file in the root directory of server with the following details:
```bash
# Port number
PORT=5000
NODE_ENV=development
# URL of the Mongo DB
MONGODB_URL=mongodb+srv://sudeep160403:1234@cluster0.asn2x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
# JWT secret key
JSON_WEB_TOKEN_SECRET=creeditsea
# Client URL
CLIENT_URL=http://localhost:5173
# Server URL
SERVER_URL=http://localhost:5000
```

Create a `.env` file in the root directory of client with the following details:

```bash
VITE_API_URL=http://localhost:5000/api
```

### **4. Run the Application**

#### Backend
```bash
bun run dev
```

#### Frontend
```bash
bun run dev
```

---



## Contact
For further inquiries, please contact:
- **Email**: sudeep160403@gmail.com
- **Phone**: +91-6372432280

---
