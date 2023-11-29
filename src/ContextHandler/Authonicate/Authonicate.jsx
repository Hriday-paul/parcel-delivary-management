import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from '../../firebase.config'
import UseAxiosSecure from "../../Hooks/UseAxiosSecure/UseAxiosSecure";
import axios from "axios";

export const authContxt = createContext(null);

const Authonicate = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [userInfo, setUserInfo] = useState("");

    const creatUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const provider = new GoogleAuthProvider();
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider);
    }

    const logOutUser = () => {
        setLoading(true)
        return signOut(auth);
      }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                const user = { email: currentUser.email }
                axios.put("http://localhost:4000/crtJwt", user, { withCredentials: true })
            }
            else {
                const user = { email: userInfo.email };
                axios.put("http://localhost:4000/dltJwt", user, { withCredentials: true })
            }
            setUserInfo(currentUser)
            setLoading(false)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    const authInfo = {
        loading,
        userInfo,
        creatUser,
        loginUser,
        googleLogin,
        logOutUser
    }
    return (
        <authContxt.Provider value={authInfo}>
            {children}
        </authContxt.Provider>
    );
};

export default Authonicate;