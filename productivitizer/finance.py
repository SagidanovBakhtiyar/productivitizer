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


# Endpoint for creating the expence
@bp.route("/finance/create", methods=["POST"])
@login_required
def create_expense():

    # Get data from front-end request
    data = request.json
    expense_title = data.get("expense_title")
    expense_description = data.get("expense_description")
    amount = data.get("amount")

    if not expense_title and amount <= 0:
        return jsonify({"error": "Expense title and amount required"}), 400
    
    db = get_db()
    db.execute(
        "INSERT INTO expense (user_id, expense_title, expense_description, amount) VALUES (?, ?, ?, ?)",
        (g.user["id"], expense_title, expense_description, amount),
    )
    
