# Social Media App — Hexsoftware Task 3

## Setup

1. Is folder ko kahin extract/copy kar lo (jaise apne HEXSOFTWARE project folder ke andar).
2. Terminal usi folder mein khol kar chalao:
   ```
   npm install
   ```
3. `.env.local` file kholo aur `MONGODB_URI` ki value apni MongoDB Atlas connection string se replace karo:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/social-media-app
   ```
4. Server chalao:
   ```
   npm run dev
   ```
5. Browser mein kholo: http://localhost:3000

## Flow
- `/register` — naya account banao
- `/login` — login karo
- `/` — feed dikhega, post kar sakte ho, like kar sakte ho

## GitHub par upload karne ke liye
Repo ka naam: `HexSoftwares_SocialMediaApp`
