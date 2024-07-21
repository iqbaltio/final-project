import './App.css'
import Navbar from "/components/Navbar/Navbar.jsx";
import SecOne from "/components/SectionOne/SecOne.jsx";
import SecTwo from "/components/SectionTwo/SecTwo.jsx";
import SecThree from "/components/SectionThree/SecThree.jsx";
import SecFour from "/components/SectionFour/SecFour.jsx";

export default function App() {
    return (
        <>
            <div className="flex flex-col min-h-[100dvh]">
                <header className="flex w-full items-center h-16 px-4 shrink-0 md:px-6 lg:px-8 xl:px-10 fixed backdrop-blur-md bg-opacity-50 bg-white z-50">
                    <Navbar/>
                </header>
                <SecOne/>
                <SecTwo/>
                <SecThree/>
                <SecFour/>
            </div>
        </>
    )
}