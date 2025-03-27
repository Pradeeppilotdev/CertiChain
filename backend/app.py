from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
import uuid
import bcrypt
from flask_cors import CORS
from datetime import timedelta
from flask import Flask, request, jsonify, session
from flask_session import Session



app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'Hello World'  # Use a strong secret key
app.config['SESSION_TYPE'] = 'filesystem'  
app.config['SESSION_PERMANENT'] = True   # Storing sessions locally
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
Session(app)

# Initialize Firebase
cred = credentials.Certificate('./project-9e286-firebase-adminsdk-fpe81-9734ba2708.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

# Register API
@app.route('/adminregister', methods=['POST'])
def register():
    data = request.json
    institution_name = data.get('Institutionname')
    email = data.get('mail')
    password = data.get('password')

    if not institution_name or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # Check if email already exists
    existing_admin = db.collection('admincredentials').where('mail', '==', email).get()
    if existing_admin:
        return jsonify({'error': 'Email already registered'}), 409

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Generate unique ID
    admin_id = str(uuid.uuid4())

    # Store data in Firestore
    db.collection('admincredentials').document(admin_id).set({
        'Institutionname': institution_name,
        'mail': email,
        'password': hashed_password.decode('utf-8'),
        'ID': admin_id
    })

    print(admin_id)

    return jsonify({'message': 'Admin registered successfully', 'admin_id': admin_id}), 201


# Login API
@app.route('/adminlogin', methods=['POST'])
def login():
    data = request.json
    email = data.get('mail')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Retrieve admin details from Firestore
    admin_query = db.collection('admincredentials').where('mail', '==', email).get()
    
    if not admin_query:
        return jsonify({'error': 'Invalid email or password'}), 401

    admin_data = admin_query[0].to_dict()
    stored_password = admin_data['password']

    # Verify password
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        print(admin_data['ID'])
        session["admin"] = admin_data['ID']
        print(session["admin"])
        session.permanent = True
        session.modified = True
        return jsonify({'message': 'Login successful', 'admin_id': admin_data['ID']}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401
    
# Register API
@app.route('/userregister', methods=['POST'])
def userregister():
    data = request.json
    username = data.get('username')
    email = data.get('mail')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({'error': 'All fields are required'}), 400

    # Check if email already exists
    existing_user = db.collection('usercredentials').where('email', '==', email).get()
    if existing_user:
        return jsonify({'error': 'Email already registered'}), 409

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Generate unique ID
    user_id = str(uuid.uuid4())

    # Store data in Firestore
    db.collection('usercredentials').document(user_id).set({
        'username': username,
        'email': email,
        'password': hashed_password.decode('utf-8'),
        'ID': user_id
    })

    return jsonify({'message': 'User registered successfully', 'user_id': user_id}), 201


# Login API
@app.route('/userlogin', methods=['POST'])
def userlogin():
    data = request.json
    email = data.get('mail')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Retrieve user details from Firestore
    user_query = db.collection('usercredentials').where('email', '==', email).get()
    
    if not user_query:
        return jsonify({'error': 'Invalid email or password'}), 401

    user_data = user_query[0].to_dict()
    stored_password = user_data['password']

    # Verify password
    if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
        return jsonify({'message': 'Login successful', 'user_id': user_data['ID']}), 200
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/upload_certificate', methods=['POST'])
def upload_certificate():
    try:
        data = request.json
        achiever_id = data.get('achiever_id')
        ipfs_hash = data.get('ipfs_hash')
        current_admin = '117f8a99-9b0d-4526-82fc-bac8f5255da4'
        print("Session Data:", current_admin) # Fetch from request instead of session

        if not all([current_admin, achiever_id, ipfs_hash]):
            return jsonify({"error": "Missing data"}), 400

        # Upload to admincredentials
        admin_ref = db.collection('admincredentials').document(current_admin)
        admin_ref.set({
            'ipfshash': firestore.ArrayUnion([ipfs_hash])
        }, merge=True)

        # Upload to usercredentials
        user_ref = db.collection('usercredentials').where('username', '==', achiever_id).limit(1)
        docs = user_ref.stream()

        doc_found = False
        for doc in docs:
            doc.reference.set({
            'ipfshash': firestore.ArrayUnion([ipfs_hash])
            }, merge=True)
            doc_found = True
            break

        return jsonify({"message": "IPFS hash uploaded successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@app.route('/get_hashes', methods=['GET'])
def get_hashes():
    print("Function executing")

    try:
        achiever_id = '73152313007'

        try:
            db.collection('usercredentials').limit(1).get()
            print("Firestore connection successful.")
        except Exception as e:
            print(f"Firestore connection failed: {e}")


        if not achiever_id:
            return jsonify({"error": "Achiever ID is required"}), 400

        certificates_ref = db.collection('usercredentials')
        query_ref = certificates_ref.where('username', '==', achiever_id).stream()

        hashes = [doc.to_dict().get('ipfshash') for doc in query_ref if 'ipfshash' in doc.to_dict()]
        print("Hashes:", hashes)

        return jsonify({"hashes": hashes}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
