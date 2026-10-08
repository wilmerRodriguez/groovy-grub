export const CATEGORIES = ['All', 'Bowls', 'Snacks', 'Drinks', 'Sweets']

export const products = [
  { id: 'sunrise-bowl', name: 'Sunrise Açaí Bowl', category: 'Bowls', price: 9.5, emoji: '🥣', color: '#ffd23f', rating: 4.8, reviews: 214, tags: ['vegan', 'gluten-free'], description: 'Thick açaí blended with banana, topped with crunchy granola, fresh berries and a drizzle of wildflower honey (or agave, if you like).' },
  { id: 'taco-trio', name: 'Taco Trio Box', category: 'Bowls', price: 12.0, emoji: '🌮', color: '#ff8c42', rating: 4.9, reviews: 388, tags: ['spicy', 'bestseller'], description: 'Three soft-shell tacos: chipotle chicken, smoky black bean and grilled halloumi, with lime crema and pickled onions on the side.' },
  { id: 'buddha-bowl', name: 'Green Goddess Bowl', category: 'Bowls', price: 11.0, emoji: '🥗', color: '#7bd389', rating: 4.6, reviews: 156, tags: ['vegan', 'high-protein'], description: 'Quinoa, roasted chickpeas, avocado, kale and cucumber tossed in a zingy green goddess dressing.' },
  { id: 'ramen-kit', name: 'Midnight Ramen Kit', category: 'Bowls', price: 13.5, emoji: '🍜', color: '#ff5a36', rating: 4.7, reviews: 201, tags: ['comfort', 'spicy'], description: 'Slow-simmered miso broth, springy noodles, a jammy egg and chili oil. Ready in 6 minutes.' },
  { id: 'loaded-fries', name: 'Loaded Fries', category: 'Snacks', price: 6.5, emoji: '🍟', color: '#ffd23f', rating: 4.5, reviews: 432, tags: ['shareable'], description: 'Crispy skin-on fries smothered in cheddar sauce, spring onions and a secret paprika salt.' },
  { id: 'nacho-stack', name: 'Nacho Stack', category: 'Snacks', price: 7.5, emoji: '🧀', color: '#ff8c42', rating: 4.4, reviews: 178, tags: ['shareable', 'vegetarian'], description: 'Tortilla chips layered with queso, jalapeños, pico de gallo and a cool dollop of sour cream.' },
  { id: 'dumplings', name: 'Bao & Dumpling Box', category: 'Snacks', price: 8.5, emoji: '🥟', color: '#c3a6ff', rating: 4.8, reviews: 267, tags: ['bestseller'], description: 'Six pan-fried pork and ginger dumplings plus two fluffy bao buns with hoisin glaze.' },
  { id: 'mango-lassi', name: 'Mango Lassi', category: 'Drinks', price: 4.5, emoji: '🥭', color: '#ffd23f', rating: 4.9, reviews: 310, tags: ['vegetarian'], description: 'Alphonso mango whipped with creamy yogurt and a whisper of cardamom.' },
  { id: 'cold-brew', name: 'Cold Brew Tonic', category: 'Drinks', price: 4.0, emoji: '🧋', color: '#a0775a', rating: 4.6, reviews: 189, tags: ['caffeine'], description: '18-hour cold brew poured over sparkling tonic with an orange twist. Bright, bitter, brilliant.' },
  { id: 'berry-smoothie', name: 'Berry Blast Smoothie', category: 'Drinks', price: 5.0, emoji: '🍓', color: '#ff6fb5', rating: 4.7, reviews: 142, tags: ['vegan'], description: 'Strawberries, blueberries, oat milk and a scoop of almond butter for staying power.' },
  { id: 'churros', name: 'Cinnamon Churros', category: 'Sweets', price: 5.5, emoji: '🍩', color: '#ff8c42', rating: 4.8, reviews: 256, tags: ['vegetarian', 'shareable'], description: 'Golden churros rolled in cinnamon sugar with a pot of dark chocolate dipping sauce.' },
  { id: 'mochi', name: 'Mochi Ice Cream Trio', category: 'Sweets', price: 6.0, emoji: '🍡', color: '#c3a6ff', rating: 4.6, reviews: 98, tags: ['gluten-free'], description: 'Matcha, strawberry and black sesame mochi wrapped around silky ice cream.' },
]

export const getProduct = (id) => products.find((p) => p.id === id)
