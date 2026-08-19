import React,{useState ,useEffect} from 'react'

const AddExpense = ({onAdd , editingExpense}) => {
    const [name,setName] = useState("")
    const [amount,setAmount] = useState("")
    const [category,setCategory] = useState("Food")
    useEffect(()=>{
      if(editingExpense){
        setName(editingExpense.name)
        setAmount(editingExpense.amount)
        setCategory(editingExpense.category)

      }

    })
    function addExpense(){
        const expenseData={ 
          name,
          amount,
          category
        }
        onAdd(expenseData)
        // console.log(name,amount,category)
        setName("")
        setAmount("")
        setCategory("Food")
    }
  return (
    <div><h2>AddExpense</h2>
    <label>Name:</label>
    <input placeholder="Enter Name" value={name} onChange={(e)=>setName(e.target.value)}/><br/>
    
     <label>Amount:</label>

     <input  placeholder="Enter Amount"  value={amount} onChange={(e)=>setAmount(e.target.value)}/><br/>
     <label>Category:</label>
     <select value={category} onChange={(e)=>setCategory(e.target.value)}><option>Food</option>

     <option>Travel</option>
     <option>Shopping</option>
     <option>Bills</option></select><br/>
               {/* <p>{category}</p> */}
     <button onClick={addExpense}>{editingExpense ? "Update" : "Add"}</button>
    
    </div>
  )
  
}

export default AddExpense