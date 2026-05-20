import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());



// Mongo Connection
mongoose
.connect("mongodb://127.0.0.1:27017/notesApp")
.then(()=>{
    console.log("Mongo Connected");
})
.catch((err)=>{
    console.log(err);
});



// Schema
const noteSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});



const Note =
mongoose.model(
    "Note",
    noteSchema
);



// GET ALL NOTES
app.get(
"/notes",

async(req,res)=>{

try{

const notes=
await Note.find();

res.json(notes);

}

catch{

res.status(500)
.json({
message:"Error"
});

}

}
);



// ADD NOTE
app.post(
"/notes",

async(req,res)=>{

try{

const note=
await Note.create({

title:
req.body.title,

content:
req.body.content

});

res
.status(201)
.json(note);

}

catch{

res
.status(500)
.json({
message:"Error Saving"
});

}

}
);



// DELETE NOTE
app.delete(
"/notes/:id",

async(req,res)=>{

try{

await Note
.findByIdAndDelete(
req.params.id
);

res.json({
message:"Deleted"
});

}

catch{

res
.status(500)
.json({
message:"Delete Error"
});

}

}
);



// UPDATE NOTE
app.put(
"/notes/:id",

async(req,res)=>{

try{

const updated=
await Note
.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);

res
.json(
updated
);

}

catch{

res
.status(500)
.json({
message:"Update Error"
});

}

}
);



app.listen(
5000,

()=>{

console.log(
"Server Running"
);

}
);