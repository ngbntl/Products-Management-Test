import { ROUTERS } from "@/constant";

import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-4 md:space-x-8">
            <Link
              to={ROUTERS.HOME}
              className="flex items-center space-x-2 text-2xl font-bold text-primary-500 hover:font-inter hover:text-2xl hover:font-bold"
            >
              <img
                src="/app/images/logo/logo.png"
                alt="Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <span>Teko</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
