import React,{useState} from 'react'
import Add from './components/AddExpense'

const App = () => {
  const [expense,setExpense] = useState([])
  const[selectedCategory,setSelectedCategory]=useState("All")
  const[editingExpense,setEditingExpense]=useState(null)
  const[editingIndex,setEditingIndex]=useState(null)
  console.log(expense)
  function handleAddExpense(newExpense){
    const handling = [...expense,newExpense] 
    setExpense(handling)
     }
  function handleDeleteExpense(deleteIndex){
    const updatedExpense=expense.filter((item,index)=>{
      return index!==deleteIndex
     
    })
    setExpense(updatedExpense)
  }
  function handleEditExpense(editIndex){
    const currentExpense = expense[editIndex]
    console.log("EDIT CLICK", currentExpense)
    setEditingExpense(currentExpense)
    setEditingIndex(editIndex)
  }
  function handleUpdateExpense(updatedExpense){

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
  const filteredExpense = expense.filter((item)=>{
   return item.category === selectedCategory || selectedCategory === "All"
  })
  return (
    <div><h1>Expense Tracker 💸</h1>
      <Add onAdd={handleAddExpense}
        editingExpense={editingExpense}
      />
      {
        filteredExpense.map((item,index)=>{
          return(
        <p key={index}>{item.name}-{item.amount}-{item.category}
        &nbsp;<button onClick={()=>handleEditExpense(index)}>Edit</button>
        &nbsp;<button onClick={()=>handleDeleteExpense(index)}>Delete</button></p>)
})}
<h2>Total Expense:{total}</h2>
<select onChange={(e)=>setSelectedCategory(e.target.value)}>
  <option>All</option>
  <option>Food</option>
  <option>Travel</option>
  <option>Shopping</option>
  <option>Bills</option>
</select>
    </div>
  )
}

export default App