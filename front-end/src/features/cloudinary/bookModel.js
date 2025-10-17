import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosInstance";
import toast from "react-hot-toast";
export const fetchBooks = createAsyncThunk("/books/fetch", async () => {
    const response = await axiosInstance.get("/books")
    return response.data
})

export const addBook = createAsyncThunk("/books/add", async (formData) => {
    const response = await axiosInstance.post("/addbook", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return response.data
})
const bookSlice = createSlice({
    name: "books",
    initialState: {
        list: []
    },
    reducers: {},
    extraReducers: (builder) => {
builder.addCase(fetchBooks.fulfilled, (state,action)=>{
    state.list = action.payload.books
    console.log(action.payload.books);
    toast.success("book fetched")
})
.addCase(addBook.fulfilled,(state,action) =>{
    state.list.push(action.payload.books)
    console.log(action.payload);
    toast.success(action.payload.message)
})
    }
})

export default bookSlice.reducer