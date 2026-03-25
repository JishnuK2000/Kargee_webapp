import { useState } from "react";
import Layout from "../../components/layout";
import axios from "axios";

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

 const API = import.meta.env.VITE_API_URL;

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );

  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("userToken");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userToken");
    window.location.reload();
  };

  const handleUpdateProfile = async () => {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.put(
        `${API}/user/profile`,
        {
          name: user.name,
          profilePicture: user.profilePicture,
          addresses: user.addresses,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
                  onClick={() => setActiveTab(item.key)}
                  className={`w-full text-left px-4 py-3  transition ${
                    activeTab === item.key
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

                  <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
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
              <div>
                <h2 className="text-xl font-semibold text-[#5E2A14] mb-4">
                  My Orders
                </h2>
                <p className="text-gray-500">Orders UI coming next 🚀</p>
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