// Site:  a website a user wants to scan, must be verified before scanning.(DNS TXT RECORD)
//TODO: ADD REGEX TO MATCH ONLY SITES ROOTS
// MOngoouse schema and model for the SIte colletion.
const { Schema, model, models } = require("mongoose");

const siteSchema = new Schema({
    // The owner of the site
    owner: {
        // Reference to the User model
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 60,
    },
    domain: {
        // The domain of the site, e.g. example.com
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        maxlength: 255,
    },
    status: {
        // The verification status of the site
        type: String,
        enum: ["pending", "verified"],
        default: "pending",
    },
    verifyToken: {
        // The token used for verifying the site via DNS TXT record
        type: String,
        required: true,
    },
    // The date when the site was verified
    verifiedAt: Date,
    // The date when the site was last checked for verification
    lastCheckedAt: Date,
}, { timestamps: true,
    toJSON: {
        // What is sent to the client 
        transform: (doc, ret) => {
            // Ret is the plain objet to be sent
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
            delete ret.owner;
            return ret;
        }
 }
});


// A user can add each domain only once.
siteSchema.index({ owner: 1, domain: 1 }, { unique: true });

// Export the module
module.exports = models.Site || model("Site", siteSchema);