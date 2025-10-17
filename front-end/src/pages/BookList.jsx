import React from 'react'
import { useEffect } from 'react'
import { fetchBooks } from '../features/cloudinary/bookModel'
import { useDispatch, useSelector } from 'react-redux'

const BookList = () => {
    const dispatch = useDispatch()
const {list} = useSelector((state)=> state.books)
useEffect(()=>{
dispatch(fetchBooks())
},[]) 
return (
    <div>
        <div>
            <h1>book title</h1>
            { list.length == 0 ? (
                <div>no book found</div>
            ) : (list.map((book)=>{
                    <div> <h2>{book.img}</h2>
                    <h2>{book.title}</h2> </div>
                   
                }))
                
            }
        </div>
    </div>
  )
}

export default BookList