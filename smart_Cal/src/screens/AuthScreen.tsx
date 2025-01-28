import { SignUp } from "@clerk/clerk-react";


function AuthScreen() {
    return (
        <div className="flex items-center justify-center h-screen">
            <SignUp />
        </div>
    );
}

export default AuthScreen;
