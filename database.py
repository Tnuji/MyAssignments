import sqlite3

DB_NAME = "MyAssignments.db"

def get_connection():
    connection = sqlite3.connect(DB_NAME)
    connection.row_factory = sqlite3.Row
    return connection

def init_db():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS assignments (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            class_name TEXT NOT NULL,
            due_date TEXT NOT NULL,
            time TEXT,
            priority TEXT,
            color TEXT,
            icon TEXT,
            tag TEXT,
            status TEXT DEFAULT 'pending'
        )
    """)

    connection.commit()
    connection.close()