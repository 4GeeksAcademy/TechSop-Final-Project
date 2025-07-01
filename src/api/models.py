from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    name = db.Column(db.String(80))
    address = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    is_admin = db.Column(db.Boolean, default=False)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'name': self.name,
            'address': self.address,
            'phone': self.phone
        }

class Product(db.Model):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    stock = db.Column(db.Integer, nullable=False, default=0)
    category = db.Column(db.String(50))
    image_url = db.Column(db.String(200))  # Cambia esto si usas archivos locales

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price) if self.price else 0.0,  # Asegura float
            'stock': self.stock,
            'category': self.category,
            'image_url': self.image_url  
        }

class Order(db.Model):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    total = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, completed, cancelled
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship('User', backref='orders')

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'status': self.status,
            'created_at': self.created_at
        }

class OrderItem(db.Model):
    __tablename__ = 'order_items'
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)  # precio al momento de la compra

    order = db.relationship('Order', backref='items')
    product = db.relationship('Product')

    def serialize(self):
        return {
            'id': self.id,
            'order_id': self.order_id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'price': self.price,
            'product': self.product.serialize() if self.product else None
        }

class Cart(db.Model):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), unique=True)
    
    items = db.relationship('CartItem', backref='cart', cascade='all, delete-orphan')

    def serialize(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'items': [item.serialize() for item in self.items]
        }

class CartItem(db.Model):
    __tablename__ = 'cart_items'
    id = db.Column(db.Integer, primary_key=True)
    cart_id = db.Column(db.Integer, db.ForeignKey('cart.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
    quantity = db.Column(db.Integer, default=1)

    product = db.relationship('Product')

    def serialize(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'quantity': self.quantity,
            'product': self.product.serialize() if self.product else None
        }