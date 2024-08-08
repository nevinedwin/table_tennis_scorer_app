import React, { useEffect, useState } from "react";
import ManageLocalStorage from "../utilities/ManageLocalStorage";

type ThemeMode = 'dark' | 'light';

const useThemeSwitcher = (): [ThemeMode, React.Dispatch<React.SetStateAction<ThemeMode>>] => {

    const preferedDateMediaQuery = "(prefer-color-scheme: dark)";
    const [mode, setMode] = useState<ThemeMode>("dark");

    useEffect(() => {

        const mediaQuery = window.matchMedia(preferedDateMediaQuery);
        const userPref = ManageLocalStorage.get("theme") as ThemeMode | null;

        const handleChange = () => {

            const theme = userPref ? userPref : (mediaQuery.matches ? "dark" : "light");
            setMode(theme);

            if (theme === "dark") {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            };

        }

        handleChange();
        mediaQuery.addEventListener("change", handleChange);

        return () => mediaQuery.removeEventListener("change", handleChange);

    }, [])

    useEffect(() => {
        if (mode === "dark") {
            ManageLocalStorage.set("theme", "dark");
            document.documentElement.classList.add("dark");
        } else {
            ManageLocalStorage.set("theme", "light")
            document.documentElement.classList.remove("dark");
        }
    }, [mode])

    return [mode, setMode];
};


export default useThemeSwitcher;