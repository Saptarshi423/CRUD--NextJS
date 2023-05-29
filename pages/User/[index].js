import { useRouter } from "next/router";
export default function UserDetails(){
    const router = useRouter();
    console.log(router)
    return(
        <>
        <p>{router.query.index}</p>
        </>
    );
}