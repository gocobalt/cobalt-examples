import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 5000;
const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;
const USER_ID = process.env.USER_ID;

const app = express();

// Enable CORS for localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies)
};
app.use(cors(corsOptions));

// Use cookie-parser middleware
app.use(cookieParser());

app.use(express.json());

// Endpoint to check server health
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

// Endpoint to get session token and store it as a cookie
app.get("/api/session-token", async (req, res) => {
  try {
    const response = await fetch(`${API_URL}/session-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
      body: JSON.stringify({
        linked_account_id: USER_ID,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // Store the session token in a cookie
      res.cookie("session_token", data.token, {
        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Prevent CSRF
      });

      res.status(200).send({
        success: true,
        data,
      });
    } else {
      res.status(response.status).send({
        success: false,
        message: data.message || "Failed to fetch session token",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Some error occurred while fetching session token",
      error: err.message,
    });
  }
});

app.post("/api/apps", async (req, res) => {
  try {
    const { token } = req.body;

    const fetchResponse = await fetch(`${API_URL}/application`, {
      method: "GET",
      headers: {
        linked_account_id: `${USER_ID}`,
        "x-api-key": `${API_KEY}`,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await fetchResponse.json();
    return res.json({
      success: true,
      data,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: "Some error occurred while getting apps",
      error: err.message,
    });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
