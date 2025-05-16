import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import { useAuth } from "../../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";

const signupSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirm, {
    message: "Passwords don't match.",
    path: ["confirm"],
});

type SignupFields = z.infer<typeof signupSchema>;

const SignupForm = () => {
    const { signup, user } = useAuth();
    const navigate = useNavigate();
    const { 
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<SignupFields>({
            resolver: zodResolver(signupSchema),
        });
    const onSubmit: SubmitHandler<SignupFields> = async (data) => {
        try{
            if(signup){
                await signup(data.email, data.password);
                navigate(`/dashboard/${user?.uid}`);
            }
        }catch(error){
            setError("root", {
                message: "Email is already in use or signup failed",
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="font-bold text-center text-2xl">Sign Up</h1>
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

                    <div className="space-y-0">
                        <Label htmlFor="confirm">Confirm Password</Label>
                        <Input {...register("confirm")} type="password" id="confirm"/>
                        {errors.confirm && (
                            <div className="text-sm text-red-500">{errors.confirm.message}</div>
                        )}
                    </div>

                    <Button disabled={isSubmitting} className="w-full py-3 text-base rounded-3xl" >{isSubmitting ? "Signing up..." : "Sign Up"}</Button>
                    {errors.root && <div className="text-red-500">{errors.root.message}</div>}
                </form>
                <div className="text-md text-center">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-500 hover:underline">Log in</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
