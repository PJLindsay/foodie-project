"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"
import classes from "./nav-link.module.css"

// Note this is a client component
// we moved logic here to keep as much as possible as a server component
export default function NavLink({ href, children }) {

  const path = usePathname();

  return (
    <Link href={href} className={path.startsWith(href) ? `${classes.link} ${classes.active}` : classes.link}>{children}</Link>
  );
}
