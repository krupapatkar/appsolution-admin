-- Add Admin User to AppSolutions Database
-- PostgreSQL Script to create admin user with proper credentials

-- Connect to the database (uncomment if running separately)
-- \c appsolutions;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Insert admin user with hashed password (admin123)
-- Password is hashed using bcrypt with 12 salt rounds
INSERT INTO users (
    id,
    email,
    password,
    name,
    role,
    "isActive",
    "createdAt",
    "updatedAt"
) VALUES (
    uuid_generate_v4(),
    'admin@appsolutions.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', -- admin123
    'Admin User',
    'ADMIN',
    true,
    NOW(),
    NOW()
) ON CONFLICT (email) DO UPDATE SET
    password = EXCLUDED.password,
    name = EXCLUDED.name,
    role = EXCLUDED.role,
    "isActive" = EXCLUDED."isActive",
    "updatedAt" = NOW();

-- Verify the admin user was created
SELECT 
    id,
    email,
    name,
    role,
    "isActive",
    "createdAt"
FROM users 
WHERE email = 'admin@appsolutions.com';

-- Display success message
SELECT 'Admin user created/updated successfully!' as status;
SELECT 'Login credentials:' as info;
SELECT 'Email: admin@appsolutions.com' as email;
SELECT 'Password: admin123' as password;