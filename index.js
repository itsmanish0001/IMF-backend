import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { isAuthenticated } from "./middlewares.js";
import { errorMiddleware } from "./error.js";
import { login} from "./controllers.js";
import { dbConnect } from "./database.js";
import gadgetRoutes from "./routes/gadget.js";

// Load environment variables
dotenv.config({
    path: "./.env",
});

// Connect to the database
dbConnect();

const port = process.env.PORT || 4000;
const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies


app.get('/login', login);
app.use(isAuthenticated);

app.use("/gadgets", gadgetRoutes);


// Error handling middleware
app.use(errorMiddleware);

app.listen(5000, () => {
    console.log(`app is listening on ${port}`);
});
