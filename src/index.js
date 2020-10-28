import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";
import cors from "cors";

import connectDB from "./config/db.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load ENV variables
dotenv.config({ path: __dirname + "/./config/config.env" });

// Connect to database
connectDB();

// Route files
import locations from "./routes/locations.js";
import users from "./routes/users.js";

// Create a new express application instance
const app = express();

// Body parser
app.use(express.json());

// Dev. logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use("./locations", locations);
app.use("./users", users);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
