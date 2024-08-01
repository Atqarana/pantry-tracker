'use client'
import Image from "next/image"
import {useState, useEffect } from "react"
import {firestore} from "@/firebase"
import {Box,Modal, Stack, Typography, TextField, Button } from "@mui/material"
import {collection,deleteDoc,getDocs, query,getDoc} from 'firebase/firestore'
import { Modern_Antiqua } from "next/font/google"
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

    //box is a basic thing in UI , //Model is add product to inventory managemnt mature ui has prebuild models for us
  // position absolute center the box , transform center it more
<Box width="100vw" height ="100vh" display ="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}> 
 <Modal
 open={open}
 onClose={handleClose}
 > 
 <Box position= "absolute" top="50%" left="50%" width={400} bgcolor="white" border="2px solid #000" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={
    {transform: 'translate(-50%, -50%)'}
 }>
  <Typography variant="h6">Add Item</Typography>
  <Stack width="100" direction="row" spacing={2}>

  <TextField label="Item Name" variant="outlined" fullWidth value={itemName} onChange={(e)=>setItemName(e.target.value)}/>

  <Button variant="contained" color="primary" onClick={()=>{
    addItem(itemName) 
    setItemName('') 
    handleClose()}}>Add</Button>
  </Stack>
 </Box>
  
 </Modal>
<Button variant="contained" onClick={()=>{
handleOpen()
}
}>Add new Item</Button>
<Box border="1px solid #333"> 

  <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center"> 

  <Typography variant="h2" color="#333" align="center">Inventory Tracker</Typography>
  </Box>
</Box>
<Stack width="800px" height="100px" spacing={2} overflow="auto"> 
  {
    inventory.map((item)=>(
      <Box key={item.id} display="flex" alignItems="center" justifyContent="space-between" border="1px solid #333" p={2}>
        <Typography variant="h3">{item.name}</Typography>
        <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" onClick={()=>addItem(item.id)}>+</Button>
        <Typography variant="h6">{item.quantity}</Typography>
        <Button variant="contained" color="secondary" onClick={()=>removeItem(item.id)}>-</Button>
        </Stack>
      </Box>
    ))
  }
  

</Stack>
   </Box>
  );
}
