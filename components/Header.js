import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Link from "next/link";
const Header = () => {
  const [mounted, setMounted] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();

  const router = useRouter();

  const backButton = router.asPath === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigations = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
  ];

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <svg
          onClick={() => setTheme("light")}
          xmlns="http://www.w3.org/2000/svg"
          className="p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200 h-8 w-8 dark:bg-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          onClick={() => setTheme("dark")}
          xmlns="http://www.w3.org/2000/svg"
          className="p-2 rounded-md hover:ring-2 hover:ring-gray-300 bg-gray-200 h-8 w-8 dark:bg-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    }
  };

  return (
    <>
      <style jsx>{`
        .centerHeader{
          text-align: -webkit-center;
        }
      `}</style>
      <header className="centerHeader">
        <div className="h-16 flex items-center justify-between max-w-2xl px-4">
          <ul className="flex gap-4">
            {!backButton && (
              <a
                className="font-semibold text-gray-400 hover:text-gray-500 cursor-pointer"
                onClick={() => router.back()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                  />
                </svg>
              </a>
            )}
            {navigations.map((item, index) => (
              <Link key={index} href={item.path}>
                <a className="font-semibold text-gray-400 hover:text-gray-500">
                  {item.name}
                </a>
              </Link>
            ))}
          </ul>
          {renderThemeChanger()}
        </div>
      </header>
    </>
  );
};

export default Header;
