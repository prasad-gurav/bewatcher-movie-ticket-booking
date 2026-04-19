"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	motion,
	AnimatePresence,
	useReducedMotion,
	useScroll,
	useMotionValueEvent,
} from "motion/react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/utils/tailwind-config";

const LINKS = [
	{ label: "Discover", href: "/" },
	{ label: "Book Tickets", href: "/movies" },
] as const;

function pathActive(href: string, pathname: string | null) {
	if (!pathname) return false;
	if (href === "/") return pathname === "/";
	return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
	const pathname = usePathname();
	const reduceMotion = useReducedMotion();
	const { scrollY } = useScroll();
	const [scrolled, setScrolled] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);

	useMotionValueEvent(scrollY, "change", (y) => {
		const next = y > 28;
		setScrolled((prev) => (prev === next ? prev : next));
	});

	useEffect(() => {
		setMobileOpen(false);
	}, [pathname]);

	useEffect(() => {
		if (!mobileOpen) return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setMobileOpen(false);
		};
		window.addEventListener("keydown", onKey);
		return () => {
			document.body.style.overflow = prev;
			window.removeEventListener("keydown", onKey);
		};
	}, [mobileOpen]);

	const spring = useMemo(
		() =>
			reduceMotion
				? { duration: 0.2 }
				: { type: "spring" as const, stiffness: 420, damping: 38 },
		[reduceMotion]
	);

	const layoutSpring = useMemo(
		() =>
			reduceMotion
				? { duration: 0 }
				: { type: "spring" as const, stiffness: 380, damping: 34 },
		[reduceMotion]
	);

	const closeMobile = useCallback(() => setMobileOpen(false), []);
	const toggleMobile = useCallback(() => setMobileOpen((o) => !o), []);

	return (
		<motion.header
			role="banner"
			initial={false}
			animate={{
				backgroundColor: scrolled
					? "rgba(9, 9, 15, 0.82)"
					: "rgba(9, 9, 15, 0.48)",
			}}
			transition={spring}
			style={{
				backdropFilter: "blur(18px) saturate(1.12)",
				WebkitBackdropFilter: "blur(18px) saturate(1.12)",
			}}
			className={cn(
				"fixed inset-x-0 top-0 z-50 border-b border-white/[0.07]",
				"shadow-[0_12px_40px_rgba(0,0,0,0.45)]",
			)}
		>
			<motion.div
				className="mx-auto flex max-w-[1380px] items-center justify-between gap-3 px-5 md:px-10 lg:px-14"
				initial={false}
				animate={{ height: scrolled ? 60 : 68 }}
				transition={spring}
			>
				<Link
					href="/"
					className="group relative z-10 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#09090f]"
					aria-label="Bewatcher home"
				>
					<motion.span
						className="inline-flex items-baseline gap-0"
						whileHover={reduceMotion ? {} : { scale: 1.02 }}
						transition={{ type: "spring", stiffness: 520, damping: 28 }}
					>
						<span className="font-bricolage text-xl font-semibold tracking-[-0.04em] text-white md:text-[2.35rem]">
							Bewatcher
						</span>
					</motion.span>
				</Link>

				<nav aria-label="Main" className="hidden md:block">
					<ul className="flex items-center gap-0.5">
						{LINKS.map((item) => {
							const active = pathActive(item.href, pathname);
							return (
								<li key={item.href} className="relative">
									<Link
										href={item.href}
										className={cn(
											"relative z-10 block px-4 py-2 text-sm font-medium tracking-wide transition-colors",
											active
												? "text-white"
												: "text-white/55 hover:text-white/90",
										)}
									>
										{active && (
											<motion.span
												layoutId="navbar-active-pill"
												className="absolute inset-0 -z-10 rounded-full bg-white/[0.09] ring-1 ring-white/[0.1]"
												transition={layoutSpring}
											/>
										)}
										<span className="relative font-manrope">{item.label}</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>

				<button
					type="button"
					className="md:hidden relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white/90 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/45"
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav-panel"
					aria-label={mobileOpen ? "Close menu" : "Open menu"}
					onClick={toggleMobile}
				>
					{mobileOpen ? (
						<X className="h-5 w-5" aria-hidden />
					) : (
						<Menu className="h-5 w-5" aria-hidden />
					)}
				</button>
			</motion.div>

			<AnimatePresence>
				{mobileOpen && (
					<>
						<motion.div
							role="presentation"
							className="fixed inset-0 z-40 bg-black/65 md:hidden"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.2 }}
							onClick={closeMobile}
						/>
						<motion.nav
							id="mobile-nav-panel"
							role="dialog"
							aria-modal="true"
							aria-label="Mobile navigation"
							style={{ top: scrolled ? 60 : 68 }}
							className="fixed left-0 right-0 bottom-0 z-[45] overflow-y-auto border-t border-white/[0.08] bg-[#09090f]/98 px-5 py-6 backdrop-blur-xl md:hidden"
							initial={reduceMotion ? false : { opacity: 0, y: -12 }}
							animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
							exit={reduceMotion ? {} : { opacity: 0, y: -12 }}
							transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
						>
							<ul className="flex flex-col gap-1">
								{LINKS.map((item) => {
									const active = pathActive(item.href, pathname);
									return (
										<li key={item.href}>
											<Link
												href={item.href}
												onClick={closeMobile}
												className={cn(
													"block rounded-xl px-4 py-3 text-base font-medium font-manrope transition-colors",
													active
														? "bg-white/[0.08] text-white"
														: "text-white/70 hover:bg-white/[0.05] hover:text-white",
												)}
											>
												{item.label}
											</Link>
										</li>
									);
								})}
							</ul>
						</motion.nav>
					</>
				)}
			</AnimatePresence>
		</motion.header>
	);
}
