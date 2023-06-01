import { useEffect, useReducer, useState } from "react";
import { BiBrush, BiPlus } from "react-icons/bi";
import Success from "./Success";
import useToggle from "@/helpers/useToggle";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value,
  };
};
function UpdateUserForm({ userData }) {
  //const [formData, setFormData] = useReducer(formReducer,{});
  const [avatar, setAvatarUrl] = useState("");
  const [date, setDate] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [salary, setSalary] = useState(0);
  const [status, setStatus] = useState("");
  const [showUpdateBtn, setShowUpdateBtn] = useState(false);
  const [visible, toggle, setVisible] = useToggle(); //Custom Hook.

  const updateData = async (reqData)=>{
    const resp = await fetch(`http://localhost:3000/api/users/${userData._id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqData)

    });
    const data = await resp.json();
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatar!=="" && firstname!=="" && lastname!="" && salary!=="" && status!="" && email!=="" && date!==null) {
      // Create a req obj & send it to the backend.
      let reqObj = {
        avatar: avatar,
        name: firstname + " " + lastname,
        email: email,
        salary: salary,
        date: date,
        status: status,
      };
      updateData(reqObj);
      setVisible(true);
    } else {
      console.log({});
    }
  };
  const handleChange = (e) => {
    if (e.target.name.toLocaleLowerCase() === "firstname") {
      setFirstName(e.target.value);
    } else if (e.target.name.toLocaleLowerCase() === "lastname") {
      setLastName(e.target.value);
    } else if (e.target.name.toLocaleLowerCase() === "email") {
      setEmail(e.target.value);
    } else if (e.target.name.toLocaleLowerCase() === "salary") {
      setSalary(e.target.value);
    } else if (e.target.name.toLocaleLowerCase() === "date") {
      setDate(e.target.value);
    } else if (e.target.name.toLocaleLowerCase() === "status") {
      setStatus(e.target.value);
    }
    setShowUpdateBtn(true);
  };

  useEffect(() => {
    for (let key in userData) {
      if (key === "name") {
        let firstname = userData.name.substring(0, userData.name.indexOf(" "));
        let lastname = userData.name.substring(userData.name.indexOf(" ") + 1);
        setFirstName(firstname);
        setLastName(lastname);
      } else if (key === "avatar") {
        setAvatarUrl(userData[key]);
      } else if (key === "email") {
        setEmail(userData[key]);
      } else if (key === "salary") {
        setSalary(userData[key]);
      } else if (key === "date") {
        setDate(userData[key]);
      } else if (key === "status") {
        setStatus(userData[key]);
      }
    }
  }, [userData]);

  return (
    <>
      {visible ? <Success message={'User Updated.'} visible={visible} setVisible={setVisible}/> : <div className="w-full justify-center items-center">
      <form
        className="grid lg:grid-cols-2 w-4/6 gap-4 m-auto"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            type="text"
            readOnly={false}
            name="firstname"
            placeholder="FirstName"
            value={firstname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            type="text"
            name="lastname"
            placeholder="LastName"
            value={lastname}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            type="text"
            name="email"
            placeholder="Email"
            onChange={() => {
              setShowUpdateBtn(true);
              setFormData;
            }}
            value={email}
          />
        </div>
        <div className="input-type">
          <input
            className="border w-full px-5 py-3 focus:outline-none rounded-md"
            type="text"
            name="salary"
            placeholder="Salary"
            value={salary}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>
        <div className="input-type">
          <input
            className="border px-5 py-3 focus:outlien-none rounded-md"
            type="date"
            name="date"
            placeholder="Date"
            value={date}
            onChange={(e) => {
              handleChange(e);
            }}
          />
        </div>

        <div className="flex gap-10 items-center">
          <div className="form-check">
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              checked={status.toLocaleLowerCase() === "active" ? true : false}
              type="radio"
              value="Active"
              id="radioDefault1"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault1"
              className="inline-block text-gray-8000"
            >
              Active
            </label>
          </div>

          <div className="form-check">
            <input
              onChange={(e) => {
                handleChange(e);
              }}
              checked={status.toLocaleLowerCase() === "active" ? false : true}
              type="radio"
              value="inactive"
              id="radioDefault2"
              name="status"
              className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-green-500 checked:border-gray-500 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center mr-2 cursor-pointer"
            />
            <label
              htmlFor="radioDefault2"
              className="inline-block text-gray-8000"
            >
              Inactive
            </label>
          </div>
        </div>

        {showUpdateBtn && (
          <button className="flex justify-center text-center w-52 bg-yellow-500 px-4 py-2 border rounded-md hover:bg-gray-50 hover:text-green-500 hover:outline-gray-50 text-white">
            Update
            <span className="px-1">
              <BiBrush size={24} />
            </span>
          </button>
        )}
      </form>
    </div>}
    </>
  );
}

export default UpdateUserForm;
