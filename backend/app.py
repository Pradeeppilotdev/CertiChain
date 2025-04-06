from flask import Flask, request, jsonify, redirect
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
import bcrypt
from flask_login import LoginManager, UserMixin, login_user, logout_user, current_user
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from datetime import timedelta
from flask import Flask, request, jsonify, session
from flask_session import Session
import os

app = Flask(__name__)

CORS(app,supports_credentials=True, resources={r"/*": {"origins":"http://localhost:5173"}})

app.secret_key = "HelloWorld"
app.config["SESSION_PERMANENT"] = True
app.config["PERMANENT_SESSION_LIFETIMT"] = timedelta(days = 1)

cred = credentials.Certificate("certichain-cbabe-firebase-adminsdk-fbsvc-cded7f77d3.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"


@app.route("/admin_register", methods=["POST"])
def admin_register():
    data = request.json

    admin_name = data.get("institutionName")
    admin_mail = data.get("email")
    password = data.get("password")

    if not admin_name or not admin_mail or not password:
        return jsonify({"error": "All fields are required"})
    
    admin_query = db.collection("adminCredentials").where("admin_mail", "==", admin_mail).stream()
    if any(admin_query):
        return jsonify({"error": "Email already registered"})
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    admin_id = str(uuid.uuid4())

    db.collection("adminCredentials").document(admin_id).set({
        "admin_id": admin_id,
        "admin_name": admin_name,
        "admin_mail": admin_mail,
        "password": hashed_password
    })

    return jsonify({"message": "Registration Successful", "redirect": "http://localhost:5173/logpage"}), 200

@app.route("/user_register", methods=["POST"])
def user_register():
    data = request.json

    user_name = data.get("userName")
    user_mail = data.get("email")
    password = data.get("password")

    if not user_name or not user_mail or not password:
        return jsonify({"error": "All fields are required"})
    
    admin_query = db.collection("userCredentials").where("user_mail", "==", user_mail).stream()
    if any(admin_query):
        return jsonify({"error": "Email already registered"})
    
    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user_id = str(uuid.uuid4())

    db.collection("userCredentials").document(user_id).set({
        "user_id": user_id,
        "user_name": user_name,
        "user_mail": user_mail,
        "password": hashed_password,
        "walletaddress": ""
    })

    return jsonify({"message": "Registration Successful", "redirect": "http://localhost:5173/logpage"}), 200


@app.route("/admin_login", methods=["POST"])
def admin_login():
    data = request.json

    admin_mail = data.get("email")
    password = data.get("password")

    if not admin_mail or not password:
        return jsonify({"error" : "All fields are required"})
    
    admin_query = db.collection("adminCredentials").where("admin_mail", "==", admin_mail).stream()
    admin_data = next(admin_query, None)

    if not admin_data:
        return jsonify({"error" : "User doesn't exists"})
    
    admin_dict = admin_data.to_dict()
    loggedAdminID = admin_dict.get("admin_id")

    if not bcrypt.check_password_hash(admin_dict["password"], password):
        return jsonify({"error" : "Invalid Credentials"})
    
    session["admin"] = loggedAdminID
    print(session["admin"])

    return jsonify({"message" : "Login Successful", "redirect": "http://localhost:5173/admin"})


@app.route("/user_login", methods=["POST"])
def user_login():
    print("Login route hit!") 

    data = request.json
    user_mail = data.get("email")
    password = data.get("password")

    if not user_mail or not password:
        return jsonify({"error": "All fields are required"}), 400

    user_query = db.collection("userCredentials").where("user_mail", "==", user_mail).stream()
    user_data = next(user_query, None)

    if not user_data:
        return jsonify({"error": "User doesn't exist"}), 404

    user_dict = user_data.to_dict()
    loggedUserID = user_dict.get("user_id")

    if not bcrypt.check_password_hash(user_dict["password"], password):
        return jsonify({"error": "Invalid Credentials"}), 401

    session["user"] = loggedUserID
    print("Session set for user:", session["user"])

    if "walletaddress" in user_dict and user_dict["walletaddress"]:
        return jsonify({
            "message": "Login Successful",
            "redirect": "http://localhost:5173/student"
        })
    else:
        return jsonify({
            "message": "Login Successful",
            "redirect": "http://localhost:5173/connect"
        })
    

@app.route('/addwalletaddress', methods=['POST'])
def add_wallet_address():
    if 'user' not in session:
        return jsonify({'error': 'Unauthorized'}), 401

    data = request.json
    wallet_address = data.get('wallet_address')
    if not wallet_address:
        return jsonify({'error': 'Missing wallet address'}), 400

    user_id = session['user']

    
    user_docs = db.collection("userCredentials").where("user_id", "==", user_id).stream()
    user_doc = next(user_docs, None)

    if not user_doc:
        return jsonify({"error": "User not found"}), 404

    db.collection("userCredentials").document(user_doc.id).update({
        "walletaddress": wallet_address
    })

    return jsonify({'message': 'Wallet address saved'})





if __name__ == '__main__':
    app.run(debug=True)
