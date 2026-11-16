import { AuthFrame, SignupForm } from "@/components/AuthForm";

export const metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <AuthFrame heading="Swap. Earn. Repeat." text="List what you don't wear, earn points, and spend them on something you will.">
      <SignupForm />
    </AuthFrame>
  );
}
