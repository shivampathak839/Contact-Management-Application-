// import React from 'react'

import { BsPlusCircle } from "react-icons/bs";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import {collection, getDocs, onSnapshot} from 'firebase/firestore';
import {db} from './config/firebase';
import Navbar from './components/Navbar';
import ContactCard from './components/ContactCard';
import { useEffect, useState } from 'react';
// import Modal from "./components/Modal";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from './hooks/useDisclouse'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoMdToday } from "react-icons/io";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {



  const [contacts, setContact] = useState([])
  const {isOpen, onClose, onOpen} = useDisclouse();


  useEffect(()=>{
    const getContacts = async () => {
      try {
        const contactsRef = collection(db,"contacts");
        // const contactsSnapshot = await getDocs(contactsRef)

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) =>{
            return{
              id:doc.id,
              ...doc.data()
            }
          })
          // console.log(contactLists)
          // console.log(contactsSnapshot);
          setContact(contactLists);
          return contactLists;

        });

        

      } catch (error) {
        console.log(error)

      };

    };
        getContacts();
    
  
  },[])


  const filterContacts =  (e) =>{
    const value = e.target.value;

    const contactsRef = collection(db,"contacts");
        // const contactsSnapshot = await getDocs(contactsRef)

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) =>{
            return{
              id:doc.id,
              ...doc.data()
            }
          });

          const filterContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()));


          setContact(filterContacts);
          return contactLists;

        });


  }

  return (
    <>

    <div className='mx-auto max-w-[370px] px-4'>
      <Navbar/>
      <div className='flex gap-2'>
      <div className='relative flex flex-grow items-center' >
      <PiMagnifyingGlassDuotone className='text-white text-3xl absolute ml-1'/>
        <input onChange={filterContacts} placeholder="Search Contacts" type="text"  className='bg-transparent h-10 border-2 border-white rounded-md flex-grow text-white pl-10 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:outline-none '/>
        
      </div>
      
      <BsPlusCircle onClick={onOpen} className='text-white text-4xl cursor-pointer ' />
      
      </div>
      <div className='mt-4 gap-4 flex flex-col'>
        {
          contacts.length <=0 ? <NotFoundContact/> :contacts.map((contact) => (

              <ContactCard key={contact.id} contact={contact} />
          ))

        }
      </div>


      

    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    <ToastContainer position="bottom-center"/>
    </>
  )
}

export default App;