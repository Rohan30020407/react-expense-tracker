import React,{useState ,useEffect} from 'react'

const AddExpense = ({onAdd , editingExpense ,onUpdate ,onCancelEdit }) => {
    const [name,setName] = useState("")
    const [amount,setAmount] = useState("")
    const [category,setCategory] = useState("Food")
    const[error,setError] = useState("")
    useEffect(()=>{
      if(editingExpense){
        setName(editingExpense.name)
        setAmount(editingExpense.amount)
        setCategory(editingExpense.category)

      }

    },[editingExpense])
    function addExpense(){
      if(name.trim() === ""){
          setError("Name field is empty.")
        return 
      }
      if( !/^[A-Za-z0-9 ]+$/.test(name)){
        setError("Expense name contains invalid characters.")
        return
      }
      if(! /[A-Za-z]/.test(name)){
          console.log("LETTER CHECK FAILED")
        setError("Atleast one letter required.")
        return
      }
      if( amount === ""){
          setError("Amount field is empty.")
        return 
      }
      if(isNaN(amount)===true){
        setError("Amount is invalid.")
        return
      }
      if(amount <= 0){
        setError("Amount must greater than 0.")
        return
      }
      
      setError("")
        const expenseData={ 
          id: Date.now(),
          // Date.now=>se time aara hai miliseconds mai mere bhai
          name,
          amount,
          category
        }
        if(editingExpense){
          onUpdate(expenseData)
         
          setName("")
          setAmount("")
          setCategory("Food")

        }
        else{
        onAdd(expenseData)
        // console.log(name,amount,category)
        setName("")
        setAmount("")
        setCategory("Food")
    }}
  return (
    <div className = "form-content">
    <div className="expense-form"><h2>AddExpense</h2>
    {error !== "" && <p style = {{color:"red",fontSize:"13px"}}>{error}</p>}
    <div className="expense-name">
    <label>Name : </label>
    <input placeholder="Enter Name" value={name} onChange={(e)=>{
      setName(e.target.value)
      setError("")
      }}/><br/>
      </div>
      <div className="expense-amount">
     <label>Amount : </label>

     <input  placeholder="Enter Amount"  value={amount} onChange={(e)=>{
      setAmount(e.target.value)
      setError("") 
      }}/><br/>
      </div>
      <div className="expense-category">
     <label>Category:</label>
     <select value={category} onChange={(e)=>setCategory(e.target.value)}><option>Food</option>

     <option>Travel</option>
     <option>Shopping</option>
     <option>Bills</option></select><br/>
               {/* <p>{category}</p> */}
                    </div>
     <button onClick={addExpense}>{editingExpense ? "Update" : "Add"}</button>
</div>
    &nbsp;{ editingExpense && (
      <button onClick={()=>{
        onCancelEdit()
    setName("")
    setAmount("")
    setCategory("Food")
    }}>Cancel</button>
  )}
</div>
)}
export default AddExpense