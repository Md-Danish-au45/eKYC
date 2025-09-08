import React, { useState, useEffect } from "react";
import {
    Star,
    Shield,
    Clock,
    CheckCircle,
    Users,
    Award,
    Lightbulb,
    Lock,
    Zap,
    FileText,
    CreditCard,
    Loader2,
    AlertCircle,
    Edit,
    Trash2,
    TrendingUp,
    Verified,
    Globe,
    Phone,
} from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { selectCurrentUser } from "@/features/auth/authSlice";
// API Hooks
import { useGetServiceByIdQuery } from "@/app/api/serviceApiSlice";
import { useGetReviewsByServiceQuery, useDeleteReviewMutation } from "@/app/api/reviewApiSlice";
import SubscriptionPurchaseCard from "../user/userComponents/SubscriptionPurchaseCard";
// Components
import Header from "./homeComponents/Header";
import Footer from "./homeComponents/Footer";
import ReviewModal from "./homeComponents/ReviewModal";
import TopBar from "./homeComponents/TopBar";

// Helper function to calculate the final price after applying a discount.
const calculateDiscountedPrice = (originalPrice, discount) => {
    if (!originalPrice || !discount) return originalPrice;

    if (discount.type === 'percentage') {
        return originalPrice - (originalPrice * discount.value / 100);
    } else if (discount.type === 'fixed') {
        return Math.max(0, originalPrice - discount.value);
    }
    return originalPrice;
};

const ProductPage = ({ serviceId }) => {
    const currentServiceId = serviceId || window.location.pathname.split('/').pop();
    const navigate = useNavigate();

    // Global State
    const userInfo = useSelector(selectCurrentUser);

    // Local State
    const [selectedTab, setSelectedTab] = useState("overview");
    const [isReviewModalOpen, setReviewModalOpen] = useState(false);
    const [reviewToEdit, setReviewToEdit] = useState(null);
    const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

    // Data Fetching
    const {
        data: serviceResponse,
        isLoading: isLoadingService,
        isError,
        error
    } = useGetServiceByIdQuery(currentServiceId);

    const {
        data: reviewsResponse,
        isLoading: isLoadingReviews
    } = useGetReviewsByServiceQuery(currentServiceId);

    const [deleteReview, { isLoading: isDeletingReview }] = useDeleteReviewMutation();

    // Safely derive state from API response
    const service = serviceResponse?.data;
    const discountedPrice = calculateDiscountedPrice(service?.price, service?.discount);
    const hasDiscount = service?.discount && discountedPrice < service?.price;
    const reviews = reviewsResponse?.data || [];

    // --- UPDATED LOGIC FOR REVIEW ELIGIBILITY ---
    const hasUsedService = userInfo?.usedServices?.some(s =>
        s.service === currentServiceId || (service?.subcategory && s.subcategory === service.subcategory)
    ) || false;
    
    const userReview = userInfo ? reviews.find(r => r.user?._id === userInfo._id) : null;

    // This effect handles redirection AFTER a new purchase is made via the modal.
    const prevHasUsedService = React.useRef(hasUsedService);
    React.useEffect(() => {
        if (!prevHasUsedService.current && hasUsedService && isPurchaseModalOpen) {
            toast.success("Purchase successful! Redirecting...");
            navigate(`/user/service/${service?.subcategory}`);
            setPurchaseModalOpen(false);
        }
        prevHasUsedService.current = hasUsedService;
    }, [hasUsedService, isPurchaseModalOpen, navigate, service?.subcategory]);

    const productData = {
        _id: service?._id,
        title: service?.name || "Service Verification",
        price: `₹${hasDiscount ? discountedPrice.toFixed(0) : (service?.price || 0)}`,
        originalPrice: `₹${service?.price}`,
        rating: 4.8,
        totalReviews: reviews?.length,
        description: service?.description || "Get your documents verified instantly with our secure and reliable verification service.",
        features: service?.features || [
            "Instant Verification",
            "100% Secure Process",
            "Government Approved",
            "24/7 Support Available",
            "Digital Certificate",
        ],
        processingTime: service?.processingTime || "2-5 minutes",
        successRate: service?.successRate || "99.9%",
        category: service?.category || "Document",
        subcategory: service?.subcategory,
        inputFields: service?.inputFields || [],
        usedBy: service?.usedBy || [],
        discount: service?.discount || null,
        image: service?.imageUrl
    };

    const planDataForPurchase = {
        name: service?.subcategory,
        monthly: {
            price: service?.price
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    // --- Handlers ---
    const handleOpenReviewModal = (review = null) => {
        if (!userInfo) {
            toast.error("Please log in to leave a review.");
            navigate("/login");
            return;
        }
        setReviewToEdit(review);
        setReviewModalOpen(true);
    };

    const handleNavigateAction = () => {
        if (userInfo) {
            navigate('/user');
        } else {
            toast.error("Please log in to get started.");
            navigate('/login');
        }
    };

    const handlePurchaseClick = () => {
        if (userInfo) {
            const subcategory = service?.subcategory;
            if (!subcategory) {
                toast.error("This service is not available for purchase at the moment.");
                return;
            }

            const hasActiveSubscription = userInfo.activeSubscriptions?.some(
                sub => sub.category === subcategory && new Date(sub.expiresAt) > new Date()
            );

            if (hasActiveSubscription) {
                toast.success(`Accessing your "${subcategory}" plan...`);
                navigate(`/user/service/${subcategory}`);
            } else {
                prevHasUsedService.current = hasUsedService;
                setPurchaseModalOpen(true);
            }
        } else {
            toast.error("Please log in to purchase this service.");
            navigate(`/login?status=${service?.subcategory}`);
        }
    };

    const handleDeleteReview = async (reviewId) => {
        if (window.confirm("Are you sure you want to delete your review? This action cannot be undone.")) {
            try {
                await deleteReview(reviewId).unwrap();
                toast.success("Your review has been deleted.");
            } catch (err) {
                toast.error(err.data?.message || "Failed to delete the review.");
            }
        }
    };

    // Render Functions
    const renderStars = (rating) => (
        Array.from({ length: 5 }, (_, index) => (
            <Star key={index} className={`w-4 h-4 ${index < Math.round(rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`} />
        ))
    );

    if (isLoadingService) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center bg-white rounded-xl p-8 shadow-sm border">
                        <Loader2 className="w-12 h-12 animate-spin text-slate-600 mx-auto mb-6" />
                        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Loading Service Details</h2>
                        <p className="text-slate-600">Please wait while we fetch the service information.</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="max-w-7xl mx-auto px-4 py-16 flex items-center justify-center min-h-[60vh]">
                    <div className="text-center bg-white rounded-xl p-8 shadow-sm border">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-semibold text-slate-900 mb-3">Service Not Found</h2>
                        <p className="text-slate-600 mb-8">{error?.data?.message || "The requested service could not be found."}</p>
                        <button 
                            onClick={() => navigate(-1)} 
                            className="bg-slate-900 text-white px-8 py-3 rounded-lg hover:bg-slate-800 transition-colors font-medium"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50">
                <TopBar />
                <Header />
                
                {/* Hero Section */}
                <div className="bg-white border-b">
                    <div className="max-w-7xl mx-auto px-6 py-12">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            {/* Product Image Section */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.6 }}
                                className="relative"
                            >
                                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 flex items-center justify-center min-h-[400px] border shadow-sm">
                                    {productData.image ? (
                                        <img
                                            src={productData.image}
                                            alt={productData.title}
                                            className="max-w-full max-h-80 object-contain rounded-xl"
                                        />
                                    ) : (
                                        <div className="text-center">
                                            <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
                                                <Shield className="w-12 h-12 text-white" />
                                            </div>
                                            <div className="text-slate-600 text-sm font-medium uppercase tracking-wider mb-2">
                                                {productData.category}
                                            </div>
                                            <div className="text-2xl font-bold text-slate-900">Verification Service</div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            {/* Product Details Section */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="space-y-8"
                            >
                                {/* Header */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                                            {productData.category}
                                        </span>
                                        <Verified className="w-5 h-5 text-green-500" />
                                    </div>
                                    <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                                        {productData.title}
                                    </h1>
                                    
                                    {/* Rating */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="flex items-center gap-1">{renderStars(productData.rating)}</div>
                                        <span className="text-slate-600 font-medium">
                                            {productData.rating} ({productData.totalReviews} reviews)
                                        </span>
                                    </div>
                                    
                                    {/* Price */}
                                    <div className="flex items-baseline gap-3 mb-6">
                                        <span className="text-4xl font-bold text-slate-900">{productData.originalPrice}</span>
                                        <span className="text-slate-600 font-medium">one-time payment</span>
                                    </div>
                                </div>

                                {/* Description */}
                                <p className="text-slate-700 text-lg leading-relaxed">
                                    {productData.description}
                                </p>

                                {/* Stats Cards */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <Clock className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                                        <div className="font-bold text-slate-900 text-sm">{productData.processingTime}</div>
                                        <div className="text-xs text-slate-600 mt-1">Processing</div>
                                    </div>
                                    <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                        <div className="font-bold text-slate-900 text-sm">{productData.successRate}</div>
                                        <div className="text-xs text-slate-600 mt-1">Success Rate</div>
                                    </div>
                                    <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                                        <Users className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                                        <div className="font-bold text-slate-900 text-sm">{productData.totalReviews}+</div>
                                        <div className="text-xs text-slate-600 mt-1">Customers</div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button 
                                    onClick={handlePurchaseClick} 
                                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-4 px-8 rounded-xl transition-colors text-lg shadow-sm hover:shadow-md"
                                >
                                    Get Verified Now • {productData.originalPrice}
                                </button>

                                {/* Trust Indicators */}
                                <div className="flex items-center justify-center gap-8 pt-6 border-t">
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Lock className="w-4 h-4" />
                                        <span className="text-sm font-medium">Secure</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-sm font-medium">Government API</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-600">
                                        <Phone className="w-4 h-4" />
                                        <span className="text-sm font-medium">24/7 Support</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Features Section */}
                <div className="bg-white">
                    <div className="max-w-7xl mx-auto px-6 py-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }} 
                            whileInView={{ opacity: 1, y: 0 }} 
                            viewport={{ once: true }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Our Service</h2>
                            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                                Experience the most reliable and efficient verification process with industry-leading security standards.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {productData.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-4">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold text-slate-900 mb-2">{feature}</h3>
                                    <p className="text-slate-600 text-sm">
                                        Professionally handled with the highest standards of quality and security.
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-sm border overflow-hidden"
                    >
                        {/* Tab Navigation */}
                        <div className="border-b bg-gray-50">
                            <div className="flex">
                                {["overview", "reviews"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setSelectedTab(tab)}
                                        className={`px-8 py-4 font-semibold capitalize transition-colors ${
                                            selectedTab === tab
                                                ? "text-slate-900 border-b-2 border-slate-900 bg-white"
                                                : "text-slate-600 hover:text-slate-900"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tab Content */}
                        <div className="p-8">
                            {selectedTab === "overview" && (
                                <div className="space-y-12">
                                    {/* About Section */}
                                    <div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                            <Lightbulb className="w-7 h-7 text-slate-700" />
                                            About This Service
                                        </h3>
                                        <p className="text-slate-700 text-lg leading-relaxed">
                                            {productData.description}
                                        </p>
                                    </div>

                                    {/* Process & Security Grid */}
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        {/* How It Works */}
                                        <div className="bg-gray-50 rounded-xl p-8 border">
                                            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                <Zap className="w-6 h-6 text-slate-700" />
                                                How It Works
                                            </h4>
                                            <div className="space-y-4">
                                                {[
                                                    { text: "Enter required information", icon: <FileText className="w-5 h-5 text-slate-700" /> },
                                                    { text: "Complete secure payment", icon: <CreditCard className="w-5 h-5 text-slate-700" /> },
                                                    { text: "Get instant verification", icon: <Clock className="w-5 h-5 text-slate-700" /> },
                                                    { text: "Download digital certificate", icon: <Award className="w-5 h-5 text-slate-700" /> },
                                                ].map((step, index) => (
                                                    <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
                                                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold">
                                                            {index + 1}
                                                        </div>
                                                        {step.icon}
                                                        <span className="text-slate-700 font-medium">{step.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Security Features */}
                                        <div className="bg-gray-50 rounded-xl p-8 border">
                                            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                <Lock className="w-6 h-6 text-slate-700" />
                                                Security Features
                                            </h4>
                                            <div className="space-y-3">
                                                {[
                                                    "SSL encrypted data transmission",
                                                    "Government API integration",
                                                    "No data storage policy",
                                                    "GDPR compliant process",
                                                ].map((feature, index) => (
                                                    <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border shadow-sm">
                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        <span className="text-slate-700 font-medium">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Required Information */}
                                    {productData.inputFields && productData.inputFields.length > 0 && (
                                        <div className="bg-gray-50 rounded-xl p-8 border">
                                            <h4 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                                <FileText className="w-6 h-6 text-slate-700" />
                                                Required Information
                                            </h4>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {productData.inputFields.map((field, index) => (
                                                    <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                                                        <h5 className="font-semibold text-slate-900 mb-1">{field.label}</h5>
                                                        {field.placeholder && (
                                                            <p className="text-xs text-slate-500">Example: {field.placeholder}</p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {selectedTab === "reviews" && (
                                <div className="space-y-8">
                                    <h3 className="text-2xl font-bold text-slate-900">Customer Reviews</h3>

                                    {/* Review Prompts */}
                                    {userInfo && hasUsedService && !userReview && (
                                        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-center">
                                            <h4 className="font-bold text-xl text-slate-900 mb-2">Share Your Experience</h4>
                                            <p className="text-slate-600 mb-6">Help other customers by sharing your honest feedback.</p>
                                            <button
                                                onClick={() => handleOpenReviewModal(null)}
                                                className="bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors"
                                            >
                                                Write a Review
                                            </button>
                                        </div>
                                    )}

                                    {!hasUsedService && (
                                        <div className="bg-gray-50 border border-gray-200 p-6 rounded-xl text-center">
                                            <h4 className="font-bold text-xl text-slate-900 mb-2">Want to leave a review?</h4>
                                            <p className="text-slate-600 mb-6">Use our service first to share your valuable feedback.</p>
                                            <button
                                                onClick={handleNavigateAction}
                                                className="bg-slate-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors"
                                            >
                                                {userInfo ? 'Go to Dashboard' : 'Login to Get Started'}
                                            </button>
                                        </div>
                                    )}

                                    {/* Reviews List */}
                                    {isLoadingReviews ? (
                                        <div className="flex justify-center items-center py-12">
                                            <Loader2 className="w-8 h-8 animate-spin text-slate-600" />
                                        </div>
                                    ) : reviews.length > 0 ? (
                                        <div className="space-y-6">
                                            {reviews.map((review) => (
                                                <div key={review._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                                                    <div className="flex items-start gap-4">
                                                        <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white font-bold">
                                                            {review.user?.name?.charAt(0) || 'U'}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-2">
                                                                <div className="flex items-center gap-3">
                                                                    <h4 className="font-bold text-slate-900">{review.user?.name || 'Anonymous'}</h4>
                                                                    <span className="text-slate-500 text-sm">
                                                                        {new Date(review.createdAt).toLocaleDateString()}
                                                                    </span>
                                                                </div>
                                                                {userInfo && review.user?._id === userInfo._id && (
                                                                    <div className="flex items-center gap-2">
                                                                        <button
                                                                            onClick={() => handleOpenReviewModal(review)}
                                                                            className="text-slate-500 hover:text-slate-700 p-1"
                                                                        >
                                                                            <Edit className="w-4 h-4" />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleDeleteReview(review._id)}
                                                                            disabled={isDeletingReview}
                                                                            className="text-slate-500 hover:text-red-600 p-1"
                                                                        >
                                                                            <Trash2 className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-3">{renderStars(review.rating)}</div>
                                                            <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 bg-gray-50 rounded-xl border">
                                            <p className="text-slate-600 font-semibold text-lg mb-2">No reviews yet</p>
                                            <p className="text-slate-500">Be the first to share your experience!</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
                
                <Footer />
            </div>

            {isReviewModalOpen && (
                <ReviewModal
                    onClose={() => setReviewModalOpen(false)}
                    existingReview={reviewToEdit}
                    serviceId={currentServiceId}
                />
            )}

            {isPurchaseModalOpen && userInfo && (
                <SubscriptionPurchaseCard
                    planData={planDataForPurchase}
                    userInfo={userInfo}
                    onClose={() => setPurchaseModalOpen(false)}
                />
            )}
        </>
    );
};

export default ProductPage;