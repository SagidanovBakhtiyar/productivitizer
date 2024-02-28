from flask import Blueprint, render_template, g, jsonify, request
from werkzeug.exceptions import abort
from productivitizer.auth import login_required
from productivitizer.db import get_db
import requests


bp = Blueprint("kanban", __name__)


@bp.route('/kanban', methods=['GET'])
@login_required
def kanban():
    # Fetch information about tasks from database
    db = get_db()

    tasks = db.execute(
        'SELECT * FROM kanban WHERE user_id = ?',
        (g.user['id'],)
    ).fetchall()

    return render_template('kanban/kanban.html', tasks=tasks)