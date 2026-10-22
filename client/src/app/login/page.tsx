// Login page (/login): button that links to the server's /auth/github route.
export default function LoginPage() {
  return <a href={`${process.env.NEXT_PUBLIC_API_URL}/auth/github`}>Sign in with GitHub</a>;
}
