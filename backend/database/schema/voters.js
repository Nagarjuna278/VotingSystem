const mongoose= require('mongoose');
const VotersSchema = mongoose.Schema({

ip: {
    type:String
}


})
module.exports = mongoose.model('Voter',VotersSchema);