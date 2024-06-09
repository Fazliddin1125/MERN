const {Schema, model } = require("mongoose")

const UserSchema = new Schema({
    email: { type: String, require: true, unique: true} ,
    password: { type: String, require: true},
    isActivated: { type: Boolean, default: false },

}, {
    timestamps: true
})

module.exports = model("User", UserSchema)