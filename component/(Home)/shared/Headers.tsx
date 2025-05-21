"use client"

import Link from "next/link"

import { usePathname } from "next/navigation"

import { useThemeStore } from "@/store/useThemeStore"

import HeaderStyles from "@/styles/(home)/shared/header.module.css"

const Headers = () => {

    const pathname = usePathname();

    const { theme } = useThemeStore();

    return (
        <header id={HeaderStyles.header} className={HeaderStyles[theme]}>
            <div className={HeaderStyles.inner}>
                <h1 className={HeaderStyles.logo}>
                    <Link href="/">
                        {`전시 + 緣 (전시와 사람 사이의 '인연')`}
                        <p className={HeaderStyles.copyRight}>
                            ⓒ copyright 2025 clapPortfolio All rights reserved.
                        </p>
                    </Link>
                </h1>
                <nav className={HeaderStyles.nav}>
                    <ul className={HeaderStyles.navList}>
                        <li>
                            <Link href="/" className={`${pathname === "/" && HeaderStyles.active}`}>공연 과 전시</Link>
                        </li>
                        <li>
                            <Link className={`${pathname === "/meeting/list" && HeaderStyles.active}`} href="/meeting/list">모임 이 있는 전시</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Headers