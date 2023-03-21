const { Schema, model, SchemaTypes } = require("mongoose");

const verificationSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Verification = model("Verification", verificationSchema);
module.exports = Verification;
