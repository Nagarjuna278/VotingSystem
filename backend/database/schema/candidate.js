const mongoose= require('mongoose');
const CandidateSchema = mongoose.Schema({
    name: {
        type:String,
        trim:true,
        required:true,
    },
    challengesSolved : {
        type:Number,
        default:0,
    },
    candidateExpertiseLevel : {
        type:Number,
        default:0,
    },
    expertIn : {
        java : {
            type : Number,
            default:0,
        },
        DataStructures : {
            type : Number,
            default:0,
        },
        Algorithms : {
            type : Number,
            default:0,
        },
        python : {
            type : Number,
            default:0,
        },
        Cpp : {
            type : Number,
            default:0,
        },
    },
    votes : {
        type:Number,
        default:0,
    },
    candidateId: {
        type:String,
    }
})

module.exports = mongoose.model('Candidate',CandidateSchema);