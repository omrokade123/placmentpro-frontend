import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout.jsx";
import toast from "react-hot-toast";

export default function Register() {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    try {

      await API.post("/auth/register", {
        name,
        email,
        password
      });
      
      toast.success("User resgistration successfull");
      navigate("/login");

    } catch(error) {
      console.log(error);
      toast.error("Registration failed");
    }
  };

  return (
    <AuthLayout>

      <Card className="w-95 shadow-xl border-0">

        <CardHeader>
          <CardTitle className="text-2xl">
            Create Account 🚀
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div className="space-y-2">
            <Label>Name</Label>
            <Input onChange={(e)=>setName(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input onChange={(e)=>setEmail(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>

          <Button
            className="w-full hover:bg-blue-800 bg-blue-500 text-white"
            onClick={handleRegister}
          >
            Create Account
          </Button>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-blue-500">
              Sign in
            </Link>
          </p>

        </CardContent>

      </Card>

    </AuthLayout>
  );
}
