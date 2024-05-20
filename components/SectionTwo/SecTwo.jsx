import {RadarIcon, VolumeIcon} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Line} from 'react-chartjs-2';
import {faker} from "@faker-js/faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Decibel Values',
            data: labels.map(() => faker.datatype.number({min: -1000, max: 1000})),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function SecTwo() {
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
                        <div
                            className="relative drop-shadow-lg mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last xl:rounded-2xl">
                            <Line options={options} data={data}/>
                            <div
                                className="absolute top-4 right-4 bg-gray-900 text-gray-50 px-3 py-1 rounded-xl text-sm flex items-center gap-2">
                                <VolumeIcon className="h-4 w-4"/>
                                <span>Sound Level 1: 60 dB</span>
                            </div>
                            <div
                                className="absolute top-14 right-4 bg-gray-900 text-gray-50 px-3 py-1 rounded-xl text-sm flex items-center gap-2">
                                <VolumeIcon className="h-4 w-4"/>
                                <span>Chatter 80%</span>
                            </div>
                        </div>
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
