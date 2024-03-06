from flask import Blueprint, render_template, g, jsonify, request
from productivitizer.auth import login_required
from productivitizer.db import get_db


bp = Blueprint('finance', __name__)


# Finance tracker api
"""
Here

"""

# Endpoint for webpage view
@bp.route("/finance")
@login_required
def finance():
    return render_template("finance/finance.html")