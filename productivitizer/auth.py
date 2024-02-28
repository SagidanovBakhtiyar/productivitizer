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


# Implement the register function
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
        elif len(str(password)) < 8:
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


                # Login the user after register
                session.clear()
                session['user_id'] = user['id']


            except db.IntegrityError:
                error = f"User {username} is already registred."
        

        # Redirect user to index page
        if error is None:
            return redirect(url_for('index'))
        

        flash(error)
    
    return render_template('auth/register.html')


# Implement login function
@bp.route("/login", methods=('GET', 'POST'))
def login():
    if request.method == 'POST':

        # Storing the data from login form (same as register)
        username = request.form['username']
        password = request.form['password']
        db = get_db()
        error = None
        

        # Taking user data from database
        user = db.execute(
            'SELECT * FROM user WHERE username = ?', (username,)
        ).fetchone()


        # User validation
        if user is None or not check_password_hash(user['password'], password):
            error = 'Incorrect username or password.'
        

        # Return user to index page
        if error is None:
            session.clear()
            session['user_id'] = user['id']
            return redirect(url_for('index'))
        
        flash(error)
    
    return render_template('auth/login.html')


# Load the user from session
@bp.before_app_request
def load_logged_in_user():
    user_id = session.get('user_id')

    if user_id is None:
        g.user = None
    else:
        g.user = get_db().execute(
            'SELECT * FROM user WHERE id = ?', (user_id,)
        ).fetchone()


# Logout implementation
@bp.route("/logout")
def logout():
    session.clear()
    return redirect(url_for('index'))


# Check user login
def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return redirect(url_for('auth.login'))
        
        return view(**kwargs)
    
    return wrapped_view