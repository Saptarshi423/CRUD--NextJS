import React from 'react';
import { BiEdit, BiTrashAlt} from "react-icons/bi";
import Link from 'next/link';

function Table({users}) {
  return (
    <table className='min-w-full table-auto'>
        <thead>
            <tr className='bg-gray-800'>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Name</span>
                </th>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Email</span>
                </th>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Salary</span>
                </th>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Birthday</span>
                </th>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Status</span>
                </th>
                <th className='px-16 py-2'>
                    <span className='text-gray-200'>Actions</span>
                </th>
            </tr>
        </thead>

        <tbody className='bg-gray-200'>
            {users.users.map((data, index)=>{
                //console.log(data)
                let {_id, name, avatar, email, salary, date, status} = data;
                return(
                    <Tr key={index} id={_id} name={name} avatar={avatar} email={email} salary={salary} date={date} status={status}/>
                );
            })}
        </tbody>
    </table>
  )
}

function Tr({id, name, avatar, email, salary, date, status}){
    const deleteUser = async (id)=>{
        let url = `http://localhost:3000/api/users/${id}`;
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        });
        const res = await response.json();
    }
    const getStyle = ()=>{
        let styleObj = {};
        if(status.toLowerCase() === 'active'){
            styleObj.background = 'green';
        }
        else{
            styleObj.background = 'red';
        }
        return styleObj
    }
    return (
        <>
            <tr className='bg-gray-50 text-center'>
                <td className='px-16 py-2 flex flex-row items-center'>
                    <img src={avatar || '#'} alt=''/>
                    <span className='text-center ml-2 font-semibold'>{name || 'Unknown'}</span>
                </td>
                <td className='px-16 py-2'>
                    <span>{email || 'Unknown'}</span>
                </td>
                <td className='px-16 py-2'>
                    <span>{salary || 'unknown'}</span>
                </td>
                <td className='px-16 py-2'>
                    <span>{date || 'Unknown'}</span>
                </td>
                <td className='px-16 py-2'>
                    <button className='cursor'><span className='text-white px-5 py-1 rounded-3xl txt' style={getStyle()}>{status}</span></button>
                </td>
                <td className='px-16 py-20 flex justify-around gap-5'>
                    <Link href={`/User/${id}`}><button className='cursor'><BiEdit size={25}color={"rgb(34,197,94)"}></BiEdit></button></Link>
                    <button className='cursor' onClick={()=>{deleteUser(id)}}><BiTrashAlt size={25}color={"rgb(244,63,94)"}></BiTrashAlt></button>
                </td>
            </tr>
        </>
    );
}

export default Table;