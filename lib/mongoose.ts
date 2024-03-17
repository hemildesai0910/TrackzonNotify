import mongoose from 'mongoose';

let isConnected = false;// Variable to track the connection status

export const connectToDB = async () => {
  mongoose.set('strictQuery', true);

  if(!"mongodb://localhost:27017/Project") return console.log('LOCAL HOSTs is not defined');

  if(isConnected) return console.log('=> using existing database connection');

  try {
    await mongoose.connect("mongodb://localhost:27017/Project")

    isConnected = true;

    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error)
  }
}