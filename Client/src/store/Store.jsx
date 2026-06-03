import { configureStore } from "@reduxjs/toolkit";
import Userslice from "../redux/UserSlice"

const Store = configureStore({
    reducer: {
        User: Userslice,
    }
})

export default Store