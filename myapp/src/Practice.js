import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";


const Practice = () =>{

    const [data , setData] = useState([])


      useEffect(async()=>{
        await axios.get('https://jsonplaceholder.typicode.com/posts/1/comments')
        .then((val)=>{
            console.log('VAl==>>>',val)
            setData(val.data)
        })
        .catch(err=> console.log('error0',err))
      },[])

    return(

       <div>
        <input onChange={(e)=>{e.target.value}}/>
            {
                data?.map((val)=>(
                    <div>
                  NAME :   {val.name}
                        </div>
                ))
            }
       </div>

    )
}

export default Practice;