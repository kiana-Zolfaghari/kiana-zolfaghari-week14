function Search({contacts,setContacts}){


    const SearchData = (e)=>{
const value = e.target.value
console.log(value)
 const newList = contacts.filter((i)=>i.name === value)
 if(newList){
    setContacts(newList)
 }else{
    
    console.log(newList)
 }
 
return <>
<div>
    <input type="text"  placeholder="search..."  style={{border:"none",width:"30%",height:"2rem",backgroundColor:"#f5f4f4",borderRadius:"10px",marginBottom:"2px"}}
    
    onChange={SearchData}/>
</div>
</>
}}

export default Search