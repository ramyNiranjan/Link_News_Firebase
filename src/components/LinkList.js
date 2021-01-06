import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../firebase";
import LinkItem from './LinkItem'


function LinkList(props) {
  const {firebase}=useContext(FirebaseContext)
  const [links,setLinks]=useState([])
  const usNewPage=props.location.pathname.includes('new')

 function getLinks(){
  return firebase.firestore.collection('links')
  .orderBy('created','desc')
  .onSnapshot(handleSnapshot)
  //  console.log(unsub)
 }
  function handleSnapshot(snapshot){
    const links=snapshot.docs.map(doc=>{
      return {id:doc.id,...doc.data()}
    })
    setLinks(links)
  }

  function renderLinks(){
    if (usNewPage){
      return links
    } else{

      return links.slice().sort((l1, l2) => l2.votes.length - l1.votes.length)
    }
      
  }
  useEffect(()=>{
    const unsub =getLinks()
    // console.log(unsub())
    return ()=>unsub()
  },[])

  console.log(renderLinks())
  return <div>{
    renderLinks().map((link,index)=><LinkItem key={link.id} showCount={true} link={link} index={index+1} />)
  }</div>;
}

export default LinkList;
