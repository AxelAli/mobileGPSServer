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

import connectDB from "./config/db";

// Load ENV variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

// Route files
//
//

// Create a new express application instance
const app: express.Application = express();

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
const limiter: rateLimit.RateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
//
//

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  ),
);
