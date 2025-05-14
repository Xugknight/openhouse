const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
// router.use(ensureLoggedIn);

// ALL paths start with '/listings'

// Index action
// GET /listings
// Non-protected route
router.get('/', async (req, res) => {
  const listings = await Listing.find({});
  res.render('listings/index.ejs', { listings }); // Did not change data so we use render() instead of redirect()
});

// New action
// GET /listings/new
// Protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('listings/new.ejs');
});




module.exports = router;