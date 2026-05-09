

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const taskSchema = new Schema({
     title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },

    dueDate: {
      type: Date,
    }
},{timestamps:true})

const taskModel = mongoose.model('Task',taskSchema)
module.exports = taskModel