import React, { useEffect, useState } from "react";
import api from "../../../Services/apiService";
import { Order } from "./userProfile";

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({ orderId, onBack }) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showIssueModal, setShowIssueModal] = useState(false);
  const [ticketType, setTicketType] = useState("COMPLAINT");
  const [subject, setSubject] = useState("");
  const [feedbackText, setFeedbackText] = useState("");

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get(`/orders/${orderId}`);
      setOrder(res.data.order || res.data);
    } catch (err: any) {
      setError("Failed to load order details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleIssueSubmit = async () => {
    if (!feedbackText.trim() || !subject.trim()) {
      alert("Please enter subject and description.");
      return;
    }
    if (!order) return;

    try {
      setIsSubmitting(true);
      await api.post(`/support/tickets`, {
        orderId: order._id,
        ticketType,
        subject,
        description: feedbackText,
      });
      alert("Ticket submitted successfully! Our team will get back to you soon.");
      setFeedbackText("");
      setSubject("");
      setTicketType("COMPLAINT");
      setShowIssueModal(false);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit ticket.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReviewSubmit = async () => {
    if (!rating || !reviewTitle.trim() || !reviewText.trim()) {
      alert("Please fill all the review details.");
      return;
    }
    if (!order) return;

    try {
      setIsSubmitting(true);
      await api.post(`/reviews`, {
        productId: selectedProductId,
        orderId: order._id,
        rating,
        reviewTitle,
        reviewText,
      });
      alert("Review submitted successfully!");
      setShowReviewModal(false);
      setReviewTitle("");
      setReviewText("");
      setRating(5);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to submit review.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 space-y-4 animate-in fade-in duration-300">
        <div className="w-10 h-10 border-4 border-[#EADFD8] border-t-[#5E2A14] animate-spin"></div>
        <p className="text-gray-500 font-medium animate-pulse font-[inter]">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-red-50 border border-red-100 p-6 flex flex-col items-center gap-4 shadow-sm animate-in fade-in duration-300">
        <span className="text-red-500 text-3xl">⚠️</span>
        <div className="text-center">
          <h3 className="text-red-800 font-medium text-lg">Unable to load details</h3>
          <p className="text-red-600 mt-1">{error}</p>
        </div>
        <button onClick={onBack} className="mt-4 px-6 py-2 bg-red-100 text-red-700 hover:bg-red-200  transition-colors font-medium">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-300 font-[inter]">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="text-gray-500 hover:text-black flex items-center gap-1 transition-colors"
        >
          <span className="text-xl"></span> <span className="font-semibold">Back</span>
        </button>
        <h2 className="text-xl md:text-2xl font-semibold text-[#5E2A14] flex-1">
          Order Details
        </h2>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        {/* SUMMARY BAR */}
        <div className="bg-[#fcfaf9] border-b border-gray-100 p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order Number</p>
            <p className="font-medium text-gray-800 break-all text-sm md:text-base">#{order._id}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Placed On</p>
            <p className="font-medium text-gray-800 text-sm md:text-base">
              {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Total Amount</p>
            <p className="font-bold text-[#5E2A14] text-sm md:text-base">₹{order.totalAmount}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Status</p>
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-md inline-block
              ${order.status?.toLowerCase() === 'delivered' ? 'bg-green-50 text-green-700 border border-green-200' :
                order.status?.toLowerCase() === 'cancelled' ? 'bg-red-50 text-red-700 border border-red-200' :
                  'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              {order.status || 'Processing'}
            </span>
          </div>
        </div>

        {/* PRODUCTS LIST */}
        <div className="p-4 md:p-6 space-y-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-4 border-b pb-2 font-[inter]">Items in this order</h3>

          {order.products.map((item, idx) => (
            <div key={idx} className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="w-24 h-24 bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100 p-1">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 text-base font-[inter]">{item.name}</h4>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-2 text-sm">
                  <span className="text-gray-600 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
                    <span className="text-gray-400">Qty:</span> <span className="font-semibold text-gray-800">{item.quantity}</span>
                  </span>

                  {item.size && (
                    <span className="text-gray-600">
                      <span className="text-gray-400">Size:</span> <span className="font-semibold text-gray-800 uppercase xl">{item.size}</span>
                    </span>
                  )}

                  {item.color && (
                    <span className="flex items-center gap-2 text-gray-600">
                      <span className="text-gray-400">Color:</span>
                      <span className="w-4 h-4 border border-gray-300" style={{ backgroundColor: item.color.toLowerCase() }} />
                    </span>
                  )}
                </div>
              </div>

              <div className="md:text-right flex flex-col items-end gap-3">
                <span className="font-semibold text-gray-800 text-lg">
                  ₹{(item.discountPrice || item.price) * item.quantity}
                </span>

                {order.status?.toUpperCase() === 'DELIVERED' && (
                  <button
                    onClick={() => {
                      setSelectedProductId(item.productId);
                      setShowReviewModal(true);
                    }}
                    className="text-xs text-[#5E2A14] bg-[#F5ECE6] px-4 py-2  hover:bg-[#EADFD8] transition-colors font-medium border border-[#EADFD8]"
                  >
                    ⭐️ Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* SHIPPING & PAYMENT & ACTIONS */}
        <div className="bg-gray-50 border-t border-gray-100 p-4 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-[inter]">Shipping Information</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p className="font-medium text-black">{order.address?.name || 'Customer'}</p>
              <p>{order.address?.address}</p>
              <p>{order.address?.city}, {order.address?.state} {order.address?.pincode}</p>
              <p>Phone: {order.address?.phone || 'N/A'}</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 font-[inter]">Payment details</h3>
            <div className="text-gray-700 text-sm space-y-1">
              <p><span className="text-gray-500">Method:</span> <span className="font-medium">{order.paymentMethod || 'N/A'}</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => setShowIssueModal(true)}
          className="flex-1 py-3 bg-red-50 border border-red-200 text-red-700 font-medium hover:bg-red-100 transition-colors text-center "
        >
          ⚠️ Return / Report Issue
        </button>
      </div>

      {/* REVIEW MODAL */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-semibold mb-4 text-[#5E2A14] font-[inter]">
              Rate your experience
            </h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">Rating (1-5)</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-3xl focus:outline-none transition-transform hover:scale-110"
                  >
                    {star <= rating ? "⭐️" : "☆"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">Review Title</label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="E.g., Great product!"
                className="w-full border border-gray-300  p-3 text-sm focus:outline-none focus:border-[#E3B15F]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">Review Description</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full border border-gray-300  p-3 text-sm min-h-[100px] focus:outline-none focus:border-[#E3B15F]"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowReviewModal(false);
                  setReviewTitle("");
                  setReviewText("");
                  setRating(5);
                }}
                disabled={isSubmitting}
                className="flex-1 py-2 text-gray-600 border border-gray-300  hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleReviewSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2 bg-[#5E2A14] text-white  hover:bg-[#4a2110] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ISSUE MODAL */}
      {showIssueModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md animate-in zoom-in-95 duration-200">
            <h3 className="text-xl font-semibold mb-4 text-[#5E2A14] font-[inter]">
              Return / Report Issue
            </h3>

            <div className="mb-4 w-full max-w-full">
              <label className="block text-sm text-gray-700 font-medium mb-1">
                Issue Type
              </label>

              <select
                value={ticketType}
                onChange={(e) => setTicketType(e.target.value)}
                className="block w-full border border-gray-300 p-3 
               text-base md:text-sm rounded-md
               focus:outline-none focus:border-[#E3B15F] bg-white
               truncate"
              >
                <option value="COMPLAINT">Complaint</option>
                {order?.status?.toUpperCase() === "DELIVERED" && (
                  <option value="RETURN_REQUEST">Return Request</option>
                )}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of the issue"
                className="w-full border border-gray-300  p-3 text-sm focus:outline-none focus:border-[#E3B15F]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-700 font-medium mb-1">Description</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Please provide explicit details..."
                className="w-full border border-gray-300  p-3 text-sm min-h-[100px] focus:outline-none focus:border-[#E3B15F]"
              />
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowIssueModal(false);
                  setFeedbackText("");
                  setSubject("");
                  setTicketType("COMPLAINT");
                }}
                disabled={isSubmitting}
                className="flex-1 py-2 text-gray-600 border border-gray-300  hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleIssueSubmit}
                disabled={isSubmitting}
                className="flex-1 py-2 bg-[#5E2A14] text-white  hover:bg-[#4a2110] disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
