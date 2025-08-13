# 🏥 Medical Camp Connect

**Medical Camp Connect** is a web platform designed to manage and showcase medical camps, built for ease of use by organizers, doctors, and participants. It includes features such as user registration, secure authentication, camp listings, feedback collection, payment processing, and more.

---

## 👤 Organizer Credentials (For Demo)

- **Username (Email)**: `carecamp.official@gmail.com`
- **Password**: `Care@12345`

> ⚠️ Please do not change credentials in the demo environment. It is shared for preview purposes only.

---

## 🌐 Live Site

👉 [Visit Live Website](https://careconnect-medicalcapms.web.app/)

---

## 🔑 Key Features

- ✅ **Organizer Dashboard** – Create, update, and manage camps effortlessly.
- 📅 **Camp Scheduling** – Organizers can schedule camps with full details including date, location, and specialties.
- 👨‍⚕️ **Doctor Management** – Add and view doctor profiles who participated in the camps.
- 👥 **Participant Registration** – Visitors can register for camps using a simple form.
- 💳 **Stripe Payment Integration** – Secure and smooth payment for participant registration using Stripe.
- 🧾 **Payment History & Receipts** – View and manage payment records with date-wise sorting and filtering.
- ⭐ **Rating & Feedback System** – Participants can leave reviews and star ratings for each camp.
- 📊 **Analytics Dashboard** – View total camps, doctors, participants, ratings, and feedback count.
- 🔐 **Authentication System** – Secure sign-up and login system with route protection.
- 📱 **Responsive Design** – Mobile-friendly UI for smooth usage across devices.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js (Express), MongoDB (Mongoose)
- **Authentication**: Firebase Auth
- **Payment**: Stripe
- **State Management**: React Query (TanStack Query)
- **Date Handling**: date-fns
- **Deployment**: Vercel (Frontend), Render / Railway (Backend + DB)

---

## 📂 How to Run Locally

```bash
git clone https://github.com/your-repo/medical-camp-connect.git
cd medical-camp-connect
npm install
npm run dev
