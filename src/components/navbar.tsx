import Link from "next/link";
import Image from "next/image";

import { UserButton } from "@clerk/nextjs";

import { SearchInput } from "./search-input";

export const Navbar = () => {
    return (
        <nav
            className="flex items-center justify-between h-full w-full"
        >
            <div
                className="flex gap-1 items-center shrink-0 pr-2"
            >
                <Link href="/">
                   <Image
                    src="/logo.svg"
                    alt="logo"
                    width={70}
                    height={70}
                />  
                </Link>
                <h3 className="text-xl">
                    DevDocs
                </h3>
            </div>
            <SearchInput />
            <UserButton />
            <div />
        </nav>
    )
}