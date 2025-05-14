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
  // Thanks to the timestamps option, we can sort by createdAt
  const listings = await Listing.find({}).sort('-createdAt');
  res.render('listings/index.ejs', { listings }); // Did not change data so we use render() instead of redirect()
});

// New action
// GET /listings/new
// Protected route
router.get('/new', ensureLoggedIn, (req, res) => {
  res.render('listings/new.ejs');
});

// Create action
// POST /listings
router.post('/', ensureLoggedIn, async (req, res) => { // async because we're creating data
  try {
    // Be sure to add the owner's/user's ObjectId (_id)
    req.body.owner = req.user._id;
    await Listing.create(req.body);
    res.redirect('/listings');
  } catch (err) {
    console.log(err); // Log error for dev to see, user will not see.
    res.redirect('listings/new'); // Redirect to new.ejs to show the "Create" was not successful
  }
});

// Show action
// Get /listings/:id
router.get('/:id', async (req, res) => { // async, will have to retrieve data
  const listing = await Listing.findById(req.params.id).populate('owner');
  const isFavored = listing.favoritedBy.some((id) => id.equals(req.user?._id));
  res.render('listings/show.ejs', { listing, isFavored });
});

module.exports = router;