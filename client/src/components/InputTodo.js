import react,{useState} from 'react';


const InputTodo=()=>{

    const [description,setDesc]=useState("")

    const onSubmitForm=async(e)=>{
        e.preventDefault();

        try {
            const body={description};
            const response=await fetch("http://localhost:5000/todos",{
                method:"POST",
                headers:{"Content-Type":"application/json" },
                body:JSON.stringify(body)
            })
            console.log(response)

        } catch (error) {
            console.error(error.message)
        }
    }


    return(
        <>
            <h1 className='text-center mt-5'>Pern todo list</h1>
            <form className='d-flex mt-5' onSubmit={onSubmitForm}>
                <input 
                type="text" 
                className='form-control' 
                value={description}
                onChange={e=>setDesc(e.target.value)}
                ></input>
                <button className='btn btn-success'>Add</button>
            </form>
        </>
    )
}

export default InputTodo;