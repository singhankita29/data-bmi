const mongoose = require("mongoose");

const bmiSchema = mongoose.Schema({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
});

const Bmi = mongoose.model("bmi", bmiSchema);

module.exports = { Bmi };