process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import 'dotenv/config';

import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

async function createTables() {
  console.log('Connecting to InsForge Database to initialize tables...');

  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS shop_profiles (
        user_id UUID PRIMARY KEY,
        shop_name VARCHAR(255),
        phone VARCHAR(50),
        email VARCHAR(255),
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        sku VARCHAR(100),
        category VARCHAR(100),
        price DECIMAL(10, 2) NOT NULL,
        stock INT DEFAULT 0,
        status VARCHAR(50) DEFAULT 'active',
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        address TEXT,
        gst_number VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS bills (
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id) ON DELETE SET NULL,
        items JSONB,
        amount DECIMAL(10, 2) NOT NULL,
        status VARCHAR(50) DEFAULT 'unpaid',
        due_date DATE,
        notes TEXT,
        paid_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS bill_items (
        id SERIAL PRIMARY KEY,
        bill_id INT REFERENCES bills(id) ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON DELETE SET NULL,
        quantity INT DEFAULT 1,
        price DECIMAL(10, 2) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        user_id UUID NOT NULL,
        title VARCHAR(255) NOT NULL,
        body TEXT,
        type VARCHAR(50) DEFAULT 'info',
        read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ All database tables created successfully!');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  } finally {
    pool.end();
  }
}

createTables();
