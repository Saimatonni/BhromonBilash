import mongoose from 'mongoose';
import config from '.';

class Database{
  constructor(){
    const url = config.dbUrl;
  /* eslint-disable no-console */
  mongoose
    .connect(url as string)
    .then(() => {
      console.info('Database connected successfully....');
    })
    .catch((err) => {
      console.info('Error connecting to database', err);
    });
  }
}
new Database()




export function abc(){
  
}
