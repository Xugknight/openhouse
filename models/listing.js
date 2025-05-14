const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewingSchema = new Schema({
    when: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
})

const listingSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    owner: {
        // Referencing ALWAYS uses an ObjectId to reference
        // the related document
        type: Schema.Types.ObjectId,
        // The ref specifies the collection/model that the 
        // ObjectId (_id property) is from.
        // The ref option is what enables the .populate() method to
        // replace the ObjectId with the actual document that it references
        ref: 'User',
        // It's a good practice to use th erequired option to prevent
        // orphaned documents, i.e., a listing without an owner (parent).
        required: true
    },
    favoritedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
}, {
    // Mongoose will create and maintain createdAt & updatedAt properties.
    timestamps: true,
});

module.exports = mongoose.model('Listing', listingSchema);