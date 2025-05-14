const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
// router.use(ensureLoggedIn);

// ALL paths start with '/'

// Index action (view user's favorited listings)
// GET /favorites
router.get('/favorites', ensureLoggedIn, async (req, res) => {
  const listings = await Listing.find({ favoritedBy: req.user._id }).sort('-createdAt');
  res.render('listings/index.ejs', { listings });
});

// New action
// GET /listings/new
// Protected route
// router.get('/new', ensureLoggedIn, (req, res) => {
//   res.render('listings/new.ejs');
// });

// Create action (favor)
// POST /listings/:id/favorites
router.post('/listings/:id/favorites', ensureLoggedIn, async (req, res) => {
    await Listing.findByIdAndUpdate(
      // The _id of the listing to update
      req.params.id,
      // The Update object
      { $addToSet: { favoritedBy: req.user._id } }
    );
    res.redirect(`/listings/${req.params.id}`);
});

// Delete action (unfavor)
// DELETE /listings/:id/favorites
router.delete('/listings/:id/favorites', ensureLoggedIn, async (req, res) => {
    await Listing.findByIdAndUpdate(
      // The _id of the listing to update
      req.params.id,
      // The Update object
      { $pull: { favoritedBy: req.user._id } }
    );
    res.redirect(`/listings/${req.params.id}`);
});

module.exports = router;