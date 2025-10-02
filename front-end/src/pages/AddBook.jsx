import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addBook } from '../features/cloudinary/bookModel'
const AddBook = () => {
  
    const dispatch = useDispatch()
    const [title,setTitle] = useState("")
const [price,setPrice] = useState("")
const [cover,setCover] = useState(null)

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("profile", cover); // must match backend multer field

        await dispatch(addBook(formData));

        // optional reset
        setTitle("");
        setPrice("");
        setCover(null);
    } catch (error) {
        console.log(error.message);
    }
};

  return (
    <div>
        <form action="">
            <h1>addBook</h1>
            <input value={title} onChange={(e)=> setTitle(e.target.value)} type="text" name="" id="" placeholder='Enter Book TITLE'/> <br />
            <input value={price} onChange={(e) => setPrice(e.target.value)} type="text" name="" id="" placeholder='Enter Price'/> <br />
            <input onChange={(e) => setCover(e.target.files[0])} type="file" />
            <button onClick={handleSubmit}>Add Book</button>
        </form>
    </div>
  )
}

export default AddBook