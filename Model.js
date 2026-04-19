const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  age: {
    type: Number
  }
}, { timestamps: true });


const programMasterSchema = new mongoose.Schema({
  Title: {
    type: String,

  },
  Input: {
    type: String,

  },
  Output: {
    type: String,

  },
  Program: {
    type: String,

  },
   Category: {
    type: String,

  },
  SubCategory: {
    type: String,

  },
  Notes: {
    type: String
  } 


}, { timestamps: true });

module.exports = {
  User: mongoose.model("User", userSchema),
  ProgramMaster: mongoose.model("ProgramMaster", programMasterSchema)
};