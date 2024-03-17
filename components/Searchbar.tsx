"use client"
import { scrapeAndStoreProduct } from "@/lib/action";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL=(url: string)=>{
  try{
    const parsedURL=new URL(url);
    const hostname=parsedURL.hostname;
    if(hostname.includes('amazon.com')|| hostname.includes('amazon.')|| hostname.includes('amazon') ){
      return true;
    }

  }
  catch(error){
    return false;
  }
  return false;
}
const Searchbar = () => {
 const[searchPrompt,setSearchPrompt]=useState('');
 const[isLoading,setISLoading]=useState(false);
    const handleSubmit=async (event:FormEvent<HTMLFormElement>)=>{
          event.preventDefault();
          const isValidLink=isValidAmazonProductURL(searchPrompt)
          if(!isValidLink){
            return alert("Please provide valid Amazon link!!")
          }
          try{
            setISLoading(true);
             const product=await scrapeAndStoreProduct(searchPrompt); 
          }
          catch(error){
            console.log('false')
          }
          finally{
            setISLoading(false);
          }
    }
  return (
    <form className='flex flex-wrap gap-4 mt-12' onSubmit={handleSubmit}>
        <input 
        value={searchPrompt}
        onChange={(e)=>setSearchPrompt(e.target.value)}
        type="text"
        placeholder="Enter Product Link"
        className="searchbar-input" />
        <button 
        
        type="submit" className="searchbar-btn" disabled={searchPrompt === ''}>{isLoading ? 'Searching...' : 'Search'}</button>
    </form>
  )
}

export default Searchbar