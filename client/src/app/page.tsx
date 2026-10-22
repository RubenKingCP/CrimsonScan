// Landing page (/): what CrimsonScan does + "Sign in with GitHub".
import { Navbar } from '../components/Navbar';

export default function Home() {
  return (
    <main>
      <Navbar />
      <section>
        <h1>CrimsonScan</h1>
        <p>Welcome to CrimsonScan!</p>
      </section>
    </main>
  );
}
