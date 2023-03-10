const mongoose = require("mongoose");

const requestPostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    dosage: { type: String, required: true },
    quantity: { type: String, required: true },
    form: { type: String, required: true },
    location: String,
 
    
    isVisible: {
      type: Boolean,
      default: true,
    },
   
  
   
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RequestPosts", requestPostSchema);
