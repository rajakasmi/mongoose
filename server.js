
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

// Schema & Model
const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true }
});
const Teacher = mongoose.model("Teacher", teacherSchema);
const getallTeacher=async(req,res)=>{
  try {
    const teach=await Teacher.find()
    res.status(200).json(teach) 
  } catch (error) {
   res.status(500).json({error:"teachers not found"})
  }
}
//get one teacher
const getoneTeacher=async(req,res)=>{
  try {
    const teach=await Teacher.findById(req.params.id)
    if(!teach){
      return res.status(404).json({error:"teacher not found "})
    }
    res.status(200).json(teach);
  } catch (error) {
   res.status(500).json({error:"failed to get one teacher"})
  }
}
//create teacher
const createTeacher=async(req,res)=>{
  try {
    const teach=await Teacher.create(req.body)
    res.status(201).json(teach) 
  } catch (error) {
   res.status(500).json({error:"failed to create teacher"})
  }
}
//delete teacher
const deleteTeacher=async(req,res)=>{
  try {
    const teach=await Teacher.findByIdAndDelete(req.params.id)
    if(!teach){
    return  res.status(404).json({error:"teacher not found "})
    }
    res.json(teach,)
  } catch (error) {
   res.status(500).json({error:"failed to delete teacher"})
  }
}
//update teacher
const updateTeacher=async(req,res)=>{
  try {
    const teach=await Teacher.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!teach){
      res.status(404).json({error:"teacher not found "})
    }
    res.json(teach)
  } catch (error) {
   res.status(500).json({error:"failed to delete teacher"})
  }
}
app.get('/getall',getallTeacher)
app.get('/getone/:id',getoneTeacher)
app.post('/create',createTeacher)
app.delete('/delete/:id',deleteTeacher)
app.put('/update/:id',updateTeacher)
mongoose
  .connect("mongodb://localhost:27017/university")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

const port = 5000;
app.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
