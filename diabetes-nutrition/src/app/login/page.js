import LoginForm from "../../components/auth/LoginForm";

export const metadata = {
  title: "Login | Diabetes Carb Calculator",
  description: "Log in to your Diabetes Carb Calculator account",
};

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
      <LoginForm />
    </div>
  );
}
