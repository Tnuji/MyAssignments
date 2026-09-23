from flask import Flask, render_template, jsonify, request
from database import get_connection, init_db

app = Flask(__name__)

def row_to_dict(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "className": row["class_name"],
        "dueDate": row["due_date"],
        "time": row["time"],
        "priority": row["priority"],
        "color": row["color"],
        "icon": row["icon"],
        "tag": row["tag"],
        "status": row["status"],
    }

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/assignments", methods=["GET"])
def get_assignments():
    connection = get_connection()
    rows = connection.execute("SELECT * FROM assignments ORDER BY due_date").fetchall()
    connection.close()
    return jsonify([row_to_dict(row) for row in rows])

@app.route("/api/assignments", methods=["POST"])
def create_assignment():
    data = request.get_json()

    connection = get_connection()
    cursor = connection.execute(
        """
        INSERT INTO assignments (title, class_name, due_date, time, priority, color, icon, tag, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
        (
            data.get("title"),
            data.get("className"),
            data.get("dueDate"),
            "11:59 PM",
            data.get("priority"),
            "purple",
            "📌",
            "Assignment",
            "pending",
        ),
    )
    connection.commit()

    new_row = connection.execute(
        "SELECT * FROM assignments WHERE id = ?", (cursor.lastrowid,)
    ).fetchone()
    connection.close()

    return jsonify(row_to_dict(new_row)), 201
@app.route("/api/assignments/<int:assignment_id>", methods=["DELETE"])
def delete_assignment(assignment_id):
    connection = get_connection()
    connection.execute("DELETE FROM assignments WHERE id = ?", (assignment_id,))
    connection.commit()
    connection.close()
    return "", 204


@app.route("/api/assignments/<int:assignment_id>", methods=["PATCH"])
def update_assignment(assignment_id):
    data = request.get_json()

    connection = get_connection()
    connection.execute(
        "UPDATE assignments SET status = ? WHERE id = ?",
        (data.get("status"), assignment_id),
    )
    connection.commit()

    row = connection.execute(
        "SELECT * FROM assignments WHERE id = ?", (assignment_id,)
    ).fetchone()
    connection.close()

    return jsonify(row_to_dict(row))

if __name__ == "__main__":
    init_db()
    app.run(debug=True)