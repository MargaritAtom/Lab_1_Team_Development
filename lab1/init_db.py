import sqlite3

def init_db():
    conn = sqlite3.connect('users.db')  # Создаем или открываем базу данных
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS User (
            Id INTEGER PRIMARY KEY AUTOINCREMENT,
            Login TEXT UNIQUE NOT NULL,
            PassHash TEXT NOT NULL
        )
    ''')
    conn.commit()  # Сохраняем изменения
    conn.close()   # Закрываем соединение

init_db()  # Инициализируем базу данных
