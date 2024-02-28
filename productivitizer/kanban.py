from flask import Blueprint, render_template, g, jsonify, request
from werkzeug.exceptions import abort
from productivitizer.auth import login_required
from productivitizer.db import get_db


bp = Blueprint('kanban', __name__)


# Kanban api implementation
# Endpoint to get all tasks for current user
@bp.route('/api/kanban/tasks', methods=['GET'])
@login_required
def get_task():
    db = get_db()
    tasks = db.execute(
        'SELECT id, task_title, task_description, task_status'
        ' FROM kanban WHERE user_id = ?', (g.user['id'],)
    ).fetchall()
    return jsonify(tasks), 200


# Endpoint to create a new task for current user
@bp.route('/api/kanban/tasks', methods=['POST'])
@login_required
def create_task():

    # Get data from user input
    data = request.json
    task_title = data.get('task_title')
    task_description = data.get('task_description')
    task_status = data.get('task_status', 'todo')


    # Validate title input of user
    if not task_title:
        return jsonify({'error': 'Task title is required'}), 400
    

    # Write new task into database
    db = get_db()
    db.execute(
        'INSERT INTO kanban (user_id, task_title, task_description, task_status)'
        ' VALUES (?, ?, ?, ?)', (g.user['id'], task_title, task_description, task_status)
    )
    db.commit()
    return jsonify({'message': 'Task created successfully'}), 201
    
