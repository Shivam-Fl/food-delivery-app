const Review = require('../models/Review');
const Restaurant = require('../models/resturant');

// Leave a review for a restaurant (based on order)
exports.leaveReview = async (req, res) => {
    const { rating, comment, restaurantId, orderId } = req.body;
    const userId = req.user._id;  // Assuming the user is authenticated

    try {
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

        const existingReview = await Review.findOne({ user: userId, restaurant: restaurantId, order: orderId });
        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this order' });
        }

        const review = new Review({
            user: userId,
            restaurant: restaurantId,
            order: orderId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all reviews for a restaurant
exports.getRestaurantReviews = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'name').sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
