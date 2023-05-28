import mongoose from "mongoose";
const Schema = mongoose.Schema;

const clothesSchema = new Schema({
    name: {
        type: String,
        required: true, 
        unique: true
    }, 
    precio: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    descripcion:{
        type: String,
    },
    img:{
        type: String,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categories'
    }
}, 
{ versionKey: false }
);

const Clothes = mongoose.model('Clothes', clothesSchema);
export default Clothes;