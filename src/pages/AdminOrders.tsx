import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';  // ✅ Added missing import
import { mockOrders, updateOrderStatus } from '../data/orders';
import { Calendar, Truck, CheckCircle, X, Edit } from 'lucide-react';
import { format } from 'date-fns';

const AdminOrders = () => {
  const { user, updateUser } = useAuth();  // ✅ Added updateUser
  const [editingId, setEditingId] = useState(null);
  const [deliveryDate, setDeliveryDate] = useState('');

  // ✅ BLOCK 1: PAGE ACCESS - Clean protection
  if (user?.role !== 'admin') {
    return (
      <div className="container-max p-8 text-center text-red-600">
        Admin access required. <Link to="/">Go Home</Link>
      </div>
    );
  }

  // ✅ FIXED: Proper approveOrder function
  const approveOrder = (orderId) => {
    const order = mockOrders.find(o => o.id === orderId);
    if (order && order.type === 'business') {
      // Update order status + delivery date
      updateOrderStatus(orderId, { 
        status: 'approved', 
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // +7 days
      });
      
      // TODO: Approve business user (needs mockUsers data)
      // const businessUser = mockUsers.find(u => u.id === order.userId);
      // if (businessUser) updateUser({ businessApproved: true });
    }
  };

  const updateDelivery = (orderId) => {
    updateOrderStatus(orderId, { deliveryDate: new Date(deliveryDate) });
    setEditingId(null);
    setDeliveryDate('');
  };

  const ordersByStatus = useMemo(() => {
    return {
      pending: mockOrders.filter(o => o.status === 'pending'),
      approved: mockOrders.filter(o => o.status === 'approved'),
      completed: mockOrders.filter(o => ['delivered', 'cancelled'].includes(o.status))
    };
  }, []);

  return (
    <div className="container-max p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Truck className="w-12 h-12 text-primary-red" />
        <div>
          <h1 className="text-3xl font-bold text-foreground">Order Management</h1>
          <p className="text-muted-foreground">Approve business orders & set delivery dates</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-yellow-600">{ordersByStatus.pending.length}</div>
          <div className="text-sm text-yellow-700 dark:text-yellow-300">Pending Approvals</div>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-green-600">{ordersByStatus.approved.length}</div>
          <div className="text-sm text-green-700 dark:text-green-300">Approved</div>
        </div>
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl text-center">
          <div className="text-3xl font-bold text-gray-600">{ordersByStatus.completed.length}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </div>
      </div>

      {/* Pending Business Orders */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <X className="w-6 h-6 text-yellow-500" />
          Pending Approvals ({ordersByStatus.pending.length})
        </h2>
        <div className="grid gap-4">
          {ordersByStatus.pending.map(order => (
            <div key={order.id} className="bg-card p-6 rounded-xl border-l-4 border-yellow-500 shadow-md hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-xl">{order.user}</h3>
                  <p className="text-2xl font-bold text-primary-green">₹{order.total}</p>
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Business - {order.items.join(', ')}
                  </span>
                </div>
                <button
                  onClick={() => approveOrder(order.id)}
                  className="bg-primary-red hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  Approve & Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Approved Orders */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Approved Orders</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ordersByStatus.approved.map(order => (
            <div key={order.id} className="bg-card p-6 rounded-xl border shadow-md hover:shadow-lg transition-all">
              <h3 className="font-bold mb-2">{order.user}</h3>
              <p className="text-primary-green font-bold mb-3">₹{order.total}</p>
              <div className="flex items-center gap-2 text-sm mb-4">
                <Calendar className="w-4 h-4 text-green-600" />
                {order.deliveryDate && format(new Date(order.deliveryDate), 'MMM dd, yyyy')}
                {editingId === order.id && (
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="ml-2 p-1 border rounded text-sm bg-white focus:ring-2 focus:ring-primary"
                  />
                )}
              </div>
              <div className="flex gap-2">
                {editingId === order.id ? (
                  <button
                    onClick={() => updateDelivery(order.id)}
                    className="bg-primary-green text-white px-4 py-1 rounded font-medium flex items-center gap-1 text-sm shadow hover:shadow-md transition-all"
                  >
                    <CheckCircle className="w-4 h-4" /> Save
                  </button>
                ) : (
                  <button
                    onClick={() => { 
                      setEditingId(order.id); 
                      setDeliveryDate(order.deliveryDate ? format(new Date(order.deliveryDate), 'yyyy-MM-dd') : ''); 
                    }}
                    className="text-primary-red hover:underline flex items-center gap-1 text-sm hover:bg-red-50 px-2 py-1 rounded transition-all"
                  >
                    <Edit className="w-4 h-4" /> Edit Delivery
                  </button>
                )}
                <button className="text-gray-500 hover:text-red-500 text-sm hover:bg-red-50 px-2 py-1 rounded transition-all">
                  Cancel Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminOrders;
