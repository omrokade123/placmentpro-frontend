import { useEffect, useState } from "react";
import API from "@/api/axios";

import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow
} from "@/components/ui/table";
import { User } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminCompanies() {

 const [companies, setCompanies] = useState([]);

 const loadCompanies = async () => {

   const res =
     await API.get("/admin/companies/pending");

   setCompanies(res.data);

 };

 useEffect(() => {
   loadCompanies();
 }, []);


 const approve = async (id) => {

   await API.put(
     `/admin/companies/${id}/approve`
   );

   loadCompanies();
 };

 const reject = async (id) => {

   await API.put(
     `/admin/companies/${id}/reject`
   );

   loadCompanies();
 };


 return (

   <div className="space-y-6">

     {/* HEADER */}
     <div>
       <h1 className="text-3xl font-bold">
         Company Approvals
       </h1>

       <p className="text-muted-foreground">
         Validate companies added by users
       </p>
     </div>


     {/* TABLE */}
     <div className="
       bg-white
       rounded-2xl
       shadow-sm
       border
     ">

       <Table>

         <TableHeader>

           <TableRow>
             <TableHead>Company</TableHead>
             <TableHead>Added By</TableHead>
             <TableHead>Type</TableHead>
             <TableHead>Status</TableHead>
             <TableHead className="text-right">
               Actions
             </TableHead>
           </TableRow>

         </TableHeader>


         <TableBody>

           {companies.map(company => (

             <TableRow
               key={company._id}
               className="hover:bg-gray-50"
             >

               <TableCell className="font-medium">
                 {company.name}
               </TableCell>

               <TableCell>
                 {company.createdBy?.name || "System"}
               </TableCell>

               <TableCell>

                 {company.isUserAdded ? (

                   <Badge className="
                    bg-blue-100 text-blue-700 flex gap-1
                   ">
                    <User size={14}/>
                     User Added
                   </Badge>

                 ) : (

                   <Badge variant="secondary">
                     Default
                   </Badge>

                 )}

               </TableCell>


               <TableCell>

                 <Badge className="
                   bg-yellow-100
                   text-yellow-700
                 ">
                   Pending
                 </Badge>

               </TableCell>


               <TableCell className="text-right space-x-2">

                 <Button
                   size="sm"
                   className="
                     bg-green-600
                     hover:bg-green-700
                   "
                   onClick={() =>
                     approve(company._id)
                   }
                 >
                   Approve
                 </Button>

                 <Button
                   size="sm"
                   variant="destructive"
                   onClick={() =>
                     reject(company._id)
                   }
                 >
                   Reject
                 </Button>

               </TableCell>

             </TableRow>

           ))}


           {/* EMPTY STATE */}
           {companies.length === 0 && (

             <TableRow>
               <TableCell
                 colSpan={5}
                 className="
                   text-center
                   py-12
                   text-gray-400
                 "
               >
                 No companies awaiting approval 🎉
               </TableCell>
             </TableRow>

           )}

         </TableBody>

       </Table>

     </div>

   </div>

 );
}
