const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
    mood: { type: String, required: true },
    checkInResponse: { type: String, required: true },
    aiResponse: { type: String, required: true }
}, { timestamps: true });

const goalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    targetDateOn: { type: mongoose.Schema.Types.Date }
}, { timestamps: true });

const journalEntrySchema = new mongoose.Schema({
    journalEntryResponse: { type: String, required: true },
    aiPrompt: { type: String, required: true },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    firstName: { 
        type: String,
        required: true,
        set: function(value) {
            return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value;
        }
    },
    lastName: { 
        type: String,
        required: true,
        set: function(value) {
            return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : value;
        }
    },
    checkIns: [checkInSchema],
    goals: [goalSchema],
    journalEntries: [journalEntrySchema]
}, { 
    timestamps: true,
    _id: false
 });

module.exports = mongoose.model('User', userSchema)