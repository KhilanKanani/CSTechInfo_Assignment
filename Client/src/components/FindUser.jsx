import axios from "axios";
import { SERVER_URL } from "../main";
import { createAsyncThunk } from "@reduxjs/toolkit";

const FindCurrentUser = createAsyncThunk('', async () => {
  try {
    const result = await axios.get(`${SERVER_URL}/api/auth/me`, { withCredentials: true, timeout: 5000 });
    return result.data;
  }

  catch (err) {
    console.log('FindCurrentUser Error :', err.message);
  }
})

export default FindCurrentUser
