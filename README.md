# E-Commerce Website

A full-stack e-commerce web application built with Django REST Framework and React.

## Tech Stack

- **Backend:** Django, Django REST Framework, PostgreSQL
- **Frontend:** React, Vite
- **Other:** django-cors-headers, Pillow

## Project Structure

```
Ecommerce/
├── backend/        # Django backend
│   ├── backend/    # Project settings & URLs
│   └── store/      # Store app (models, views, URLs)
└── frontend/       # React frontend
    └── src/        # React components
```

## Getting Started

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the `backend/` directory:

```
SECRET_KEY=your-secret-key
DB_NAME=your-db-name
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_HOST=localhost
DB_PORT=5432
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | /api/    | Welcome message |

## Admin Panel

Access the Django admin at `http://127.0.0.1:8000/admin`

## GitHub

[https://github.com/Joshiaryan/Ecommerce](https://github.com/Joshiaryan/Ecommerce)
