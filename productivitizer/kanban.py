from flask import Blueprint, render_template, g, jsonify, request
from productivitizer.auth import login_required
from productivitizer.db import get_db


bp = Blueprint("kanban", __name__)

# Kanban functinality api
"""
create_task - POST,
read_task   - GET,
update_task - PUT,
delete_task - DELETE,

"""

# Endpoint for webpage view
@bp.route("/kanban")
@login_required
def kanban():
    return render_template("kanban/kanban.html")


# Endpoint for creating the task
@bp.route("/kanban/create", methods=["POST"])
@login_required
def create_task():

    # Get data from front-end request
    data = request.json
    task_title = data.get("task_title")
    task_description = data.get("task_description")
    task_status = data.get("task_status")

    # Validate the user request
    if not task_title:
        return jsonify({"error": "Enter the task title"}), 400

    # Insert new data into database
    db = get_db()
    db.execute(
        "INSERT INTO kanban (user_id, task_title, task_description, task_status) VALUES (?, ?, ?, ?)",
        (g.user["id"], task_title, task_description, task_status),
    )
    db.commit()

    return jsonify({"message": "Task created successfully"}), 201


# Endpoint to fetch user tasks
@bp.route("/kanban/read", methods=["GET"])
@login_required
def read_task():

    # Fetch information about tasks from database
    db = get_db()

    tasks = db.execute(
        "SELECT * FROM kanban WHERE user_id = ?", (g.user["id"],)
    ).fetchall()

    # Validate empty task list
    if not tasks:
        return jsonify([])

    # Converting the tasks into list of dictionaries
    task_list = []
    for task in tasks:
        task_dict = {
            "id": task["id"],
            "task_title": task["task_title"],
            "task_description": task["task_description"],
            "task_status": task["task_status"]
        }
        task_list.append(task_dict)
    
    return jsonify(task_list)


# Endpoint for update selected task
@bp.route("/kanban/update/<int:task_id>", methods=["PUT"])
@login_required
def update_task(task_id):

    # Get data from front-end request
    data = request.json
    task_title = data.get("task_title")
    task_description = data.get("task_description")
    task_status = data.get("task_status")

    # Update data into the database
    db = get_db()
    db.execute(
        "UPDATE kanban SET task_title = ?, task_description = ?, task_status = ? WHERE id = ? AND user_id = ?",
        (task_title, task_description, task_status, task_id, g.user["id"]),
    )
    db.commit()

    return jsonify({"message": "Task updated successfully"}), 200


# Endpoint for deleting task
@bp.route("/kanban/delete/<int:task_id>", methods=["DELETE"])
@login_required
def delete_task(task_id):
    
    # Get the task from the database
    db = get_db()
    task = db.execute(
        "SELECT * FROM kanban WHERE id = ? AND user_id = ?", (task_id, g.user["id"])
    ).fetchone()

    # Check if the task exists
    if not task:
        return jsonify({"error": "Task not found"}), 404

    # Verify user permissions (assuming each user can only delete their own tasks)
    if task["user_id"] != g.user["id"]:
        return jsonify({"error": "You do not have permission to delete this task"}), 403

    # Delete the task from the database
    db.execute(
        "DELETE FROM kanban WHERE id = ? AND user_id = ?", (task_id, g.user["id"])
    )
    db.commit()

    return jsonify({"message": "Task deleted successfully"}), 200