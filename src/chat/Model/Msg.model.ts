
import mongoose from 'mongoose'

const msgCollection = 'messages'

const MsgSchema = new mongoose.Schema({
  id: { type: String },
  email: { type: String, required: true },
  body: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  type: { type: String, required: true }

})

export const MsgModel = mongoose.model(msgCollection, MsgSchema)
