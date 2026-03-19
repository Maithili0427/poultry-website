export const mockOrders = [
  // Regular (auto-approved)
  { id: 1, user: 'John Doe', type: 'regular', items: ['Chicken 5kg'], status: 'delivered', total: 500 },
  // Business (pending approval)
  { id: 2, user: 'ABC Poultry', type: 'business', items: ['Wholesale Chicken 100kg'], status: 'pending', total: 5000 },
  // Business (approved w/ delivery date)
  { id: 3, user: 'XYZ Farm', type: 'business', items: ['Eggs 1000 trays'], status: 'approved', deliveryDate: '2026-03-25', total: 12000 },
];

export const updateOrderStatus = (orderId, updates) => {
  // Simulate API update
  const order = mockOrders.find(o => o.id === orderId);
  Object.assign(order, updates);
};
