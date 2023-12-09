import NavLink from "@/components/NavLink";
import { links } from "@/utils/constance";
import Link from "next/link";
import { LuGitPullRequestDraft } from "react-icons/lu";

export default function NavBar() {
  return (
    <nav className="flex justify-between px-10 py-5 border-b">
      <Link href="/">
        <LuGitPullRequestDraft className="h-8 w-8" />
      </Link>
      <ul className="flex space-x-4 items-center">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink link={link} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
