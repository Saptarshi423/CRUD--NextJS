import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";

function Form() {

  const flag = true;
  return (
    <div className='container mx-auto py-5'>
      {flag ? <AddUserForm/> : <UpdateUserForm/>}
    </div>
  );
}

export default Form;
