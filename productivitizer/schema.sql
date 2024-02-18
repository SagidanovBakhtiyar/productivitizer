DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS kanban;
DROP TABLE IF EXISTS expense;


-- Create user table for auth
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);


-- Kanban table |task|task_description
CREATE TABLE kanban (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    task_title TEXT NOT NULL,
    task_description TEXT,
    task_status TEXT DEFAULT 'todo', -- 'todo', 'in_progress', 'done'
    FOREIGN KEY (user_id) REFERENCES user (id)
);


-- Expense table |type|description|amount|sum
CREATE TABLE expense (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    expense_type INTEGER NOT NULL,
    expense_description TEXT,
    amount INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id)
);
