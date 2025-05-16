import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router";
import Image from "../components/ui/Image";

const UpdateProfile = () => {
    const { user, updateUserProfile, updateUserPhoto } = useAuth();
    const [name, setName] = useState<string>("");
    const [photo, setPhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const fileInputref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            setLoading(true);
            setError("");

            if (user) {
                if (name) {
                    await updateUserProfile(name);
                }

                if (photo) {
                    await updateUserPhoto(photo);
                }
                navigate(`/dashboard/${user?.uid}`);
            }
        } catch (error) {
            console.error("Failed to update profile: ", error);
            setError("Couldn't update the profime name")
        } finally {
            setLoading(false);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setPhoto(file);

            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file)
        }
    };

    const triggerFileInput = () => {
        fileInputref.current?.click();
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-16 max-w-md w-full bg-gray-100 flex flex-col shadow-md rounded-lg">
                <h2 className="mb-4 font-semibold text-lg">Update profile</h2>

                <div className="flex flex-col items-center mb-6">
                    <div className="relative mb-4">
                        <Image
                            src={photoPreview || user?.photoURL || undefined}
                            alt="Profile"
                            width={120}
                            height={120}
                            rounded="full"
                            className="border-2 border-gray-300"
                        />
                        <button
                            onClick={triggerFileInput}
                            className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <input
                            type="file"
                            ref={fileInputref}
                            onChange={handleFileChange}
                            accept="image/*"
                            className="hidden"
                        />
                    </div>
                    <p className="text-sm text-gray-600">Click on the icon to change photo</p>
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Display Name
                    </label>
                    <Input
                        value={name}
                        placeholder={user?.displayName || "Enter new name"}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                
                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
                
                <Button 
                    className="mt-3 rounded-xl" 
                    onClick={handleUpdate}
                    loading={loading}
                >
                    Update Profile
                </Button>
            </div>
        </div>
    );
}

export default UpdateProfile;