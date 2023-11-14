import mongoose from 'mongoose';

const connectDb = async () => {
  const URL = "mongodb+srv://ashkakumari:ashkaatlas@cluster0.bmhbett.mongodb.net/RMintdb";
  try {
    await mongoose.connect(URL);
    console.log('MongoDb is connected');
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDb;
