from flask import Blueprint, render_template

bp = Blueprint("pomodoro", __name__)


@bp.route("/pomodoro")
def pomodoro():
    return render_template("pomodoro/pomodoro.html")
