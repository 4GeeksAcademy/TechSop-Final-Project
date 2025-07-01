export const cartService = {
  getCart: () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
  },

  addToCart: (product, quantity = 1) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
  },

  removeFromCart: (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  },

  clearCart: () => {
    localStorage.removeItem('cart');
  }
};