import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const db = mongoose.connect(process.env.CONNECTIONURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((data)=>{
    console.log("DB Connected!")
}).catch((err)=>{
    console.log(err)
})

export default db;