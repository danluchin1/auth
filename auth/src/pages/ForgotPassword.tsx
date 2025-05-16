import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { useAuth } from "../contexts/AuthContext";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

const loginSchema = z.object({
    email: z.string().email("Incorrect email"),
});

type LoginFields = z.infer<typeof loginSchema>;

const ForgotPassword = () => {
    const { resetPassword } = useAuth();
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
            if(resetPassword){
                await resetPassword(data.email);
            }
        }catch(error){
            setError("root", {
                message: "Failed to reset password"
            });
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="max-w-md w-full flex flex-col gap-4 bg-white p-6 rounded-lg shadow-md">
                <h1 className="font-bold text-center text-2xl">Password Reset</h1>
                <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-0">
                        <Label htmlFor="email">Email</Label>
                        <Input {...register("email")} type="email" id="email"/>
                        {errors.email && (
                        <div className="text-sm text-red-500">{errors.email.message}</div>
                        )}
                    </div>

                    <Button disabled={isSubmitting} className="w-full rounded-xl py-3 text-base" >{isSubmitting ? "Resetting..." : "Reset Password"}</Button>
                    {errors.root && (
                        <div className="text-red-500">{errors.root.message}</div>
                    )}
                </form>
                <div className="text-center text-blue-500 hover:underline">
                    <Link to="/login">Log In</Link>
                </div>
            </div>
        </div>
    );
}

export default ForgotPassword;