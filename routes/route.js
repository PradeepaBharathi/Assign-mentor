import express from "express";
import { addNewMentor, addNewStudent,  deleteMentorById, editMentor, editStudent, getAllMentor, getAllStudents, getMentorById, getStudentById, getUnassignedStudents, updateManyStudents } from "../controllers/stud-ment.js";


const router = express.Router();
///add new student ///
router.post('/add-student',async(req,res)=>{

    try {
        const newStudent = req.body;
        // console.log(newStudent);
        if(!newStudent){
            return res.status(400).json({message:"no data availabe"})
        }
        const result = await addNewStudent(newStudent);
        if(!result.acknowledged){
            return res.status(400).json({message:"error occured"})
        }
        res.status(200).json({data:newStudent,status:result})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error occured"})
    }

})

///get student details///

router.get('/all', async (req, res) => {
    
    try {
        const studentData =  await getAllStudents(req);
        // console.log(studentData)
    if(!studentData){
        return res.status(400).json({message:"no data availabe"})
    }
    res.status(200).json({data:studentData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})


///get student details by id ///
router.get("/all/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const student = await getStudentById(id);
        if(!student){
            
            return res.status(400).json({message:"No data available"})

        }
        return res.status(200).json({data:student})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

/// get students who dont have mentors
router.get("/students/all/unassigned", async(req,res) => {
       try{
         const students = await getUnassignedStudents(req.body);
         if(students.length===0){
               return res.status(400).json({message:"No student data available"})
         }
         res.status(200).json({StudentsList:students});
       }
       catch(error){
          res.status(500).json({message:"Internal server error", "error":error})
       }
}) 
    
/// edit student
router.put("/edit-students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedStudent = req.body;
        if (!id || !updatedStudent) {
            return res.status(400).json({message:"wrong request"})
        }
        
        

        const found =await getStudentById(id.trim()); 
       console.log(found);
       let changed = {...updatedStudent, hasMentor:"true", previous_Mentor: found.assigned_Mentor}
       console.log(changed);
       const result = await editStudent(id.trim(),changed)
       if(!result || !result.lastErrorObject.updatedExisting){
          return res.status(400)
          .json({message:"ERROR updating "})
      }
      res.status(200).json({UpdatedMentor : id, new:changed, status: result});
    }

     catch (error) {
        res.status(500).json({message:"Internal server error", "error":error})
    }
})


///assigning a mentor to different students

router.put('/edit-many/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { target, assign } = req.body;
        if (!id || !target) {
             return res.status(400).json({message:"wrong request"})
        }
        
  console.log(id)
           console.log(target) 
        const result = await updateManyStudents(target, assign);
        console.log(id)
        console.log(target)
        console.log(result.matchedCount)
        console.log(target.length)
        if (!result || !result.acknowledged ) {
            return res.status(400).json({message:"Error occured",status: result})
        }
        res.status(200).json({UpdatedStudents : target, mentor:assign, status: result})

    } catch (error) {
         res.status(500).json({message:"Internal server error", "error":error})
    }
})

//add mentor

router.post('/add-mentor',async(req,res)=>{

    try {
        const newMentor= req.body;
        // console.log(newMentor);
        if(!newMentor){
            return res.status(400).json({message:"no data availabe"})
        }
        const result = await addNewMentor(newMentor);
        if(!result.acknowledged){
            return res.status(400).json({message:"error occured"})
        }
        res.status(200).json({data:newMentor,status:result})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error occured"})
    }

})

///get mentor details

router.get('/all-mentor', async (req, res) => {
    
    try {
        const mentorData =  await getAllMentor(req);
        // console.log(mentorData)
    if(!mentorData){
        return res.status(400).json({message:"no data availabe"})
    }
    res.status(200).json({data:mentorData})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

//delete mentor
router.delete("/delete/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteStudent = req.body;
        if(!id || !deleteStudent){
            return res.status(400).json({message:"Wrong request"})
        }
        const result = await deleteMentorById(id,deleteStudent)
        if(!result.deletedCount<=0){
            return res.status(400).json({message:"error occured"})
        }
        return res.status(201).json({data:deleteStudent,status:result})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

//get mentor by id
router.get("/all-mentor/:id",async(req,res)=>{
    try{
        const {id}= req.params;
        const mentor = await getMentorById(id);
        if(!mentor){
            
            return res.status(400).json({message:"No data available"})

        }
        return res.status(200).json({data:mentor})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.put("/edit-mentors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updateMentor = req.body;
        if (!id || !updateMentor) {
            return res.status(400).json({message:"wrong request"})
        }
        console.log(id)
        const find = await getMentorById(id.trim());
        console.log(find)

        let changed = {...updateMentor}
        console.log(changed)

       
        const result = await editMentor(id, changed);
        if (!result || !result.lastErrorObject.updatedExisting) {
            return res.status(400).json({message:"error occured",status:result})
        }
            res.status(200).json({UpdatedStudent:changed,status:result})




    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})
   
router.get('/mentors/find/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await getMentorById(id)
        if (mentor === null || mentor.length == 0) {
            res.status(400).json({message:"error occured"})
        }
        res.status(200).json({Mentor_Students:mentor.students})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})

router.get('/students/find/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const student = await getStudentById(id)
        if (student === null || student.length == 0) {
            res.status(400).json({message:"error occured"})
        }
        res.status(200).json({student_mentor:student.assigned_Mentor})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
})
export const assignRouter = router;