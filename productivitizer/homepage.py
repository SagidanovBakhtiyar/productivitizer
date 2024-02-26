from flask import (
    Blueprint,
    redirect,
    render_template,
)

bp = Blueprint('homepage', __name__)


@bp.route('/')
def index():
    return render_template('index.html')