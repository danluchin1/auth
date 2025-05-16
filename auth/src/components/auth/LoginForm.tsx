import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { useAuth } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

const loginSchema = z.object({
    email: z.string().email("Incorrect email"),
    password: z.string().min(8, "Incorrect password"),
});

type LoginFields = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const { login, user } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting}
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema),
    });
    const onSubmit: SubmitHandler<LoginFields> = async (data) => {
        try{
            if(login){
                await login(data.email, data.password);
                navigate(`/dashboard/${user?.uid}`);
            }
        }catch(error){
            setError("root", {
                message: "Failed to login"
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="font-bold text-center text-2xl">Log In</h1>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-0">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} type="email" id="email"/>
                        {errors.email && (
                        <div className="text-sm text-red-500">{errors.email.message}</div>
                        )}
                    </div>

                    <div className="space-y-0">
                        <Label htmlFor="password">Password</Label>
                        <Input {...register("password")} type="password" id="password"/>
                        {errors.password && (
                        <div className="text-sm text-red-500">{errors.password.message}</div>
                        )}
                    </div>

                    <Button disabled={isSubmitting} className="w-full py-3 text-base rounded-3xl" >{isSubmitting ? "Loggining in..." : "Log In"}</Button>
                    {errors.root && (
                        <div className="text-red-500">{errors.root.message}</div>
                    )}
                </form>
                <div className="text-md text-center">
                    Need an account?{" "}
                    <Link to="/register" className="text-blue-500 hover:underline">Sign up</Link>
                </div>
                <div className="text-center text-blue-500 hover:underline">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;