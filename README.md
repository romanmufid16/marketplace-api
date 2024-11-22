# Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/romanmufid16/typescript-express-starter.git
```
### 2. Install dependencies

```bash
npm install
```
### 3. Create .env configuration

```
DATABASE_URL="mysql://username:password@localhost:3306/your_db_name"
JWT_SECRET=jwt_secret
```

### 4. Migrate Prisma scheme

```bash
npx prisma migrate dev --name init
```

### 5. Run the project

```bash
npm run dev
```

