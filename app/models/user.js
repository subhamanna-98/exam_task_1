

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
},{timestamps:true})



const userModel = mongoose.model('User',userSchema)
module.exports = userModel