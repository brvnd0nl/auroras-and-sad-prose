const Footer = () => {
  return (
    <>
      <footer className="py-6 text-center text-gray-500 text-sm">
        <a href="https://github.com/brvnd0nl" target="__blank">
          <span className="text-gray-900 font-bold text-lg mr-2 dark:text-gray-300">
            brvnd0nl
          </span>
        </a>
        &copy; {new Date().getFullYear()} All Rights Reversed
      </footer>
    </>
  );
};

export default Footer;
