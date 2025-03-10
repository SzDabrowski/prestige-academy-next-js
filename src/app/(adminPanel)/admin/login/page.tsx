import { LoginForm } from "@/components/login-form";

export default function Page() {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen overflow-hidden">
      <div className="w-full m-auto lg:max-w-lg">
        <LoginForm />
      </div>
    </div>
  );
}
