import { createSlice } from "@reduxjs/toolkit";
import FindUser from "../components/FindUser";

const UserSlice = createSlice({
    name: "User",

    initialState: {
        Loading: true,
        Userdata: null,
    },

    reducers: {
        setUserdata: (state, action) => {
            state.Userdata = action.payload;
        },

        setLoading: (state, action) => {
            state.Loading = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(FindUser.pending, (state) => {
                state.Loading = true
            })

            .addCase(FindUser.fulfilled, (state, action) => {
                state.Userdata = action.payload
                state.Loading = false;
            })

            .addCase(FindUser.rejected, (state) => {
                state.Loading = false;
            });
    }
})

export const { setUserdata, setLoading } = UserSlice.actions;
export default UserSlice.reducer