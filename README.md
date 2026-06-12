# 🛍️ ShopEasy — Full Stack E-Commerce Website

A full-stack e-commerce web application built with **Django REST Framework** and **React**. Features product listings, user authentication, shopping cart, order management, and user profiles.

## 🔗 Links

- **GitHub:** [https://github.com/Joshiaryan/Ecommerce](https://github.com/Joshiaryan/Ecommerce)

---

## ✨ Features

- 🛒 Product listing with search and category filter
- 📦 Product detail page with quantity selector
- 🔐 User registration & login with JWT authentication
- 👤 User profile with editable info (email, phone, address)
- 🛍️ Shopping cart drawer with quantity controls
- 📋 Order history in user profile
- 🖼️ Image upload for products via Django admin
- 📱 Responsive design
- 🚀 Ready for Vercel deployment

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Django 6, Django REST Framework |
| Auth | JWT (djangorestframework-simplejwt) |
| Database | PostgreSQL |
| Frontend | React 19, Vite |
| Routing | React Router DOM |
| Styling | Inline styles + Tailwind CSS |
| CORS | django-cors-headers |
| Static Files | WhiteNoise |
| Image Handling | Pillow |
| Deployment | Vercel |

---

## 📁 Project Structure

```
Ecommerce/
├── backend/                  # Django backend
│   ├── backend/              # Project settings & URLs
│   │   ├── settings.py
│   │   ├── urls.py
│   │   └── wsgi.py
│   ├── store/                # Store app
│   │   ├── models.py         # Category, Product, Cart, Order, UserProfile
│   │   ├── views.py          # API views
│   │   ├── serializers.py    # DRF serializers
│   │   ├── urls.py           # API routes
│   │   └── admin.py          # Admin panel registration
│   ├── requirements.txt
│   ├── manage.py
│   └── vercel.json
├── frontend/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── CartDrawer.jsx
│   │   ├── pages/
│   │   │   ├── ProductList.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Profile.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── vercel.json
├── .gitignore
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in `backend/`:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

```bash
npm run dev
```

---

## 🌐 API Endpoints

### Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/` | List all products |
| GET | `/api/products/:id/` | Product detail |
| GET | `/api/categories/` | List all categories |
| POST | `/api/register/` | Register new user |
| POST | `/api/token/` | Login (get JWT tokens) |
| POST | `/api/token/refresh/` | Refresh JWT token |

### Protected (JWT required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/` | Get user cart |
| POST | `/api/cart/add/` | Add item to cart |
| POST | `/api/cart/update/` | Update cart item quantity |
| POST | `/api/cart/remove/` | Remove item from cart |
| POST | `/api/order/create/` | Create order from cart |
| GET | `/api/orders/` | Get order history |
| GET | `/api/profile/` | Get user profile |
| PUT | `/api/profile/update/` | Update user profile |

---

## 🚀 Deploying to Vercel

### Backend
1. Go to [vercel.com](https://vercel.com) → New Project → import this repo
2. Set **Root Directory** to `backend`
3. Add environment variables:

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-backend.vercel.app
DB_NAME=...
DB_USER=...
DB_PASSWORD=...
DB_HOST=...
DB_PORT=5432
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

### Frontend
1. New Project → same repo → set **Root Directory** to `frontend`
2. Add environment variable:

```env
VITE_API_URL=https://your-backend.vercel.app
```

---

## 🔑 Admin Panel

Access Django admin at `http://127.0.0.1:8000/admin`

Use the admin panel to:
- Add/edit products and categories
- Upload product images
- Manage users and orders

---

## 📸 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Product listing with search & filter |
| Product | `/product/:id` | Product detail with add to cart |
| Login | `/login` | User login |
| Signup | `/signup` | User registration |
| Profile | `/profile` | User profile & order history |
