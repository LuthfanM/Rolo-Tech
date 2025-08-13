# Next.js E-Commerce Demo (Google Sheets + Stripe Integration)

This project is a simple e-commerce flow built with [Next.js](https://nextjs.org), integrated with:  
- **Google Sheets API** — to store order data.  
- **Stripe Checkout** — to process payments.  

Bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

---

## 🚀 Getting Started

### 1️⃣ Clone & Install
```bash
git clone <your-repo-url>
cd <your-repo-name>
npm install
```

---

### 2️⃣ Environment Variables
Copy the example `.env` file and adjust values as needed:

```bash
cp .env.example .env.local
```

You can either:  
- Use the **existing values** provided (valid until **20 Aug 2025**) — good for quick testing.  
- Use **your own credentials** — recommended for production.

---

#### **Google Sheets Configuration**
- **`GOOGLE_SHEETS_ID`** → The sheet ID from the URL.  
  Example:  
  ```
  https://docs.google.com/spreadsheets/d/test222/edit?gid=0#gid=0  
  ID = test222
  ```
- **`GOOGLE_SERVICE_ACCOUNT_EMAIL`** → From your Google Cloud project (IAM → Service Accounts).  
- **`GOOGLE_SERVICE_ACCOUNT_KEY`** → The `private_key` from the service account JSON (keep `\n` escapes intact).  
- **`GOOGLE_SHEETS_TAB`** → The name of the sheet tab (default: `Sheet1`).  

---

#### **Stripe Configuration**
- **`STRIPE_SECRET_KEY`** → Get from your [Stripe Dashboard](https://dashboard.stripe.com/apikeys).  
- **`STRIPE_SUCCESS_URL`** → Redirect after successful payment (e.g., `http://localhost:3000/success`).  
- **`STRIPE_CANCEL_URL`** → Redirect after payment is cancelled (e.g., `http://localhost:3000/cart`).  
- **`STRIPE_CURRENCY`** → Payment currency (default: `usd`).  

---

### 3️⃣ Run the Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 📦 Features
- **Cart → Checkout → Payment** flow.
- Order details stored in **Google Sheets**.
- Payment handled via **Stripe Checkout**.
- Environment-based configuration for easy deployment.

---

## 🧪 Testing Stripe Payments
In **test mode**, you can use the following test card:  
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVC: Any 3 digits
ZIP: Any
```

---

## 📄 License
This project is licensed under the MIT License.
