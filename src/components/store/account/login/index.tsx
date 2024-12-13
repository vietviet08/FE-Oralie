// import { logCustomerIn } from "@modules/account/actions"
import {LOGIN_VIEW} from "../template/login-template";
import ErrorMessage from "@/components/common/error-message";
import Input from "@/components/common/input";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";

type Props = {
    setCurrentView: (view: LOGIN_VIEW) => void;
};

const Login = ({setCurrentView}: Props) => {
    //   const [message, formAction] = useFormState(logCustomerIn, null)
    const router = useRouter();

    const handleSignIn = async (provider: string) => {
        const result = await signIn(provider, {redirect: false});
        if (result?.ok) {
            router.push("/");
        }
    };

    return (
        <div
            className="max-w-sm w-full flex flex-col items-center"
            data-testid="login-page"
        >
            <h1 className="text-2xl uppercase mb-6">Welcome back</h1>
            <p className="text-center text-base-regular text-ui-fg-base mb-8">
                Sign in to access an enhanced shopping experience.
            </p>
            <form
                className="w-full"
                //    action={formAction}
            >
                <div className="flex flex-col w-full gap-y-2">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        title="Enter a valid email address."
                        autoComplete="email"
                        required
                        data-testid="email-input"
                    />
                    <Input
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        data-testid="password-input"
                    />
                </div>

                <ErrorMessage
                    error={"Invalid email or password."}
                    data-testid="login-error-message"
                />
                <Button
                    onClick={() => handleSignIn("google")}
                    data-testid="sign-in-button"
                    className="w-full mt-6"
                >
                    Sign in
                </Button>
            </form>
            <Button
                className="w-full mt-6"
                variant={"outline"}
                onClick={() => handleSignIn("google")}
            >
                <img
                    src="/images/google.svg"
                    alt="Google Icon"
                    className="w-6 inline-block mr-2"
                />
                Login with Google
            </Button>

            <Button
                className="w-full mt-2"
                variant={"outline"}
                onClick={() => handleSignIn("facebook")}
            >
                <img
                    src="/images/facebook.svg"
                    alt="Facebook Icon"
                    className="w-6 inline-block mr-2"
                />
                Login with Facebook
            </Button>
            <span className="text-center text-ui-fg-base text-small-regular mt-6">
        Not a member?{" "}
                <button
                    onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
                    className="underline"
                    data-testid="register-button"
                >
          Join us
        </button>
        .
      </span>
        </div>
    );
};

export default Login;
