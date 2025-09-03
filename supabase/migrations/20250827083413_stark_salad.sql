-- AppSellPoint Database Schema and Initial Data
-- PostgreSQL Database Setup

-- Create database (run this separately if needed)
-- CREATE DATABASE AppSellPoint;
-- \c AppSellPoint;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('admin', 'user')),
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    "fullDescription" TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    technologies JSONB DEFAULT '[]',
    features JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    support JSONB DEFAULT '[]',
    image VARCHAR(500),
    screenshots JSONB DEFAULT '[]',
    "videoUrl" VARCHAR(500),
    "downloadUrl" VARCHAR(500),
    rating DECIMAL(2,1) DEFAULT 0,
    sales INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    "authorId" UUID NOT NULL REFERENCES users(id),
    category VARCHAR(100) NOT NULL,
    image VARCHAR(500),
    tags JSONB DEFAULT '[]',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    "readTime" VARCHAR(50) DEFAULT '5 min read',
    views INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    captcha VARCHAR(10),
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    "ipAddress" VARCHAR(45),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Purchases table
CREATE TABLE IF NOT EXISTS purchases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "transactionId" VARCHAR(255) UNIQUE NOT NULL,
    "productId" UUID NOT NULL REFERENCES products(id),
    "customerName" VARCHAR(255) NOT NULL,
    "customerEmail" VARCHAR(255) NOT NULL,
    "customerCompany" VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    "paymentMethod" VARCHAR(50) DEFAULT 'PayPal',
    "paymentStatus" VARCHAR(20) DEFAULT 'pending' CHECK ("paymentStatus" IN ('pending', 'completed', 'failed', 'refunded')),
    "downloadCount" INTEGER DEFAULT 0,
    "lastDownload" TIMESTAMP WITH TIME ZONE,
    "ipAddress" VARCHAR(45),
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author ON blog_posts("authorId");
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchases("paymentStatus");
CREATE INDEX IF NOT EXISTS idx_purchases_transaction ON purchases("transactionId");

-- Insert admin user (password: admin123 - hashed with bcrypt)
INSERT INTO users (id, email, password, name, role, "isActive") VALUES 
(
    uuid_generate_v4(),
    'admin@AppSellPoint.com',
    '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', -- admin123
    'Admin User',
    'admin',
    true
) ON CONFLICT (email) DO NOTHING;

-- Get admin user ID for foreign key references
DO $$
DECLARE
    admin_id UUID;
    product1_id UUID;
    product2_id UUID;
    product3_id UUID;
BEGIN
    -- Get admin user ID
    SELECT id INTO admin_id FROM users WHERE email = 'admin@AppSellPoint.com';
    
    -- Insert sample products
    INSERT INTO products (
        id, name, description, "fullDescription", price, category, 
        technologies, features, requirements, support, 
        image, screenshots, "videoUrl", rating, sales, status
    ) VALUES 
    (
        uuid_generate_v4(),
        'E-Commerce Mobile App',
        'Complete e-commerce solution with shopping cart, payment integration, and admin panel.',
        'A comprehensive e-commerce mobile application built with React Native and Node.js. Features include user authentication, product catalog, shopping cart, secure payment processing with PayPal integration, order management, push notifications, and a complete admin dashboard for managing products, orders, and customers. The app is fully customizable and comes with detailed documentation.',
        299.00,
        'ecommerce',
        '["React Native", "Node.js", "MongoDB", "PayPal API", "Firebase"]',
        '["User Authentication", "Product Catalog", "Shopping Cart", "Payment Integration", "Order Management", "Push Notifications", "Admin Dashboard", "Customer Reviews", "Wishlist", "Search & Filters"]',
        '["Node.js 16+", "React Native CLI", "MongoDB 4.4+", "PayPal Developer Account", "Firebase Account"]',
        '["Complete Source Code", "Documentation", "Installation Guide", "6 Months Support", "Free Updates", "Video Tutorials"]',
        'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg',
        '["https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg", "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg"]',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.8,
        156,
        'active'
    ),
    (
        uuid_generate_v4(),
        'Food Delivery App',
        'On-demand food delivery platform with real-time tracking and multi-restaurant support.',
        'A sophisticated food delivery application similar to UberEats or DoorDash. Built with React Native for mobile and Node.js for backend. Features include restaurant listings, menu management, real-time order tracking, GPS integration, multiple payment options, rating system, and separate apps for customers, restaurants, and delivery drivers. Includes advanced features like geofencing, push notifications, and analytics dashboard.',
        499.00,
        'delivery',
        '["React Native", "Node.js", "PostgreSQL", "Socket.io", "Google Maps API", "Stripe"]',
        '["Multi-Restaurant Platform", "Real-time Tracking", "GPS Integration", "Multiple Payment Methods", "Rating & Reviews", "Push Notifications", "Driver App", "Restaurant Dashboard", "Analytics", "Promo Codes"]',
        '["Node.js 16+", "PostgreSQL 12+", "Google Maps API Key", "Stripe Account", "Firebase Account", "Socket.io"]',
        '["Customer App Source", "Driver App Source", "Restaurant Dashboard", "Admin Panel", "API Documentation", "Deployment Guide", "1 Year Support"]',
        'https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg',
        '["https://images.pexels.com/photos/4393426/pexels-photo-4393426.jpeg", "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"]',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.9,
        89,
        'active'
    ),
    (
        uuid_generate_v4(),
        'Fitness Tracker App',
        'Comprehensive fitness tracking app with workout plans, nutrition tracking, and social features.',
        'A complete fitness and health tracking application built with React Native. Features include workout tracking, exercise library, nutrition logging, progress analytics, social sharing, personal trainer booking, and integration with wearable devices. The app includes gamification elements, achievement badges, and community features to keep users motivated.',
        199.00,
        'health',
        '["React Native", "Node.js", "MongoDB", "HealthKit", "Google Fit", "Chart.js"]',
        '["Workout Tracking", "Exercise Library", "Nutrition Logging", "Progress Analytics", "Social Features", "Wearable Integration", "Personal Trainer Booking", "Achievement System", "Community Challenges", "Custom Workout Plans"]',
        '["React Native 0.68+", "Node.js 16+", "MongoDB 4.4+", "HealthKit (iOS)", "Google Fit (Android)"]',
        '["Complete Source Code", "Exercise Database", "Nutrition Database", "Admin Panel", "Documentation", "6 Months Support", "Free Updates"]',
        'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg',
        '["https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg", "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"]',
        'https://www.youtube.com/embed/dQw4w9WgXcQ',
        4.7,
        234,
        'active'
    );

    -- Get product IDs for purchases
    SELECT id INTO product1_id FROM products WHERE name = 'E-Commerce Mobile App';
    SELECT id INTO product2_id FROM products WHERE name = 'Food Delivery App';
    SELECT id INTO product3_id FROM products WHERE name = 'Fitness Tracker App';

    -- Insert sample blog post
    INSERT INTO blog_posts (
        id, title, excerpt, content, "authorId", category, 
        image, tags, status, "readTime", views
    ) VALUES 
    (
        uuid_generate_v4(),
        'The Future of Mobile App Development in 2024',
        'Explore the latest trends and technologies shaping mobile app development this year, from AI integration to cross-platform solutions.',
        '<h2>Introduction</h2>
        <p>Mobile app development continues to evolve at a rapid pace, with new technologies and frameworks emerging regularly. As we move through 2024, several key trends are shaping the future of mobile development.</p>
        
        <h2>1. Cross-Platform Development Dominance</h2>
        <p>Cross-platform frameworks like React Native and Flutter are becoming increasingly popular among developers and businesses alike. These frameworks allow developers to write code once and deploy it across multiple platforms, significantly reducing development time and costs.</p>
        
        <h2>2. AI and Machine Learning Integration</h2>
        <p>Artificial Intelligence and Machine Learning are no longer just buzzwords in mobile development. From personalized user experiences to predictive analytics, AI is becoming an integral part of modern mobile applications.</p>
        
        <h2>3. 5G Technology Impact</h2>
        <p>The widespread adoption of 5G networks is opening up new possibilities for mobile applications. Faster data speeds and lower latency are enabling more sophisticated features and real-time interactions.</p>
        
        <h2>4. Enhanced Security Measures</h2>
        <p>With increasing concerns about data privacy and security, mobile app developers are implementing more robust security measures, including biometric authentication and end-to-end encryption.</p>
        
        <h2>Conclusion</h2>
        <p>The future of mobile app development looks promising, with exciting technologies and frameworks continuing to emerge. Developers who stay updated with these trends will be well-positioned to create innovative and successful mobile applications.</p>',
        admin_id,
        'Technology',
        'https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg',
        '["Mobile Development", "Technology", "Trends", "2024", "React Native", "Flutter", "AI", "5G"]',
        'published',
        '8 min read',
        1247
    );

    -- Insert sample contact
    INSERT INTO contacts (
        id, name, email, message, captcha, status, "ipAddress"
    ) VALUES 
    (
        uuid_generate_v4(),
        'John Smith',
        'john.smith@example.com',
        'Hi, I am interested in your e-commerce mobile app solution. Can you provide more details about customization options and pricing for enterprise clients? We are looking to launch our mobile store within the next 3 months.',
        '12',
        'unread',
        '192.168.1.100'
    );

    -- Insert sample purchases
    INSERT INTO purchases (
        id, "transactionId", "productId", "customerName", "customerEmail", 
        "customerCompany", amount, "paymentMethod", "paymentStatus", 
        "downloadCount", "lastDownload", "ipAddress"
    ) VALUES 
    (
        uuid_generate_v4(),
        'TXN_' || EXTRACT(EPOCH FROM NOW())::bigint || '_' || substring(uuid_generate_v4()::text, 1, 8),
        product1_id,
        'Sarah Johnson',
        'sarah.johnson@techcorp.com',
        'TechCorp Solutions',
        299.00,
        'PayPal',
        'completed',
        3,
        NOW() - INTERVAL '2 hours',
        '192.168.1.101'
    ),
    (
        uuid_generate_v4(),
        'TXN_' || EXTRACT(EPOCH FROM NOW() - INTERVAL '1 day')::bigint || '_' || substring(uuid_generate_v4()::text, 1, 8),
        product2_id,
        'Mike Davis',
        'mike.davis@startup.io',
        'FoodieStartup',
        499.00,
        'PayPal',
        'completed',
        1,
        NOW() - INTERVAL '1 day',
        '192.168.1.102'
    ),
    (
        uuid_generate_v4(),
        'TXN_' || EXTRACT(EPOCH FROM NOW() - INTERVAL '3 days')::bigint || '_' || substring(uuid_generate_v4()::text, 1, 8),
        product3_id,
        'Emily Chen',
        'emily.chen@fitness.com',
        'FitLife Gym',
        199.00,
        'PayPal',
        'completed',
        5,
        NOW() - INTERVAL '1 hour',
        '192.168.1.103'
    ),
    (
        uuid_generate_v4(),
        'TXN_' || EXTRACT(EPOCH FROM NOW() - INTERVAL '5 hours')::bigint || '_' || substring(uuid_generate_v4()::text, 1, 8),
        product1_id,
        'David Wilson',
        'david.wilson@agency.com',
        'Digital Agency Pro',
        299.00,
        'PayPal',
        'pending',
        0,
        NULL,
        '192.168.1.104'
    );

END $$;

-- Create additional sample data for testing
INSERT INTO contacts (name, email, message, captcha, status, "ipAddress") VALUES 
('Alice Brown', 'alice.brown@example.com', 'I would like to know more about your fitness tracker app. Does it support Apple Watch integration?', '8', 'read', '192.168.1.105'),
('Robert Taylor', 'robert.taylor@company.com', 'We are interested in bulk licensing for multiple clients. Do you offer reseller programs?', '15', 'replied', '192.168.1.106'),
('Lisa Anderson', 'lisa@education.org', 'Can you provide a demo of your learning management app? We are evaluating solutions for our school district.', '6', 'unread', '192.168.1.107');

-- Update sequences and constraints
SELECT setval(pg_get_serial_sequence('products', 'sales'), COALESCE(MAX(sales), 1)) FROM products;

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contacts_updated_at BEFORE UPDATE ON contacts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON purchases FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions (adjust as needed for your setup)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_app_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_app_user;

-- Display summary
SELECT 'Database initialization completed successfully!' as status;
SELECT 'Admin user created: admin@AppSellPoint.com (password: admin123)' as admin_info;
SELECT COUNT(*) as total_products FROM products;
SELECT COUNT(*) as total_blog_posts FROM blog_posts;
SELECT COUNT(*) as total_contacts FROM contacts;
SELECT COUNT(*) as total_purchases FROM purchases;