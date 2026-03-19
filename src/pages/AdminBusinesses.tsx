import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function AdminBusinesses(){

const [businesses,setBusinesses] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/business/all")
.then(res=>res.json())
.then(data=>setBusinesses(data));

},[]);


const approveBusiness = async(id)=>{

await fetch(`http://localhost:5000/api/business/approve/${id}`,{
method:"PUT"
});

alert("Business Approved");

window.location.reload();

};


return(

<div className="min-h-screen bg-slate-50 dark:bg-black">

<Navbar/>

<div className="p-10">

<h1 className="text-3xl font-bold mb-6">
Business Approval Requests
</h1>

<table className="w-full border bg-white">

<thead>

<tr className="bg-gray-200">
<th className="p-3">Business Name</th>
<th className="p-3">Owner</th>
<th className="p-3">Status</th>
<th className="p-3">Action</th>
</tr>

</thead>

<tbody>

{businesses.map((b)=>(
<tr key={b._id} className="text-center border">

<td className="p-2">{b.businessName}</td>
<td className="p-2">{b.ownerName}</td>

<td className="p-2">
{b.approved ? "Approved" : "Pending"}
</td>

<td className="p-2">

{!b.approved && (

<button
onClick={()=>approveBusiness(b._id)}
className="bg-green-600 text-white px-4 py-1 rounded"
>
Approve
</button>

)}

</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

);

}