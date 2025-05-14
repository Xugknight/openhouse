const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
router.use(ensureLoggedIn);

// ALL paths start with '/'

// create route/action
// POST /listings/:id/viewings
router.post('/listings/:id/viewings', async (req, res) => {
  try {
    // Be sure to add the user's ObjectId (_id)
    req.body.user = req.user._id;
    await Listing.findByIdAndUpdate(
      // _id of the listing
      req.params.id,
      // Update object
      { $push: { viewings: req.body } }
    );
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    console.log(err);
    res.redirect(`/listings/${req.params.id}`);
  }
});

module.exports = router;