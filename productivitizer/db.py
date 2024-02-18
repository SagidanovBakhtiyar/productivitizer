import sqlite3, click
from flask import current_app, g


def get_db():
    # (g) is a app context
    if 'db' not in g:
        # Store the database in current application
        g.db = sqlite3.connect(
            current_app.config['DATABASE'],
            detect_types=sqlite3.PARSE_DECLTYPES
        )
        g.db.row_factory = sqlite3.Row

    # returning current app with connected database
    return g.db


# Closing the database from app and ensuring the database is closed
def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()


# Initialize database using terminal
def init_db():
    db = get_db()

    with current_app.open_resource('schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables"""
    init_db()
    click.echo('Initialized the database')


# Registration of init command to app
def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)