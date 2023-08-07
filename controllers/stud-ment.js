import { client } from '../db.js';
import { ObjectId } from "bson";

export function addNewStudent(data){
    return client
    .db("B42")
    .collection("students")
    .insertOne(data)
}

export function getAllStudents(req){
    return client
    .db("B42")
    .collection("students")
    .find()
    .toArray();
}

export function getStudentById(id){
    return client
    .db("B42")
    .collection("students")
    .findOne({_id: new ObjectId(id)})
}

export function addNewMentor(data){
    return client
    .db("B42")
    .collection("mentors")
    .insertOne(data)
}

export function getAllMentor(req){
    return client
    .db("B42")
    .collection("mentors")
    .find()
    .toArray();
}

export function deleteMentorById(id,data){
    return client
    .db("B42")
    .collection("mentors")
    .findOneAndDelete({_id : new ObjectId(id)},{$set:data})
}

export function getMentorById(id){
    return client
    .db("B42")
    .collection("mentors")
    .findOne({_id: new ObjectId(id)})
}

export function getUnassignedStudents(){
    return client
    .db("B42")
    .collection("students")
    .find({hasMentor:"false"})
    .toArray();
} 

export function editStudent(id, data) {
    return client
    .db("B42")
        .collection("students")
        .findOneAndUpdate({ _id: new ObjectId(id) },{$set:data})
}

export function editMentor(id, data) {
    return client
    .db("B42")
        .collection("mentors")
        .findOneAndUpdate({ _id: new ObjectId(id) },{$set:data})
}

export function updateManyStudents(id,data){
    return client
    .db("B42")
    .collection("students")
    .updateMany({_id: new ObjectId(id)},{$set:{assigned_Mentor:data, hasMentor:"true"}});
}

