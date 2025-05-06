// Centralized food database
export const foodCategories = [
  {
    id: "breads-grains",
    name: "Breads & Grains",
    foods: [
      {
        id: 101,
        name: "White Bread",
        servingSize: "1 slice (30g)",
        carbsPerServing: 15,
        glycemicIndex: 70,
      },
      {
        id: 102,
        name: "Whole Wheat Bread",
        servingSize: "1 slice (30g)",
        carbsPerServing: 12,
        glycemicIndex: 50,
      },
      {
        id: 103,
        name: "Pita Bread",
        servingSize: "1 small (60g)",
        carbsPerServing: 30,
        glycemicIndex: 57,
      },
      {
        id: 104,
        name: "Bagel",
        servingSize: "1 (70g)",
        carbsPerServing: 35,
        glycemicIndex: 72,
      },
      {
        id: 105,
        name: "White Rice (cooked)",
        servingSize: "1/2 cup (100g)",
        carbsPerServing: 28,
        glycemicIndex: 73,
      },
      {
        id: 106,
        name: "Brown Rice (cooked)",
        servingSize: "1/2 cup (100g)",
        carbsPerServing: 23,
        glycemicIndex: 50,
      },
      {
        id: 107,
        name: "Pasta (cooked)",
        servingSize: "1 cup (150g)",
        carbsPerServing: 45,
        glycemicIndex: 55,
      },
      {
        id: 108,
        name: "Couscous (cooked)",
        servingSize: "1/2 cup (100g)",
        carbsPerServing: 23,
        glycemicIndex: 65,
      },
    ],
  },
  {
    id: "fruits",
    name: "Fruits",
    foods: [
      {
        id: 201,
        name: "Apple",
        servingSize: "1 medium (120g)",
        carbsPerServing: 15,
        glycemicIndex: 38,
      },
      {
        id: 202,
        name: "Banana",
        servingSize: "1 medium (120g)",
        carbsPerServing: 27,
        glycemicIndex: 51,
      },
      {
        id: 203,
        name: "Orange",
        servingSize: "1 medium (150g)",
        carbsPerServing: 15,
        glycemicIndex: 40,
      },
      {
        id: 204,
        name: "Grapes",
        servingSize: "15 grapes (100g)",
        carbsPerServing: 18,
        glycemicIndex: 59,
      },
      {
        id: 205,
        name: "Watermelon",
        servingSize: "1 slice (150g)",
        carbsPerServing: 11,
        glycemicIndex: 72,
      },
      {
        id: 206,
        name: "Strawberries",
        servingSize: "1 cup (150g)",
        carbsPerServing: 8,
        glycemicIndex: 40,
      },
    ],
  },
  {
    id: "vegetables",
    name: "Vegetables",
    foods: [
      {
        id: 301,
        name: "Potato (baked)",
        servingSize: "1 medium (150g)",
        carbsPerServing: 30,
        glycemicIndex: 85,
      },
      {
        id: 302,
        name: "Sweet Potato",
        servingSize: "1 medium (150g)",
        carbsPerServing: 24,
        glycemicIndex: 70,
      },
      {
        id: 303,
        name: "Corn",
        servingSize: "1/2 cup (80g)",
        carbsPerServing: 15,
        glycemicIndex: 55,
      },
      {
        id: 304,
        name: "Carrots (cooked)",
        servingSize: "1/2 cup (80g)",
        carbsPerServing: 6,
        glycemicIndex: 35,
      },
      {
        id: 305,
        name: "Broccoli",
        servingSize: "1 cup (90g)",
        carbsPerServing: 4,
        glycemicIndex: 15,
      },
    ],
  },
  {
    id: "dairy",
    name: "Dairy",
    foods: [
      {
        id: 401,
        name: "Milk",
        servingSize: "1 cup (240ml)",
        carbsPerServing: 12,
        glycemicIndex: 30,
      },
      {
        id: 402,
        name: "Plain Yogurt",
        servingSize: "1 container (170g)",
        carbsPerServing: 17,
        glycemicIndex: 35,
      },
      {
        id: 403,
        name: "Chocolate Milk",
        servingSize: "1 cup (240ml)",
        carbsPerServing: 26,
        glycemicIndex: 40,
      },
    ],
  },
  {
    id: "snacks-sweets",
    name: "Snacks & Sweets",
    foods: [
      {
        id: 501,
        name: "Chocolate Bar",
        servingSize: "1 bar (40g)",
        carbsPerServing: 25,
        glycemicIndex: 45,
      },
      {
        id: 502,
        name: "Ice Cream",
        servingSize: "1/2 cup (65g)",
        carbsPerServing: 15,
        glycemicIndex: 60,
      },
      {
        id: 503,
        name: "Potato Chips",
        servingSize: "1 small bag (30g)",
        carbsPerServing: 15,
        glycemicIndex: 55,
      },
      {
        id: 504,
        name: "Cereal Bar",
        servingSize: "1 bar (30g)",
        carbsPerServing: 20,
        glycemicIndex: 70,
      },
    ],
  },
];

// Function to get all foods as flattened array
export const getAllFoods = () => {
  return foodCategories.flatMap((category) => category.foods);
};

// Function to search foods by name
export const searchFoods = (query) => {
  if (!query) return getAllFoods();

  const searchTerm = query.toLowerCase();
  return getAllFoods().filter((food) =>
    food.name.toLowerCase().includes(searchTerm)
  );
};

// Function to get food by ID
export const getFoodById = (id) => {
  return getAllFoods().find((food) => food.id === id);
};
