import {Button} from "/components/ui/button.jsx";

export default function SecOne() {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40" id="hero">
                <div className="px-4 md:px-6 lg:px-8 xl:px-10">
                    <div
                        className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] xl:gap-16">
                        <div className="flex flex-col justify-center space-y-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter text-start sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                    Revolutionize Your Library Experience with Our IoT Solution
                                </h1>
                                <p className="max-w-[800px] text-start text-gray-500 md:text-xl lg:text-lg xl:text-xl dark:text-gray-400">
                                    Unlock the power of the Internet of Things and transform the way you study,
                                    socialize, discussion with your colleague in STIKI Library.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                <Button
                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900/50 disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-300 lg:h-12 lg:px-10 xl:h-14 xl:px-12" >
                                    <a href={"#"}>
                                        Get Started
                                    </a>
                                </Button>
                            </div>
                        </div>
                        <img
                            alt="Hero"
                            className="mx-auto drop-shadow-xl aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square xl:rounded-2xl"
                            height="550"
                            src="/library.svg"
                            width="550"
                        />
                    </div>
                </div>
            </section>
        </>
    )
}
