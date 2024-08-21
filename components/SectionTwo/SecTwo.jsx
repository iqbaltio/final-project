import {RadarIcon} from "lucide-react";
import History from "/components/HistoryTab/History.jsx";
import {Card} from "/components/ui/card.jsx";
import PropTypes from "prop-types";

export default function SecTwo({setShowNotification}) {
    return (
        <>
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gray-200 dark:bg-gray-800" id="sound-level">
                <div className="container px-4 md:px-6 lg:px-8 xl:px-10">
                    <div className="flex flex-col items-center justify-center space-y-4 text-center">
                        <div className="space-y-2">
                            <div
                                className="inline-block rounded-xl bg-white px-3 py-1 font-bold drop-shadow-lg text-sm lg:px-4 lg:py-2 xl:text-base">
                                Sound Level
                            </div>
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                                Monitor Your Environment
                            </h2>
                            <p className="max-w-[900px] mx-auto text-center text-gray-500 md:text-xl/relaxed lg:text-lg/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                Our IoT solution provides real-time sound level monitoring to help you understand your
                                environment and make informed decisions.
                            </p>
                        </div>
                    </div>
                    <div className="mx-auto max-w-5xl items-center gap-2 py-4 lg:gap-4 xl:gap-6">
                        <Card className="w-full rounded-xl overflow-auto bg-[#f0f0f0]">
                            <History setShowNotification={setShowNotification}/>
                        </Card>
                        <div className="space-y-2 mt-4 lg:mt-6 xl:mt-8">
                            <div className="grid gap-2">
                                <div className="flex flex-col items-center space-x-2">
                                    <RadarIcon
                                        className="h-8 w-8 text-gray-500 dark:text-gray-400 lg:h-10 lg:w-10 xl:h-12 xl:w-12"/>
                                    <h3 className="text-xl font-bold lg:text-2xl xl:text-3xl">Real-Time Sound
                                        Monitoring</h3>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 lg:text-lg xl:text-xl">
                                    Continuously monitor the sound levels in your environment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

SecTwo.propTypes = {
    setShowNotification: PropTypes.func.isRequired,
};
