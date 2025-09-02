# Database Setup Instructions

## Prerequisites
- PostgreSQL 12+ installed and running
- Database user with CREATE privileges

## Setup Steps

1. **Create Database**
   ```bash
   createdb appsolutions
   ```

2. **Run the initialization script**
   ```bash
   psql -d appsolutions -f database/init.sql
   ```

   Or connect to PostgreSQL and run:
   ```sql
   \i database/init.sql
   ```

## Default Credentials

### Admin User
- **Email**: `admin@appsolutions.com`
- **Password**: `admin123`
- **Role**: `admin`

## Sample Data Included

### Products (3 items)
1. **E-Commerce Mobile App** - $299.00
2. **Food Delivery App** - $499.00  
3. **Fitness Tracker App** - $199.00

### Blog Posts (1 item)
- "The Future of Mobile App Development in 2024"

### Contacts (4 items)
- Various customer inquiries with different statuses

### Purchases (4 items)
- Sample transactions with different statuses
- Includes completed and pending purchases

## Database Schema

### Tables Created
- `users` - Admin and user accounts
- `products` - Mobile app products
- `blog_posts` - Blog content
- `contacts` - Customer inquiries
- `purchases` - Transaction records

### Features
- UUID primary keys
- Proper foreign key relationships
- JSON fields for flexible data storage
- Indexes for performance
- Triggers for automatic timestamp updates
- Data validation with CHECK constraints

## Environment Variables

Make sure your `.env` file has the correct database connection:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/appsolutions
DB_NAME=appsolutions
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

## Verification

After running the script, you should see:
- Database initialization completed successfully
- Admin user created confirmation
- Count of records in each table

You can verify the data by connecting to the database and running:
```sql
SELECT * FROM users WHERE role = 'admin';
SELECT COUNT(*) FROM products;
SELECT COUNT(*) FROM blog_posts;
SELECT COUNT(*) FROM purchases;
```