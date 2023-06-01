import { useRouter } from "next/router";
import UpdateUserForm from "@/Components/updateUserForm";

export async function getStaticPaths(){
    const data = await fetch('http://localhost:3000/api/users');
    const users = await data.json();
    //console.log(users)

    const paths = users.users.map((user,index)=>{
        return {
            params:{index: user._id.toString()}
        }
    })
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps(context){
    const id = context.params.index;
    const resp = await fetch(`http://localhost:3000/api/users/${id}`);
    const userData = await resp.json();

    return {
        props:{userData}
    };
}



export default function UserDetails({userData}) {
  const router = useRouter();
  return (
    <div className="relative w-screen h-screen">
      <div className=" absolute container flex justify-center mx-auto items-center translate-x-1/2 translate-y-1/3 top-0 right-2/4 flex-col outline-1">
        <img src={userData.user.avatar} className="rounded-full"/>
        <span className="mb-20 mt-20"><p>{userData.user.name}</p></span>
        <UpdateUserForm userData={userData.user}/>
      </div>
    </div>
  );
}
