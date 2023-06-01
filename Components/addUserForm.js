import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import Success from "./Success";


const formReducer = (state,event)=>{
    return{
        ...state,
        [event.target.name] : event.target.value
    }
}
function AddUserForm() {
    const [formData, setFormData] = useReducer(formReducer,{});

    const postUser = async (userData)=>{
      const resp = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(userData)

      });
      const data = await resp.json();
      console.log(data);
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        if(Object.keys(formData).length === 0){
            console.log('No Form Data')
        }
        else{
            let reqObj = {};
            let name = null;
            console.log(formData)
            Object.keys(formData).forEach((key)=>{
              if(key.toLowerCase() === 'firstname'){
                name=formData[key];
                reqObj["name"] = name
              }
              else if(key.toLowerCase() === 'lastname'){
                name+=" "+formData[key];
                reqObj["name"] = name
              }
              else if(key.toLowerCase() !== 'firstname' || key.toLowerCase() !== 'lastname'){
                reqObj[key] = formData[key];
              }
            });
            console.log('Send req object to backend', reqObj)
            postUser(reqObj);
        }

    }
    // if(Object.keys(formData).length > 0){
    //     return <Success message={"Added"}></Success>
    // }

  return (
   <>
     <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={(e)=>handleSubmit(e)}>
      <div className="input-type">
        <input
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          type="text"
          name="firstname"
          placeholder="FirstName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          type="text"
          name="lastname"
          placeholder="LastName"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          type="text"
          name="email"
          placeholder="Email"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          type="text"
          name="salary"
          placeholder="Salary"
          onChange={setFormData}
        />
      </div>
      <div className="input-type">
        <input
          className="border px-5 py-3 focus:outlien-none rounded-md"
          type="date"
          name="date"
          placeholder="Dalary"
          onChange={setFormData}
        />
      </div>

      <div className="flex gap-10 items-center">
        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            value="Active"
            id="radioDefault1"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault1" className="inline-block text-gray-8000">
            Active
          </label>
        </div>

        <div className="form-check">
          <input
            onChange={setFormData}
            type="radio"
            value="inactive"
            id="radioDefault2"
            name="status"
            className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center mr-2 cursor-pointer"
          />
          <label htmlFor="radioDefault2" className="inline-block text-gray-8000">
            Inactive
          </label>
        </div>
      </div>

      <button className="flex justify-center text-center w-52 bg-green-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-green-500 hover:outline-gray-50 text-white">
        ADD
        <span className="px-1"><BiPlus size={24}/></span>
      </button>
    </form>
   </>
  );
}

export default AddUserForm;
