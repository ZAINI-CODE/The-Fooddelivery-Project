// API base URL
const API_BASE_URL = 'http://localhost:5000';

// Helper function to make GET requests
async function apiGet(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

window.api = {
  // shops
  getShops: () => apiGet('/api/shops'),
  getShopProducts: (shopId) => apiGet(`/api/shops/${shopId}/products`),
  getAllProducts: () => apiGet('/api/shops/products'),

  // restaurants
  getRestaurants: (queryString = '') =>
    apiGet(`/api/restaurants${queryString ? `?${queryString}` : ''}`),
  getRestaurantById: (id) => apiGet(`/api/restaurants/${id}`),
  getRestaurantMenu: (id) => apiGet(`/api/restaurants/${id}/menu`),

  // burgers
  getBurgers: (queryString = '') =>
    apiGet(`/api/burgers${queryString ? `?${queryString}` : ''}`),
  getBurgerById: (id) => apiGet(`/api/burgers/${id}`),

  // drinks
  getDrinks: (queryString = '') =>
    apiGet(`/api/drinks${queryString ? `?${queryString}` : ''}`),
  getDrinkById: (id) => apiGet(`/api/drinks/${id}`),

  // brands
  getBrands: (queryString = '') =>
    apiGet(`/api/brands${queryString ? `?${queryString}` : ''}`),
  getBrandById: (id) => apiGet(`/api/brands/${id}`)
};