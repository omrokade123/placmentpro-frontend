import { useEffect, useState } from "react";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select";

import { fetchCompanies }
from "../api/company";

export default function CompanyDropdown({
  value,
  onChange
}) {

  const [companies,setCompanies]=useState([]);

  useEffect(()=>{

    const load=async()=>{

      const res=await fetchCompanies();
      setCompanies(res.data);

    };

    load();

  },[]);

  return(

    <Select
      value={value}
      onValueChange={onChange}
    >

      <SelectTrigger>
        <SelectValue placeholder="Select Company"/>
      </SelectTrigger>

      <SelectContent>

        {companies.map(c=>(
          <SelectItem
            key={c._id}
            value={c._id}
          >
            {c.name}
          </SelectItem>
        ))}

        {/* OTHER OPTION */}
        <SelectItem value="other">
          Other (Not Listed)
        </SelectItem>

      </SelectContent>

    </Select>

  );
}
