const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const historyItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Integer,
        required: true
    },
    itemId: {
        type: ObjectId,
        ref: 'Item'
    },
    createdAt: {
        type: Date,
        default: Date.now 
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('HistoryItem', historyItemSchema);