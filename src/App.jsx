import React,{useState , useEffect,useRef} from 'react'
import Add from './components/AddExpense'
import './App.css'

const App = () => {
    const localData = JSON.parse(localStorage.getItem("expenses"))
  const [expense,setExpense] = useState(localData !== null ? localData:[])
  useEffect(()=>{
    localStorage.setItem("expenses",JSON.stringify(expense))
  },[expense])
  // const firstRender = useRef(true)
    
    
  // useEffect(()=>{
  //     if(firstRender.current===true){
  //       firstRender.current = false
  //       return
  //     }
  //   localStorage.setItem("expenses",JSON.stringify(expense))
  //   },[expense])
  // setItem - This method used for saving items in local storage
  // getItem - This method is used to take out data from the local storage
  // useEffect(()=>{
  //    const localData = JSON.parse(localStorage.getItem("expenses"))
  //   setExpense(localData)

  // },[])
  const[selectedCategory,setSelectedCategory]=useState("All")
  const[editingExpense,setEditingExpense]=useState(null)
  const[editingIndex,setEditingIndex]=useState(null)
  const[searchTerm,setSearchTerm]= useState("")
  const[sortOrder,setSortOrder] = useState("Low → High")
  console.log(expense)
  
  function handleAddExpense(newExpense){
    const handling = [...expense,newExpense] 
    setExpense(handling)
     }
  function handleDeleteExpense(deleteIndex){
    const confirmDelete = confirm("Are you sure you want to delete this expense?")
    // confirm- return value true if ok,false in cancel
    if(confirmDelete===false){
      return
    }
    const updatedExpense=expense.filter((item,index)=>{
      return index!==deleteIndex
     
    })
    setExpense(updatedExpense)
  }
  function handleEditExpense(editIndex){
    const currentExpense = expense[editIndex]
    // console.log("EDIT CLICK", currentExpense)
    setEditingExpense(currentExpense)
    setEditingIndex(editIndex)
  }
  function handleUpdateExpense(updatedExpense){
    const changedExpense = expense.map((item,index)=>{
      if(index === editingIndex){
        return updatedExpense
      }
      return item

    })
    setExpense(changedExpense)
    setEditingExpense(null)

  }
  function handleCancelEdit(){
    setEditingExpense(null)
    setEditingIndex(null)
  }
  
  
  const total = expense.reduce((total,item)=>{
    return total + Number(item.amount)
  },0)
//   reduce- array ki multiple values ka 1 answer dene k liye aur syntax ye hai iska:-
//    array.reduce((accumulator,currentValue)=>{
// },initialValue)
// function filtering(new_category){
// const filteredExpense= expense.filter((item,index)=>{
//   return item.category===new_category
// })}
  const filteredExpense = expense
  .map((item,index)=>{
    return{
      item:item,
      index:index
  }

  })
  .filter((item,index)=>{
   return (item.item.category === selectedCategory || selectedCategory === "All")
    &&
    (item.item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  })
  .sort((a,b)=>{
    if(sortOrder==="Low → High"){
    return Number(a.item.amount) - Number(b.item.amount)
    }
    return Number(b.item.amount) - Number(a.item.amount)
  })
  // Sorting: expenses ko amount ke basis par Low → High ya High → Low arrange karna.
// sort() comparator rule: Negative → a first, Positive → b first, Zero → equal.
// Low → High: a.amount - b.amount
// High → Low: b.amount - a.amount
  const filteredTotal = filteredExpense.reduce((total,item)=>{
    return total + Number(item.item.amount)
  },0)
  return (
    <div className="app"><h1>Expense Tracker 💸</h1>
      <Add onAdd={handleAddExpense}
        editingExpense={editingExpense}
        onUpdate={handleUpdateExpense}
        onCancelEdit={handleCancelEdit}
      />
      
 <div className="factors">
 <div className="filter">
 <label>Search :</label>
 <input  onChange = {(e)=>{setSearchTerm(e.target.value)}}/></div>
 <div className="filter">
  <label>Category :</label>
<select onChange={(e)=>setSelectedCategory(e.target.value)}>
  <option>All</option>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Bills</option>
</select>
</div>
<div className="filter">
<label>Sort :</label>
<select onChange={(e)=>{setSortOrder(e.target.value)}}>
    <option>Low → High</option>
    <option>High → Low</option>
  </select>
  </div>
    </div>
     
      <div className="expense-list">
        <h3>Expense List</h3>
        <div className="expense-header">
          <div className="expense-header_details">
          <span>Name</span>
          <span>Amount</span>
          <span>Category</span>
          </div>
          <div className="expense-header_action">
          <span>Action</span>
          </div>
        </div>
      {
        filteredExpense.map((item,index)=>{
          return(
             
        <div className ="expense-item" key={index}>
        
       <div className="expense-info">
      
        <span>{item.item.name}</span>
        <span>₹{item.item.amount}</span>
        <span>{item.item.category}</span>
       </div>
       <div className="expense-buttons">
        &nbsp;<button onClick={()=>handleEditExpense(item.index)}>Edit</button>
        &nbsp;<button onClick={()=>handleDeleteExpense(item.index)}>Delete</button></div></div>)
    
})}
</div>
{/* <h2>Total Expense:{total}</h2>
(it shows-sum of all expenses and filteredExpenses shows only of filtered items only ) */}
  <h2>Total Expense : ₹{filteredTotal}</h2> 
    </div>
  )
}

export default App