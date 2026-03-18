import os
from flask import Flask, render_template, redirect, url_for, request, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import bcrypt

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

# Single hardcoded user
USERS = {
    'bobby': {
        'id': '1',
        'username': 'bobby',
        'password_hash': '$2b$12$1pwqgpYx24QHWJ27z.fGr.mwGBXfWIB2V3WlL7g7ESLSE9J3BLvDu'
    }
}


class User(UserMixin):
    def __init__(self, user_data):
        self.id = user_data['id']
        self.username = user_data['username']
        self.password_hash = user_data['password_hash']


@login_manager.user_loader
def load_user(user_id):
    for data in USERS.values():
        if data['id'] == user_id:
            return User(data)
    return None


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('dashboard'))

    if request.method == 'POST':
        username = request.form.get('username', '').lower()
        password = request.form.get('password', '')

        user_data = USERS.get(username)
        if user_data and bcrypt.checkpw(password.encode(), user_data['password_hash'].encode()):
            login_user(User(user_data))
            next_page = request.args.get('next')
            return redirect(next_page or url_for('dashboard'))

        flash('Invalid username or password', 'error')

    return render_template('login.html')


@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))


@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run(debug=True)
