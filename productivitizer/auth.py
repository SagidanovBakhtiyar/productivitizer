import functools
from flask import (
    Blueprint,
    flash, 
    g, 
    redirect, 
    render_template,
    request,
    session,
    url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from productivitizer.db import get_db


# Setting up auth Blueprint to plugin main app
bp = Blueprint('auth', __name__, url_prefix='/auth')


# Implementing the register function
@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':

        # Storing the data from register form
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None


        # User input validation checks
        if not username:
            error = 'Username is required.'
        elif not password:
            error = 'Password is required.'
        elif len(str(password)) <= 8:
            error = 'Password length must be at least 8 characters.'

        
        # Writing the new user to database
        if error is None:
            try:
                # Hashing the user password.
                db.execute(
                    "INSERT INTO user (username, password) VALUES (?, ?)",
                    (username, generate_password_hash(password)),
                )
                db.commit()


                # Fetch the user_id from database
                user = db.execute(
                    'SELECT * FROM user WHERE username = ?', (username,)
                ).fetchone()


                # Login the user after register and redirect tot the index page
                session.clear()
                session['user_id'] = user['id']


                # Redirect the user to homepage
                return redirect('/')

            except db.IntegrityError:
                error = f"User {username} is already registred."
        
        flash(error)
    
    return render_template('auth/register.html')