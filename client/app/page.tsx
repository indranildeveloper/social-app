import { FC } from "react";
import Link from "next/link";
import { FaUser, FaUserPlus, FaGithub } from "react-icons/fa";

const Home: FC = () => {
  return (
    <main className="prose container mx-auto">
      <h1 className="prose-h1 mt-8">Welcome to Next Social App</h1>
      <div className="flex gap-4">
        <Link href="/login" className="btn btn-primary flex gap-2">
          <FaUser /> Log In
        </Link>
        <Link href="/register" className="btn btn-secondary flex gap-2">
          <FaUserPlus /> Register
        </Link>
        <a
          className="btn flex gap-2"
          href="https://github.com/indranildeveloper/social-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub /> Github
        </a>
      </div>
    </main>
  );
};

export default Home;
