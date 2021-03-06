var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password:  {
            type: String,
            required: true
        },
        firstname:  {
            type: String,
            required: true
        },
        lastname:  {
            type: String,
            required: true
        },
        email:  {
            type: String,
            required: true
        },
        admin:   {
            type: Boolean,
            default: false
        }
    }, 
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);