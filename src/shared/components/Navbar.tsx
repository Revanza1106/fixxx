import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    }

    return (
        <nav className="w-full fixed top-0 left-0 bg-white shadow-sm z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Link to="/" onClick={closeMenu}>
                        <img src={logo} alt="PCP Transport" className="h-7 sm:h-8" />
                    </Link>
                </div>

                <ul className="hidden md:flex items-center gap-6 lg:gap-8 text-[#000053] font-medium">
                    <li className="hover:text-[#00C300] cursor-pointer"><Link to="/">Home</Link></li>
                    <li className="hover:text-[#00C300] cursor-pointer"><Link to="/service">Service</Link></li>
                    <li className="hover:text-[#00C300] cursor-pointer"><Link to="/branches">Branch Offices</Link></li>
                    <li className="hover:text-[#00C300] cursor-pointer"><Link to="/about">About</Link></li>
                    <li className="hover:text-[#00C300] cursor-pointer"><Link to="/contact">Contact</Link></li>
                </ul>

                <Link to="/contact" className="hidden md:block bg-[#000053] text-white px-5 py-2 rounded-lg hover:bg-[#00C300] transition-all">
                    Contact Sales
                </Link>

                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-[#000053] text-2xl">
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg border-t border-gray-200">
                    <ul className="flex flex-col items-center gap-2 py-4 text-[#000053] font-medium">
                        <li className="hover:text-[#00C300] cursor-pointer w-full text-center py-2" onClick={closeMenu}><Link to="/">Home</Link></li>
                        <li className="hover:text-[#00C300] cursor-pointer w-full text-center py-2" onClick={closeMenu}><Link to="/service">Service</Link></li>
                        <li className="hover:text-[#00C300] cursor-pointer w-full text-center py-2" onClick={closeMenu}><Link to="/branches">Branch Offices</Link></li>
                        <li className="hover:text-[#00C300] cursor-pointer w-full text-center py-2" onClick={closeMenu}><Link to="/about">About</Link></li>
                        <li className="hover:text-[#00C300] cursor-pointer w-full text-center py-2" onClick={closeMenu}><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    )
}

export default Navbar