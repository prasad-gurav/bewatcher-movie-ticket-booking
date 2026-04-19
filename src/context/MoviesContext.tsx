"use client";
import React, {
	useEffect,
	useState,
	createContext,
	useMemo,
} from "react";

export interface MovieContextType {
	movies_data: any[] | null;
	movies_loading: boolean;
	movies_error: string | null;
}

const defaultMovieContx: MovieContextType = {
	movies_data: null,
	movies_loading: false,
	movies_error: null,
};

export const MovieContx = createContext<MovieContextType>(defaultMovieContx);

type Props = {
	children: React.ReactNode;
};

export default function MoviesContext({ children }: Props) {
	const [movies_data, setMovies_data] = useState<any[] | null>(null);
	const [movies_loading, setMovies_loading] = useState(true);
	const [movies_error, setMovies_error] = useState<string | null>(null);

	useEffect(() => {
		let cancelled = false;

		const getMoviesData = async () => {
			setMovies_loading(true);
			setMovies_error(null);
			try {
				const response = await fetch("/api/movies", {
					method: "GET",
					cache: "no-store",
				});

				if (!response.ok) {
					throw new Error("Failed to fetch movies");
				}
				const jsonData = await response.json();
				if (cancelled) return;
				setMovies_data(jsonData?.results || []);
			} catch {
				if (!cancelled) {
					setMovies_error("We couldn’t load films. Try again shortly.");
					setMovies_data([]);
				}
			} finally {
				if (!cancelled) setMovies_loading(false);
			}
		};

		getMoviesData();
		return () => {
			cancelled = true;
		};
	}, []);

	const contextValue = useMemo(
		() => ({
			movies_data,
			movies_loading,
			movies_error,
		}),
		[movies_data, movies_loading, movies_error]
	);

	return (
		<MovieContx.Provider value={contextValue}>{children}</MovieContx.Provider>
	);
}
