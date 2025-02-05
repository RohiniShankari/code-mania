const mongoose=require("mongoose");
const { Schema } = mongoose;

const noteSchema = new Schema({
  content: String,
   
  user: { type: Schema.Types.ObjectId, ref: "User" }
  
});

const Note = mongoose.model('Note', noteSchema);

module.exports={Note};