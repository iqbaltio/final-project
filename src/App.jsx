import './App.css'
import Navbar from "/components/Navbar/Navbar.jsx";
import {Button} from "/components/ui/button.jsx";
import {CardHeader, CardContent, Card} from "/components/ui/card.jsx";
import {Input} from "/components/ui/input.jsx"
import SecOne from "/components/SectionOne/SecOne.jsx";
import SecTwo from "/components/SectionTwo/SecTwo.jsx";

export default function App() {
    return (
        <>
            <div className="flex flex-col min-h-[100dvh]">
                <header className="flex w-full items-center h-16 px-4 shrink-0 md:px-6 lg:px-8 xl:px-10 fixed backdrop-blur-md bg-opacity-50 bg-white z-50">
                    <Navbar/>
                </header>
                <SecOne/>
                <SecTwo/>
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40" id="testimonials">
                    <div
                        className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:px-8 xl:px-10 lg:gap-10 xl:gap-12">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                                What Our Customers Say
                            </h2>
                            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Hear from the people who have transformed their businesses with our IoT solution.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:gap-10">
                            <Card className="h-full w-full rounded-xl hover:bg-gray-100">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            alt="Avatar"
                                            className="rounded-full lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                                            height="40"
                                            src="/antap.svg"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div>
                                            <div className="font-semibold lg:text-lg xl:text-xl">Jane Doe</div>
                                            <div
                                                className="text-sm text-gray-500 dark:text-gray-400 lg:text-base xl:text-lg">
                                                CEO, Acme Inc
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl">
                                        "Our business has been transformed by the IoT solution from this company. The
                                        real-time data and
                                        automation features have streamlined our operations and helped us make better
                                        decisions."
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="h-full w-full rounded-xl hover:bg-gray-100">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            alt="Avatar"
                                            className="rounded-full lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                                            height="40"
                                            src="/antap.svg"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div>
                                            <div className="font-semibold lg:text-lg xl:text-xl">John Smith</div>
                                            <div
                                                className="text-sm text-gray-500 dark:text-gray-400 lg:text-base xl:text-lg">
                                                CTO, Globex Inc
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl">
                                        "I was hesitant to implement an IoT solution, but this company's platform has
                                        exceeded my
                                        expectations. The analytics and insights have been invaluable for our business."
                                    </p>
                                </CardContent>
                            </Card>
                            <Card className="h-full w-full rounded-xl hover:bg-gray-100">
                                <CardHeader>
                                    <div className="flex items-center space-x-2">
                                        <img
                                            alt="Avatar"
                                            className="rounded-full lg:w-12 lg:h-12 xl:w-14 xl:h-14"
                                            height="40"
                                            src="/antap.svg"
                                            style={{
                                                aspectRatio: "40/40",
                                                objectFit: "cover",
                                            }}
                                            width="40"
                                        />
                                        <div>
                                            <div className="font-semibold lg:text-lg xl:text-xl">Sarah Lee</div>
                                            <div
                                                className="text-sm text-gray-500 dark:text-gray-400 lg:text-base xl:text-lg">
                                                COO, Stark Industries
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl">
                                        "The IoT solution from this company has been a game-changer for our
                                        organization. The real-time
                                        monitoring and automated workflows have helped us optimize our operations and
                                        reduce costs."
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-8 lg:py-12 xl:py-16 bg-gray-200 border-t" id="contact">
                    <div
                        className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:px-8 xl:px-10">
                        <div className="space-y-3">
                            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight lg:text-5xl xl:text-6xl">
                                Get in Touch
                            </h2>
                            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Have a question or want to learn more about our IoT solution? Contact us today.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex space-x-2">
                                <Input
                                    className="max-w-lg rounded-xl text-gray-600 text-center flex-1 lg:text-lg xl:text-xl border-gray-400"
                                    placeholder="Enter your email" type="email"/>
                                <Button className="rounded-xl bg-black text-white lg:text-lg xl:text-xl" type="submit">
                                    Contact Us
                                </Button>
                            </form>
                            <p className="text-xs text-gray-500 dark:text-gray-400 lg:text-sm xl:text-base">
                                We'll get back to you as soon as possible.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}