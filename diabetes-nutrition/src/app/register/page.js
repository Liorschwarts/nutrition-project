import RegisterForm from "../../components/auth/RegisterForm";

export const metadata = {
  title: "Register | Diabetes Carb Calculator",
  description: "Create an account for the Diabetes Carb Calculator",
};

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Create Account</h1>
      <RegisterForm />
    </div>
  );
}
