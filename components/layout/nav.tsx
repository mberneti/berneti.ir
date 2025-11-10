import { Link } from "react-router";

export function Navbar() {
  const Splitter = () => <b className="px-3">،</b>;
  return (
    <nav className="flex items-center justify-start flex-wrap mt-10">
      <div className="max-sm:w-full sm:w-auto mb-3 sm:mb-0">
        <Link to="/" className="ml-6">
          <div>
            <img
              className="max-w-[40px]"
              src="/img/berneti2.jpg"
              alt="mohammadreza berneti"
            />
          </div>
        </Link>
      </div>
      <Link
        to="/about"
        className="font-light text-center block lg:inline-block hover:text-primary-700"
      >
        برنتی
      </Link>
      <Splitter />
      <a
        href="https://mobile.twitter.com/mberneti"
        className="font-light text-right block lg:inline-block hover:text-primary-700"
      >
        توییتر
      </a>
      <Splitter />
      <Link
        to="/categories"
        className="font-light text-center block lg:inline-block hover:text-primary-700"
      >
        دسته‌بندی‌ها
      </Link>
      <Splitter />
      <Link
        to="/contact"
        className="font-light text-left block lg:inline-block hover:text-primary-700"
      >
        ارتباط با من
      </Link>
    </nav>
  );
}
