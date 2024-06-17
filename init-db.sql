CREATE TABLE IF NOT EXISTS showcases(
    id SERIAL PRIMARY KEY,
    showcase_name VARCHAR(255),
    updated_at DATE DEFAULT NOW()::DATE,
    items_limit NUMERIC
);

CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    showcase_id INTEGER NOT NULL REFERENCES showcases(id),
    item_name VARCHAR(255),
    created_at DATE DEFAULT NOW()::DATE,
    updated_at DATE DEFAULT NOW()::DATE,
    price NUMERIC,
    amount NUMERIC
);

INSERT INTO showcases (showcase_name, updated_at, items_limit) VALUES
('Toys', '01.06.2024', 3),
('Food', '03.06.2024', 2),
('Books', '04.06.2024', 2);

INSERT INTO products (showcase_id, item_name, created_at, price, amount) VALUES
(1, 'TeddyBear', '24.05.2024', 400, 1),
(1, 'FunnyBunny', '25.05.2024', 750, 1),
(1, 'BlackCat', '01.06.2024', 350, 1),
(2, 'Tomato', '03.06.2024', 80, 2),
(3, 'FairyTales', '04.06.2024', 990, 2);
