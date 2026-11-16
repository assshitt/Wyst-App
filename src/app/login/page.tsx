import { AuthFrame, LoginForm } from "@/components/AuthForm";

export const metadata = {
  title: "Log in",
};

export default function LoginPage() {
  return (
    <AuthFrame heading="Your wardrobe, back in circulation." text="Pick up your swaps, check your points and see what is new on the rack.">
      <LoginForm />
    </AuthFrame>
  );
}
