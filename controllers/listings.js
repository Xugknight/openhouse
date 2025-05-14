const express = require('express');
const router = express.Router();
const Listing = require('../models/listing');

// Middleware used to protect routes that need a logged in user
const ensureLoggedIn = require('../middleware/ensure-logged-in');

// This is how we can more easily protect ALL routes for this router
// router.use(ensureLoggedIn);

// ALL paths start with '/listings'

// index action
// GET /listings
// Example of a non-protected route
router.get('/', async (req, res) => {
  const listings = await Listing.find({});
  res.render('listings/index.ejs', { listings }); // Did not change data so we use render() instead of redirect()
});

module.exports = router;

// GET /listings/new
// Example of a protected route
// router.get('/new', ensureLoggedIn, (req, res) => {
//   res.send('Create a Listing!');
// });
