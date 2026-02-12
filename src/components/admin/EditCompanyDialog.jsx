import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import API from "@/api/axios";
import { toast } from "sonner";

export default function EditCompanyDialog({
 company,
 onUpdated
}){

 const [open,setOpen] = useState(false);
 const [loading,setLoading] = useState(false);

 const [form,setForm] = useState({
   name: company.name,
   difficultyLevel:
     company.difficultyLevel || "",
 });

 //--------------------------------

 const update = async ()=>{

   if(!form.name){
     return toast.error("Name required");
   }

   try{

     setLoading(true);

     await API.put(
       `/admin/companies/${company._id}`,
       form
     );

     toast.success("Company updated");

     setOpen(false);

     onUpdated?.();

   }catch{
     toast.error("Update failed");
   }
   finally{
     setLoading(false);
   }
 };

 //--------------------------------

 return(

 <Dialog open={open} onOpenChange={setOpen}>

 <DialogTrigger asChild>
   <Button size="sm" variant="outline">
     Edit
   </Button>
 </DialogTrigger>

 <DialogContent>

 <DialogHeader>
   <DialogTitle>
     Edit Company
   </DialogTitle>
 </DialogHeader>


 {/* NAME */}
 <Input
   placeholder="Company name"
   value={form.name}
   onChange={(e)=>
     setForm({
       ...form,
       name:e.target.value
     })
   }
 />


 {/* DIFFICULTY */}
 <Input
   placeholder="Difficulty (easy/medium/hard)"
   value={form.difficultyLevel}
   onChange={(e)=>
     setForm({
       ...form,
       difficultyLevel:e.target.value
     })
   }
 />


 <Button
   disabled={loading}
   onClick={update}
 >
   {loading
     ? "Updating..."
     : "Update Company"}
 </Button>

 </DialogContent>
 </Dialog>
 );
}
