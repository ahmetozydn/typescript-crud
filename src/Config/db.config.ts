import 'dotenv/config' // module to read .env files
import mongoose from 'mongoose' // object document mapping module

const connectionString = process.env.CONNSTRING
/*
  Avoid hard-coding sensitive information,
  Don't forget to add senitive files to .gitignore,
  Environment variables can be only reached from the process' itself
*/ 
console.log(process.env.example);

const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };



//db connection
export const db = mongoose.connect('mongodb://127.0.0.1:27017/', options) // the connection string is not undefined
  .then(res => {
      if(res){
          console.log(`Database connection id succeffully created.`)
      }
  }).catch(err => {
      console.log(err) // implement a error-handling mechanism
  })