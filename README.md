This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Integrated with Google sheets API and Stripe For Simple E-Commerce Flow.

## Getting Started

You need to make sure .env file is configured properly. 
cp .env.example .env.local

You can use existing value or use your own configuration. 
For existing value. I will leave that key alive until 20 august 2025

- GOOGLE_SHEETS_ID -> Refer to google sheets ID in url parameter. For example if your sheet is https://docs.google.com/spreadsheets/d/test222/edit?gid=0#gid=0 means your id is test222
- GOOGLE_SERVICE_ACCOUNT_EMAIL -> Refer to google project in GCP
- GOOGLE_SERVICE_ACCOUNT_KEY -> Account key in IAM - Service Account - Tab 'Keys'. Inside json file
- GOOGLE_SHEETS_TAB=Sheet1 -> Name of tab in sheet. By default it is Sheet1

First, run the development server:

```bash
npm install
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

