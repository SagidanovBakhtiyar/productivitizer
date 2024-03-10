from flask import Blueprint, render_template, g, jsonify, request
from productivitizer.auth import login_required
from productivitizer.db import get_db


bp = Blueprint('finance', __name__)


# Finance tracker api
"""
create_expense - POST,
read_expense - GET,
delete_expense - DELETE,

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


    # Validate user input
    if not expense_title or not amount:
        return jsonify({"error": "Expense title and amount required"}), 400
    
    # Insert new expense into database
    db = get_db()
    db.execute(
        "INSERT INTO expense (user_id, expense_title, expense_description, amount) VALUES (?, ?, ?, ?)",
        (g.user["id"], expense_title, expense_description, amount),
    )
    db.commit()

    return jsonify({"message": "Expense created successfully"}), 201


# Endpoint for fetching user expenses
@bp.route("/finance/read", methods=["GET"])
@login_required
def read_expense():

    # Fetch data from database
    db = get_db()

    expenses = db.execute(
        "SELECT * FROM expense WHERE user_id = ?", (g.user["id"],)
    ).fetchall()

    total = db.execute(
        "SELECT SUM(amount) as total FROM expense WHERE user_id = ?",
        (g.user["id"],)
    ).fetchone()

    # Validate empty expense
    if not expenses:
        return jsonify({"expenses": [], "total": 0})  # Return an empty list and total of 0 if there are no expenses

    # Convert expenses to list of dictionaries
    expense_list = []
    for expense in expenses:
        expense_dict = {
            "id": expense["id"],
            "expense_title": expense["expense_title"],
            "expense_description": expense["expense_description"],
            "amount": expense["amount"],
            "expense_date": expense["expense_date"]
        }
        expense_list.append(expense_dict)

    # Return expenses list and total as JSON
    return jsonify({"expenses": expense_list, "total": total["total"]})



# Endpont to delete expense
@bp.route("/finance/delete/<int:expense_id>", methods=["DELETE"])
@login_required
def delete_expense(expense_id):

    # Fetch expense
    db = get_db()
    expense = db.execute(
        "SELECT * FROM expense WHERE id = ? AND user_id = ?", (expense_id, g.user["id"])
    ).fetchone()

    # Check if the expense exists
    if not expense:
        return jsonify({"error": "Expense not found"}), 404
    
    # Verify user permission
    if expense["user_id"] != g.user["id"]:
        return jsonify({"error": "You do not have permission to delete this expense"}), 403
    
    # Delete expense 
    db.execute(
        "DELETE FROM expense WHERE id = ? AND user_id = ?", (expense_id, g.user["id"])
    )
    db.commit()

    return jsonify({"message": "Expense deleted successfully"}), 200


# Endpoint to clear all expenses
@bp.route("/finance/clear", methods=["DELETE"])
@login_required
def clear_expense():

    db = get_db()

    db.execute(
        "DELETE FROM expense WHERE user_id = ?",
        (g.user["id"],)
    )
    db.commit()

    return jsonify({"message": "All expenses deleted successfully"}), 200