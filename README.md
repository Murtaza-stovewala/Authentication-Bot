
# Studio Master

Full-stack application built with **Node.js**, **Express**, **MongoDB** (backend) and **Next.js** with **Tailwind CSS** (frontend).

---

## 🧾 Folder Structure

```
studio-master/
├── backend/        # Express + Mongoose backend
├── frontend/       # Next.js frontend
├── docs/           # Documentation (optional)
├── src/            # Shared or core logic (optional)
├── package.json    # Root workspace manager
```

---

## 🚀 Features

- 🔐 User authentication
- 💬 Real-time chat support
- 📊 Dashboard with charts
- 🎨 Beautiful UI using Tailwind and Radix UI

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/studio-master.git
cd studio-master
```

### 2. Install Root Dependencies

This installs tools like `concurrently` to run frontend and backend together.

```bash
npm install
```

---

## 🔧 Backend Setup

1. Navigate to the `backend` directory:

```bash
cd backend
```

2. Install backend dependencies:

```bash
npm install
```

3. Create a `.env` file inside `/backend`:

```env
MONGODB_URI=mongodb+srv://<your-user>:<your-password>@cluster.mongodb.net/myDatabase?retryWrites=true&w=majority
PORT=5000
```

4. Start backend only:

```bash
npm run dev
```

---

## 🎨 Frontend Setup

1. Navigate to the `frontend` directory:

```bash
cd ../frontend
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start frontend only:

```bash
npm run dev
```

> This starts the app at [http://localhost:3000](http://localhost:3000)

---

## ▶️ Start Both (from Root)

```bash
npm run dev
```

This runs both:
- `backend` on [http://localhost:5000](http://localhost:5000)
- `frontend` on [http://localhost:3000](http://localhost:3000)

---

## ✅ Environment Variables

- Ensure `.env` is placed in the `backend` folder.
- MongoDB URI should be correct and allow connections.

---

## 🛠 Technologies Used

- **Frontend**: React, Next.js, TailwindCSS, Radix UI
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **State Management**: React Hook Form, Zod
- **Charting**: Recharts

---

## 📦 Scripts Summary

From project root:

| Command         | What it does                                 |
|----------------|-----------------------------------------------|
| `npm run dev`  | Runs frontend & backend together concurrently |
| `cd frontend && npm run dev` | Starts frontend only |
| `cd backend && npm run dev` | Starts backend only |

---

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you'd like to change.

---

## 📄 License

MIT
