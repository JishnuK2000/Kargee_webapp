import { useState, useEffect } from "react";
import Layout from "../../components/layout";
import api from "../../..//Services/apiService";
import OrderDetail from "./OrderDetail";

interface Address {
  name?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface User {
  _id: string;
  name: string;
  mobile: string;
  profilePicture?: string;
  addresses?: Address[];
}

export interface OrderProduct {
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export interface Order {
  _id: string;
  products: OrderProduct[];
  address: any;
  paymentMethod: string;
  totalAmount: number;
  status?: string;
  createdAt?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (activeTab === "orders" && accessToken) {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchOrders = async () => {
    try {
      setLoadingOrders(true);
      setOrdersError("");
      const res = await api.get(`/orders/user/${user?._id}`);
      setOrders(res.data.orders || res.data || []);
    } catch (err: any) {
      setOrdersError("Failed to load orders. Please try again later.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await api.put(
        `/user/profile`,
        {
          name: user.name,
          profilePicture: user.profilePicture,
          addresses: user.addresses,
        }
      );

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      setEditMode(false);
      setMessage("Profile updated successfully");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center font-inter">
          <p className="text-gray-600">Please login to view your profile</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-[#F5ECE6] font-inter p-4 md:p-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">

          {/* 🔥 LEFT SIDEBAR */}
          <div className="md:w-1/4 w-full">
            <div className="bg-[#EADFD8] p-4  space-y-3">

              {[
                { key: "profile", label: "Personal Information" },
                { key: "orders", label: "My Orders" },
                { key: "address", label: "Manage Address" },
                { key: "payment", label: "Payment Method" },
              ].map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setActiveTab(item.key);
                    if (item.key !== "orders") setSelectedOrderId(null);
                  }}
                  className={`w-full text-left px-4 py-3  transition ${activeTab === item.key
                    ? "bg-[#E3B15F] text-black font-medium"
                    : "bg-transparent hover:bg-[#e0d4cc]"
                    }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3  text-red-500 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          </div>

          {/* 🔥 RIGHT CONTENT */}
          <div className="md:w-3/4 w-full bg-white  p-6 md:p-8 shadow-sm">

            {/* MESSAGE */}
            {message && (
              <p className="text-sm text-green-600 mb-4">{message}</p>
            )}

            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <>
                {/* Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 border-b pb-6">

                  <div className="w-24 h-24 bg-gray-200 overflow-hidden">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xl">
                        👤
                      </div>
                    )}
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <h2 className="text-2xl font-semibold text-[#5E2A14]">
                      {user.name}
                    </h2>
                    <p className="text-gray-500">{user.mobile}</p>
                  </div>

                  <div className="flex gap-2">
                    {editMode && (
                      <button
                        onClick={handleUpdateProfile}
                        className="bg-green-600 text-white px-5 py-2 "
                      >
                        {loading ? "Saving..." : "Save"}
                      </button>
                    )}

                    <button
                      onClick={() => setEditMode(!editMode)}
                      className="bg-[#5E2A14] text-white px-5 py-2 "
                    >
                      {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                  </div>
                </div>

                {/* Inputs */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-gray-500">Full Name</label>
                    <input
                      type="text"
                      disabled={!editMode}
                      value={user.name}
                      onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                      }
                      className="w-full border p-3  mt-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-500">Mobile</label>
                    <input
                      type="text"
                      disabled
                      value={user.mobile}
                      className="w-full border p-3  mt-1 bg-gray-100"
                    />
                  </div>
                </div>
              </>
            )}

            {/* ORDERS TAB */}
            {activeTab === "orders" && (
              <div className="animate-in fade-in duration-300">
                {selectedOrderId ? (
                  <OrderDetail orderId={selectedOrderId} onBack={() => setSelectedOrderId(null)} />
                ) : (
                  <>
                    <h2 className="text-xl md:text-2xl font-semibold text-[#5E2A14] mb-6 font-[inter]">
                      My Orders
                    </h2>

                    {loadingOrders ? (
                      <div className="flex flex-col items-center justify-center py-16 space-y-4">
                        <div className="w-10 h-10 border-4 border-[#EADFD8] border-t-[#5E2A14] animate-spin"></div>
                        <p className="text-gray-500 font-medium animate-pulse">Fetching your orders...</p>
                      </div>
                    ) : ordersError ? (
                      <div className="bg-red-50 border border-red-100 p-4 md:p-6 flex items-start gap-4 shadow-sm">
                        <span className="text-red-500 text-xl">⚠️</span>
                        <div>
                          <h3 className="text-red-800 font-medium">Unable to load orders</h3>
                          <p className="text-red-600 text-sm mt-1">{ordersError}</p>
                        </div>
                      </div>
                    ) : orders.length === 0 ? (
                      <div className="bg-[#fcfaf9] border border-gray-100 p-8 md:p-12  text-center shadow-sm">
                        <div className="w-20 h-20 bg-[#f4ece7] flex items-center justify-center mx-auto mb-5 text-3xl shadow-inner">
                          📦
                        </div>
                        <h3 className="text-gray-800 font-semibold text-lg">No orders yet</h3>
                        <p className="text-gray-500 mt-2 max-w-sm mx-auto">Looks like you haven't made your first purchase. Check out our latest collections!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            onClick={() => setSelectedOrderId(order._id)}
                            className="border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                          >

                            {/* Order Header */}
                            <div className="bg-[#fcfaf9] border-b border-gray-100 p-4 md:px-6 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex items-center gap-3">
                                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                    Order
                                  </p>
                                  <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-xs font-mono font-medium">#{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                                </div>
                                <p className="text-xs md:text-sm text-gray-500">
                                  Placed on: <span className="font-medium text-gray-800">{order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}</span>
                                </p>
                              </div>

                              <div className="flex items-center justify-between md:justify-end gap-5 border-t border-gray-200 md:border-0 pt-4 md:pt-0">
                                <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md w-max
                              ${order.status?.toLowerCase() === 'delivered' ? 'bg-green-50 text-green-700 border border-green-200' :
                                    order.status?.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                                      'bg-blue-50 text-blue-700 border border-blue-200'}`}>
                                  {order.status || 'Processing'}
                                </span>
                                <div className="text-right">
                                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-0.5">Total</p>
                                  <p className="text-lg md:text-xl font-bold text-[#5E2A14]">₹{order.totalAmount}</p>
                                </div>
                              </div>
                            </div>

                            {/* Order Items */}
                            <div className="p-4 md:p-6 space-y-5">
                              {order.products.map((item, idx) => (
                                <div key={idx} className="flex gap-4 md:gap-6 items-start md:items-center">
                                  <div className="w-20 h-24 md:w-24 md:h-24 bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                  </div>

                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-gray-800 text-sm md:text-base line-clamp-2 md:line-clamp-1 mb-2 hover:text-[#5E2A14] transition-colors font-[inter]">{item.name}</h4>

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm">
                                      <span className="inline-flex items-center gap-1.5 text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                                        <span className="text-gray-400">Qty</span>
                                        <span className="font-semibold text-gray-800">{item.quantity}</span>
                                      </span>

                                      {item.size && (
                                        <span className="inline-flex items-center gap-1.5 text-gray-600">
                                          <span className="text-gray-400">Size</span>
                                          <span className="font-semibold text-gray-800 uppercase">{item.size}</span>
                                        </span>
                                      )}

                                      {item.color && (
                                        <span className="inline-flex items-center gap-2 text-gray-600">
                                          <span className="text-gray-400">Color</span>
                                          <div className="flex items-center gap-1.5">
                                            <span className="w-4 h-4 border border-gray-300 shadow-sm" style={{ backgroundColor: item.color.toLowerCase() }} />
                                            <span className="font-medium text-gray-800 capitalize hidden sm:inline">{item.color}</span>
                                          </div>
                                        </span>
                                      )}
                                    </div>
                                  </div>

                                  <div className="text-right flex-shrink-0 self-center">
                                    <p className="font-semibold text-gray-800 md:text-lg">₹{(item.discountPrice || item.price) * item.quantity}</p>
                                  </div>
                                </div>
                              ))}
                            </div>

                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ADDRESS TAB */}
            {activeTab === "address" && (
              <div>
                <h2 className="text-xl font-semibold text-[#5E2A14] mb-4">
                  Address
                </h2>

                {user.addresses?.length ? (
                  user.addresses.map((addr, i) => (
                    <div key={i} className="border p-4  mb-3">
                      <p>{addr.name}</p>
                      <p>{addr.phone}</p>
                      <p>
                        {addr.address}, {addr.city}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No address added</p>
                )}
              </div>
            )}

            {/* PAYMENT TAB */}
            {activeTab === "payment" && (
              <div>
                <h2 className="text-xl font-semibold text-[#5E2A14] mb-4">
                  Payment Methods
                </h2>
                <p className="text-gray-500">
                  Razorpay / UPI integration section
                </p>
              </div>
            )}

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;