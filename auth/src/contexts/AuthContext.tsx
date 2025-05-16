import { auth, storage } from "../firebase";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { 
    User,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail,
    updateProfile,
    setPersistence,
    browserSessionPersistence
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signup: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
    updateUserProfile: (name: string) => Promise<void>;
    updateUserPhoto: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const signup = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Signup error:", error);
            throw error;
        }
    };

    const login = async (email: string, password: string) => {
        try {
            await setPersistence(auth, browserSessionPersistence);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await userCredential.user.getIdToken(true);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    };

    const resetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            console.error("Password reset error:", error);
            throw error;
        }
    };

    const updateUserProfile = async (name: string) => {
        if (!auth.currentUser) throw new Error("No authenticated user");
        
        try {
            await updateProfile(auth.currentUser, { displayName: name });
            setUser({ ...auth.currentUser, displayName: name } as User);
        } catch (error) {
            console.error("Profile update error:", error);
            throw error;
        }
    };

    const updateUserPhoto = async (file: File): Promise<string> => {
        if (!auth.currentUser) throw new Error("No authenticated user");

        try{
            const storageRef = ref(storage, `profilePictures/${auth.currentUser?.uid}`);
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            await updateProfile(auth.currentUser, { photoURL: downloadURL });
            setUser({ ...auth.currentUser, photoURL: downloadURL } as User);

            return downloadURL;
        }catch(error){
            console.error("Photo upload error:", error);
            throw error;
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                loading,
                signup, 
                login, 
                logout, 
                resetPassword, 
                updateUserProfile,
                updateUserPhoto
            }}
        >
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside an AuthProvider");
    return context;
};