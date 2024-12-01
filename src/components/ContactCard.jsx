// import React from 'react'
// import React, { useEffect, useState } from 'react';

import {HiOutlineUserCircle} from 'react-icons/hi';
import {RiEditCircleLine} from 'react-icons/ri'
import {IoMdTrash}from 'react-icons/io'
import AddAndUpdateContact from './AddAndUpdateContact';

import { doc, deleteDoc } from 'firebase/firestore'; 
import { db } from '../config/firebase';
import useDisclouse from '../hooks/useDisclouse';
import { ToastContainer, toast } from 'react-toastify';
// eslint-disable-next-line react/prop-types
const ContactCard = ({contact}) => {
  
  const {isOpen, onClose, onOpen} = useDisclouse();

  

  const deleteContact = async (id) =>{
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success('contact deleted successfully');
      
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
    <div key={contact.id} className='flex bg-yellow justify-between items-center p-2 rounded-lg'>
              <div className='flex gap-1'>
              <HiOutlineUserCircle className='text-4xl text-orange ' />
                <div className=' '>
                  <h2 className='font-medium'>{contact.name}</h2>
                  <p className='text-sm'>{contact.email}</p>
                </div>
              </div>
              <div className='flex text-3xl'>
                <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
                <IoMdTrash onClick={()=> deleteContact(contact.id)} className='text-orange cursor-pointer' />
              </div>
            </div>
            <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
            </>
            
  );
};

export default ContactCard;
