
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDb from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();

    app.listen(PORT, () => {
      console.log(`Server started at ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  }
};
startServer();


// import express from "express"
// import dotenv from "dotenv"
// dotenv.config();
// import cors from "cors"
// import connectDb from "./config/db.js";
// import cookieParser from "cookie-parser";
// import authRouter from "./routes/auth.routes.js";
// import userRouter from "./routes/user.routes.js"

// const app = express();
// const port = process.env.PORT || 5000

// app.use(cors({
//     origin:"http://localhost:5173",
//     credentials:true
// }))
// app.use(express.json())
// app.use(cookieParser())
// app.use("/api/auth",authRouter)
// app.use("/api/user",userRouter)

// app.listen(port, ()=>{
//     console.log("******************** THANK YOU **********")
//     connectDb()
//     console.log(`Server started at ${port}`)

// })
