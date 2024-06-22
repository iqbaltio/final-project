import {VolumeIcon} from "lucide-react";
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {useState} from "react";

ChartJS.register(...registerables);

const labels = ['09.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00'];

const data = {
    labels,
    type: 'line',
    datasets: [
        {
            label: 'Decibel Values',
            data: [0, 10, 20, 30, 40,50, 60, 70, 80, 90, 100],
            tension: 0.1
        },
    ],
};

const options = {
    responsive: true,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    plugins: {
        legend: {
            position: 'top',
            display: false,
        },
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'hour',
                    displayFormats: {
                        hour: 'HH:mm'
                    },
                    min: '09:00',
                    max: '16:00'
                },
                ticks: {
                    source: 'auto',
                    autoSkip: true
                }
            },
            y: {
                min: 0,
                max: 100
            }
        }
    }
};

export default function AudioChart() {
    let localDbValues = [];
    const [decibelValue, setDecibelValue] = useState([]);
    let refresh_rate = 800;

    navigator.mediaDevices.getUserMedia({audio: true, video: false}).then((stream) => {

        const context = new AudioContext();
        const source = context.createMediaStreamSource(stream);
        const processor = context.createScriptProcessor(2048, 1, 1);
        const analyser = context.createAnalyser();

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 256;

        source.connect(analyser);
        analyser.connect(processor);
        processor.connect(context.destination);

        processor.onaudioprocess = () => {

            let data = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(data);
            let rms = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i] > 120) data[i] = 120
                rms += data[i] * data[i]
            }
            rms = Math.sqrt(rms / data.length);
            console.log("RMS: " + rms)

            let value = rms;
            localDbValues.push(value);
        };
    })

// update the volume every refresh_rate m.seconds
    let updateDb = function () {
        window.clearInterval(interval);

        const db = document.getElementById("db");
        let volume = Math.round(localDbValues.reduce((a, b) => a + b, 0) / localDbValues.length);
        if (!isFinite(volume)) volume = 0;  // we don't want/need negative decibels in that case
        db.innerText = volume.toString();
        setDecibelValue(volume);
        localDbValues = [];

        interval = window.setInterval(updateDb, refresh_rate);
    }
    let interval = window.setInterval(updateDb, refresh_rate)

    return (
        <div className="mx-auto max-w-5xl items-center gap-2 py-4 lg:gap-4 xl:gap-6">
            <div
                className="relative drop-shadow-lg mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last xl:rounded-2xl">
                <Line options={options} data={data}/>
                <div
                    className={`absolute top-4 right-8 px-3 py-1 rounded-xl text-sm flex items-center gap-2 ${decibelValue > 55 ? "bg-red-500" : "bg-gray-900"} text-gray-50`}>
                    <VolumeIcon className="h-4 w-4"/>
                    <span>Sound Level : <span id='db'> </span> dB</span>
                </div>
                <div
                    className={`absolute top-14 right-8 px-3 py-1 rounded-xl text-sm flex items-center gap-2 ${decibelValue > 55 ? "bg-red-500" : "bg-gray-900"} text-gray-50`}>
                    <VolumeIcon className="h-4 w-4"/>
                    <span>Chatter 80%</span>
                </div>
            </div>
        </div>
    )
}
