from flask import Blueprint, render_template

bp = Blueprint('kanban', __name__)


@bp.route('/kanban')
def kanban():
    return render_template('kanban/kanban.html')