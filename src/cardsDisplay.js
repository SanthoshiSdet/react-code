import React, { useEffect, useState } from "react";
import Modal from "./modal";
export default function CardsDisplay(){
    const [cards,setCards]=useState([])
    const [error,setError]=useState(null)
    const [modalData,setModalData]=useState("")
    const [showModal,setShowModal]=useState(false)
    useEffect(()=>{
        const fetchData=async()=>{
            try{
               const response =await fetch("https://jsonplaceholder.typicode.com/photos");
               const data=await response.json();
               setCards(data);
              
            }catch{
            setError("Error while fetching data")
            console.log(error)
            }
        }
        fetchData();
    },[])

    if(error){
        return <p>Error fetching data</p>
    }
    return (
        <div>
            <h2 >Task 2: Advanced dynamic UI with API calls and state management</h2>
        <div className="card-grid" >
            {
                cards.slice(0,20).map((item,index)=>{
                 return   <div key={index} className="grid-item">
                    <img src={item.thumbnailUrl} alt="Image"/>
                         
                        <p>{item.title }</p>
                        <button onClick={()=>{
                            setModalData(item)
                            setShowModal(true)
                        }}>Read More</button>
                        </div>
                })
            }
        {showModal && <Modal data={modalData} closeModal={()=>setShowModal(false)}/>}
        </div>
        </div>
    )

    
}