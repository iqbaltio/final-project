import {Button} from "/components/ui/button.jsx";
import {Input} from "/components/ui/input.jsx"

export default function SecFour() {
    return (
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
    )
}