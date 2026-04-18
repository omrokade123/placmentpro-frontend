import { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout.jsx";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { token } = useContext(AuthContext);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      login(res.data.token, res.data.user);
      if (res.data.user.role === "admin") {
        toast.success("admin login successfull");
        navigate("/admin");
      } else {
        toast.success("Student login successfull");
        navigate("/dashboard");
      }
    } catch(err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <AuthLayout>
      <Card className="w-95 shadow-xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome back 👋</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="w-full hover:bg-blue-800 bg-blue-500 text-white" onClick={handleLogin}>
            Sign In
          </Button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-medium">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </AuthLayout>
  );
}
