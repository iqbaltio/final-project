import {Button} from "/components/ui/button.jsx";
import {MenuIcon} from "lucide-react";
import {useState} from "react";
import {Sheet, SheetTrigger, SheetContent} from "/components/ui/sheet.jsx"

function Navlist() {
    const [activeItem, setActiveItem] = useState('Home');

    const handleClick = (item) => {
        setActiveItem(item);
    }

    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <a
                className={`lg:text-lg xl:text-xl ${activeItem === 'Home' ? 'font-bold' : 'text-gray-700 dark:text-gray-400'}`}
                href="#welcome"
                onClick={() => handleClick('Home')}
            >
                Home
            </a>
            <a
                className={`lg:text-lg xl:text-xl ${activeItem === 'Features' ? 'font-bold' : 'text-gray-700 dark:text-gray-400'}`}
                href="#sound-level"
                onClick={() => handleClick('Features')}
            >
                Features
            </a>
            <a
                className={`lg:text-lg xl:text-xl ${activeItem === 'Testimonials' ? 'font-bold' : 'text-gray-700 dark:text-gray-400'}`}
                href="#testimonials"
                onClick={() => handleClick('Testimonials')}
            >
                Testimonials
            </a>
            <a
                className={`lg:text-lg xl:text-xl ${activeItem === 'Contact' ? 'font-bold' : 'text-gray-700 dark:text-gray-400'}`}
                href="#contact"
                onClick={() => handleClick('Contact')}
            >
                Contact
            </a>
        </ul>
    )
}

export default function Navbar() {
    return (
        <nav
            className="w-full gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 xl:gap-8">
            <div className="flex items-center justify-between w-full">
                <img alt="Logo" src="/antap.svg"/>
                <div className="hidden lg:block">
                    <Navlist/>
                </div>
                <Sheet>
                    <div className="flex items-center justify-between">
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="lg:hidden">
                                <MenuIcon className="h-6 w-6"/>
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                    </div>
                    <SheetContent side="top" className="backdrop-blur-md bg-opacity-50 bg-gray-100">
                        <div className="flex h-full justify-items-center p-6">
                            <div className="space-y-6">
                                <nav className="items-center space-y-2">
                                    <Navlist class="text-gray-100 dark:text-gray-400"/>
                                </nav>
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );

}