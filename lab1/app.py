from flask import Flask, request, jsonify
import sqlite3
import hashlib

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('users.db')
    conn.row_factory = sqlite3.Row  # Позволяет обращаться к столбцам по имени
    return conn

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()  # Хешируем пароль

@app.route('/user', methods=['POST'])
def create_user():
    data = request.get_json()  # Получаем данные из запроса
    login = data['Login']
    pass_hash = hash_password(data['PassHash'])
    
    conn = get_db_connection()
    try:
        conn.execute('INSERT INTO User (Login, PassHash) VALUES (?, ?)', (login, pass_hash))
        conn.commit()
        return jsonify({"message": "User created successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Login already exists"}), 400
    finally:
        conn.close()

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    conn = get_db_connection()
    user = conn.execute('SELECT * FROM User WHERE Id = ?', (id,)).fetchone()
    conn.close()
    
    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify({"Id": user['Id'], "Login": user['Login']}), 200

@app.route('/user/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    login = data['Login']
    pass_hash = hash_password(data['PassHash'])
    
    conn = get_db_connection()
    conn.execute('UPDATE User SET Login = ?, PassHash = ? WHERE Id = ?', (login, pass_hash, id))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "User updated successfully"}), 200

@app.route('/user/<int:id>', methods=['DELETE'])
def delete_user(id):
    conn = get_db_connection()
    conn.execute('DELETE FROM User WHERE Id = ?', (id,))
    conn.commit()
    conn.close()
    
    return jsonify({"message": "User deleted successfully"}), 200

if __name__ == '__main__':
    app.run(debug=True)  # Запускаем сервер
