'use client'
import Image from "next/image"
import {useState, useEffect } from "react"
import {firestore} from "@/firebase"
import {Box, Typography } from "@mui/material"
import {collection,deleteDoc,getDocs, query} from 'firebase/firestore'
export default function Home() {
// Sate variable to store investory -- empty array
const [inventory, setInventory]= useState([])
// state variable for our order which we are gonna use to add / remove stuff
const [open, setOpen]=useState(false)
//set item names
const [itemName, setItemName]=useState('')
//'' is a default value

// function to fetch updating inventory from firebase, make it async b/c it wont block our code when fetching.. entire website freezes when you are fetching
const updateInventory = async () =>{
  // get snapshot of collection by doing query
  const snapshot =query(collection(firestore, 'inventory'))
    // once we have a snapshot we want to get document
  const docs = await getDocs(snapshot)
  const inventoryList=[]
 // for every document in docs
 docs.forEach((doc)=>{
  // want to push new doc
  inventoryList.push({
    id: doc.id,
    ...doc.data(),
  })
 })
setInventory(inventoryList)

}
////////remove items from firebase
const removeItem=async(item)=>{
  const docref=doc(collection(firestore,'inventory'),item)
  // get direct item reference
  const docSnap=await getDocs(docref)
  if(docSnap.exists()){
    const{quantity}=docSnap.data()
    
    await setDoc(docref,{quantity:quantity+1})
  

}
else{
  await setDoc(docref,{quantity:1})
  
}
  //update inventory
  updateInventory()
}
// Add item
const addItem=async(item)=>{
  const docref=doc(collection(firestore,'inventory'),item)
  // get direct item reference
  const docSnap=await getDocs(docref)
  if(docSnap.exists()){
    const{quantity}=docSnap.data()
    if(quantity==1){
      await deleteDoc(docref)
  }
  else{
    await setDoc(docref,{quantity:quantity-1})
  }
  //update inventory
  updateInventory()
}}
// it runs update inventory whenever something in dependency array changes, 
//as array is empty it will run once, at beggning when page loads
useEffect(()=>{
updateInventory()
},[])
//put models of a function
const handleOpen=()=> setOpen(true)
const handleClose=()=>setOpen(false)
  return (

    //box is a basic thing in UI
   <Box> 
<Typography variant ="h1" >Inventory Management</Typography>{
 
}

   </Box>
  );
}
