"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, User, Product, Order, CartItem
from flask import request, jsonify
from flask_jwt_extended import create_access_token

app = Flask(__name__)
CORS(app)

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

# Registrar el blueprint en la app principal

BASE_URL = "https://ubiquitous-tribble-5p4pp7qgrr7c4wvj-3001.app.github.dev"




@api.route('/login', methods=['POST'])
def login():
    response_body = {}
    data = request.json
    
    if not data or 'email' not in data or 'password' not in data:
        response_body['message'] = "Email y contraseña requeridos"
        response_body['error'] = "Bad request"
        return response_body, 400

    user = db.session.execute(
        db.select(User).where(User.email == data['email'])
    ).scalar()

    if not user or user.password != data['password']:
        response_body['message'] = "Credenciales inválidas"
        response_body['error'] = "Unauthorized"
        return response_body, 401

    token = create_access_token(identity=user.email)
    response_body['message'] = "Login exitoso"
    response_body['results'] = {
        "token": token,
        "user": user.serialize()
    }
    return response_body, 200

@api.route('/signup', methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    
    if not data or 'username' not in data or 'password' not in data:
        response_body['message'] = "Email y contraseña requeridos"
        response_body['error'] = "Bad request"
        return response_body, 400

    if db.session.execute(db.select(User).where(User.email == data['username'])).scalar():
        response_body['message'] = "El usuario ya existe"
        response_body['error'] = "Bad request"
        return response_body, 400

    new_user = User(
        email=data['username'],
        password=data['password']
    )
    db.session.add(new_user)
    db.session.commit()

    token = create_access_token(identity=new_user.email)
    response_body['message'] = "Usuario creado exitosamente"
    response_body['results'] = {
        "token": token,
        "user": new_user.serialize()
    }
    return response_body, 201
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello from e-commerce API",
        "endpoints": {
            "products": f"{BASE_URL}/products",
            "users": f"{BASE_URL}/users",
            "orders": f"{BASE_URL}/orders",
            "cart": f"{BASE_URL}/cart/items"
        }
    }
    return response_body, 200

# PRODUCTOS
@api.route('/products', methods=['GET', 'POST'])
def handle_products():
    response_body = {}
    
    if request.method == 'GET':
        rows = db.session.execute(db.select(Product)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de productos'
        response_body['results'] = result
        return response_body, 200
    
    if request.method == 'POST':
        data = request.json
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=data['price'],
            stock=data.get('stock', 0),
            category=data.get('category', ''),
            image_url=data.get('image_url', '')
        )
        db.session.add(product)
        db.session.commit()
        
        response_body['message'] = 'Producto creado'
        response_body['results'] = product.serialize()
        return response_body, 201

@api.route('/products/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_product(id):
    response_body = {}
    product = db.session.execute(db.select(Product).where(Product.id == id)).scalar()
    
    if not product:
        response_body['message'] = f'Producto con id {id} no encontrado'
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = f'Producto con id {id}'
        response_body['results'] = product.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        product.name = data.get('name', product.name)
        product.description = data.get('description', product.description)
        product.price = data.get('price', product.price)
        product.stock = data.get('stock', product.stock)
        product.category = data.get('category', product.category)
        product.image_url = data.get('image_url', product.image_url)
        db.session.commit()
        
        response_body['message'] = f'Producto con id {id} actualizado'
        response_body['results'] = product.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(product)
        db.session.commit()
        response_body['message'] = f'Producto con id {id} eliminado'
        return response_body, 200

# USUARIOS
@api.route('/users', methods=['GET', 'POST'])
def handle_users():
    response_body = {}
    
    if request.method == 'GET':
        rows = db.session.execute(db.select(User)).scalars()
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de usuarios'
        response_body['results'] = result
        return response_body, 200
    
    if request.method == 'POST':
        data = request.json
        user = User(
            email=data['email'],
            password=data['password'],
            name=data.get('name', ''),
            address=data.get('address', ''),
            phone=data.get('phone', '')
        )
        db.session.add(user)
        db.session.commit()
        
        response_body['message'] = 'Usuario creado'
        response_body['results'] = user.serialize()
        return response_body, 201

@api.route('/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def handle_user(id):
    response_body = {}
    user = db.session.execute(db.select(User).where(User.id == id)).scalar()
    
    if not user:
        response_body['message'] = f'Usuario con id {id} no encontrado'
        return response_body, 404

    if request.method == 'GET':
        response_body['message'] = f'Usuario con id {id}'
        response_body['results'] = user.serialize()
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        user.address = data.get('address', user.address)
        user.phone = data.get('phone', user.phone)
        db.session.commit()
        
        response_body['message'] = f'Usuario con id {id} actualizado'
        response_body['results'] = user.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        response_body['message'] = f'Usuario con id {id} eliminado'
        return response_body, 200

# CARRITO

@api.route('/cart', methods=['GET', 'POST'])
def cart_operations():
    if request.method == 'GET':
    
        items = CartItem.query.all()
        return jsonify([item.serialize() for item in items]), 200

    if request.method == 'POST':
        # Añadir item al carrito
        data = request.json
        item = CartItem(
            user_id=data['user_id'],  # En producción usar current_user.id
            product_id=data['product_id'],
            quantity=data.get('quantity', 1)
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.serialize()), 201

@api.route('/cart/<int:item_id>', methods=['DELETE', 'PUT'])
def cart_item_operations(item_id):
    item = CartItem.query.get(item_id)
    if not item:
        return jsonify({"error": "Item no encontrado"}), 404

    if request.method == 'DELETE':
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item eliminado"}), 200
        item.quantity = data.get('quantity', item.quantity)
    if request.method == 'PUT':
        if request.method == 'PUT':
            data = request.json
            item.quantity = data.get('quantity', item.quantity)
            db.session.commit()
            return jsonify(item.serialize()), 200
        

@api.route('/test/', methods=['POST'])
def test():
    
        return jsonify({"error": "test"}), 200

   