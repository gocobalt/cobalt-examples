import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { API_URL } from "./const.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const API_KEY = process.env.API_KEY;
const USER_ID = process.env.USER_ID;

const app = express();

// Enable CORS for localhost:5173
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true, // Allow credentials (cookies) - can be removed if not needed
};
app.use(cors(corsOptions));

app.use(express.json());

// Endpoint to check server health
app.get("/", (req, res) => {
  res.status(200).send({
    message: "Server is running",
  });
});

/**
 * @route   POST https://api.gocobalt.io/api/v2/public/session-token
 * @desc    This API generates a session token to authenticate a linked account.
 * @docs    https://docs.gocobalt.io/api-reference/session-token/generate-token-for-linked-account
 */

app.get("/api/session-token", async (req, res) => {
  console.log("user id is", USER_ID);
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

    console.log("token data: ", data);

    if (response.ok) {
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

/**
 * @route   GET https://api.gocobalt.io/api/v2/public/application
 * @desc    This API lists all enabled applications for a specific linked account.
 * @docs    https://docs.gocobalt.io/api-reference/integration-meta/list-applications
 */

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
    console.log("app data is: ", data);
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
