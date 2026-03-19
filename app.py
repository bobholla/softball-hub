import os
from flask import Flask, render_template, redirect, url_for, request, flash, send_from_directory
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
import bcrypt

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'dev-key-change-in-production')

CHARLIE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'charlie')

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
    return send_from_directory(CHARLIE_DIR, 'index.html')


@app.route('/hub')
def hub():
    return render_template('index.html')


@app.route('/styles.css')
def charlie_styles():
    return send_from_directory(CHARLIE_DIR, 'styles.css')


@app.route('/components/<path:filename>')
def charlie_components(filename):
    return send_from_directory(os.path.join(CHARLIE_DIR, 'components'), filename)


@app.route('/recruiting/<path:filename>')
def charlie_recruiting(filename):
    return send_from_directory(os.path.join(CHARLIE_DIR, 'recruiting'), filename)


@app.route('/training/<path:filename>')
def charlie_training(filename):
    return send_from_directory(os.path.join(CHARLIE_DIR, 'training'), filename)


@app.route('/pitch-calling/<path:filename>')
def charlie_pitch_calling(filename):
    return send_from_directory(os.path.join(CHARLIE_DIR, 'pitch-calling'), filename)


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
