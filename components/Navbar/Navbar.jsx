import {Button} from "/components/ui/button.jsx";
import {MenuIcon, X} from "lucide-react";
import React from "react";
import {Collapsible, CollapsibleTrigger, CollapsibleContent} from "/components/ui/collapsible.jsx";

function Navlist() {
    return (
        <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <a className="font-bold lg:text-lg xl:text-xl" href="#">
                Home
            </a>
            <a className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl" href="#">
                Features
            </a>
            <a className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl" href="#">
                Testimonials
            </a>
            <a className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl" href="#">
                Contact
            </a>
        </ul>
    )
}

export default function Navbar() {
    const [openNav, setOpenNav] = React.useState(false);

    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    return (
        <nav
            className="w-full gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 xl:gap-8">
            <div className="flex items-center justify-between w-full">
                <img alt="Logo" src="/antap.svg"/>
                <div className="hidden lg:block">
                    <Navlist/>
                </div>
                <Collapsible open={openNav} onOpenChange={setOpenNav} className="space-y-2 lg:hidden">
                    <div className="flex items-center justify-between">
                        <CollapsibleTrigger asChild>
                            <Button variant="ghost" size="sm" className="w-9 p-0">
                                <MenuIcon className="h-4 w-4"/>
                                <span className="sr-only">Toggle</span>
                            </Button>
                        </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="space-y-2">
                        <Navlist/>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </nav>
    );

}