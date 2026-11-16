"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { Icon } from "@/components/Icon";
import Logo from "@/components/Logo";
import { useUserStore } from "@/store/userStore";

const PREVIEW_NOTE =
  "Preview build: accounts are saved on this device only, so any email and password will work.";

export function AuthFrame({ children, heading, text }: { children: ReactNode; heading: string; text: string }) {
  return (
    <div className="auth">
      <aside className="auth-art">
        <Logo large />
        <div>
          <h2>{heading}</h2>
          <p>{text}</p>
        </div>
      </aside>
      <main className="auth-form">{children}</main>
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const signInDemo = useUserStore((s) => s.signInDemo);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const enter = (address: string) => {
    signInDemo(address);
    router.push("/dashboard");
  };

  return (
    <>
      <h1>Welcome back</h1>
      <p className="lead">Log in to pick up where you left off.</p>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!email.includes("@")) {
            setError("Enter a valid email address.");
            return;
          }
          if (password.length < 6) {
            setError("Your password needs at least 6 characters.");
            return;
          }
          enter(email);
        }}
      >
        <div className="field">
          <label htmlFor="email">College email</label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@college.edu"
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Log in
        </button>
      </form>

      <div className="or">or</div>

      <button type="button" className="btn btn-secondary btn-lg btn-block" onClick={() => enter("demo@wyst.in")}>
        <Icon name="sparkle" size={18} />
        Use the demo account
      </button>

      <p className="hint" style={{ marginTop: 18 }}>
        {PREVIEW_NOTE}
      </p>
      <p className="muted" style={{ marginTop: 22, fontSize: 14 }}>
        New to WYST?{" "}
        <Link href="/signup" className="link">
          Create an account
        </Link>
      </p>
    </>
  );
}

export function SignupForm() {
  const router = useRouter();
  const signUp = useUserStore((s) => s.signUp);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <>
      <span className="pill pill-green" style={{ alignSelf: "flex-start", marginBottom: 18 }}>
        <Icon name="points" size={14} /> 100 welcome points
      </span>
      <h1>Create your account</h1>
      <p className="lead">Swap clothes with students on your campus. No cash, ever.</p>

      <form
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (username.trim().length < 3) {
            setError("Pick a username with at least 3 characters.");
            return;
          }
          if (!email.includes("@")) {
            setError("Enter a valid email address.");
            return;
          }
          if (password.length < 6) {
            setError("Your password needs at least 6 characters.");
            return;
          }
          signUp({ username, email, college });
          router.push("/dashboard");
        }}
      >
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            className="input"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value.replace(/\s/g, ""))}
            placeholder="your_username"
            maxLength={24}
          />
        </div>
        <div className="field">
          <label htmlFor="email">College email</label>
          <input
            id="email"
            className="input"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@college.edu"
          />
        </div>
        <div className="field">
          <label htmlFor="college">College or campus</label>
          <input
            id="college"
            className="input"
            value={college}
            onChange={(event) => setCollege(event.target.value)}
            placeholder="e.g. IIT Delhi"
            maxLength={60}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            className="input"
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 6 characters"
          />
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Create account
        </button>
      </form>

      <p className="hint" style={{ marginTop: 18 }}>
        {PREVIEW_NOTE}
      </p>
      <p className="muted" style={{ marginTop: 22, fontSize: 14 }}>
        Already have an account?{" "}
        <Link href="/login" className="link">
          Log in
        </Link>
      </p>
    </>
  );
}
