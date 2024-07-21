import {VolumeIcon} from "lucide-react";
import {Chart as ChartJS, registerables} from 'chart.js/auto';
import {Line} from 'react-chartjs-2';
import {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";

ChartJS.register(...registerables);

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
};

export default function AudioChart() {
    const [decibelValue, setDecibelValue] = useState(0);
    const chartRef = useRef(null);
    const [chartData] = useState({
        labels: ['09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00', '16.00'],
        datasets: [
            {
                label: 'Decibel Values',
                data: [],
                tension: 0.1,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    });
    let localDbValues = [];
    let refresh_rate = 10000;

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
            // console.log("RMS: " + rms)

            let value = rms;
            localDbValues.push(value);
        };
    })

    let updateDb = useCallback(function () {
        window.clearInterval(interval);

        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour >= 9 && currentHour <= 16) {
            const db = document.getElementById("db");
            let volume = Math.round(localDbValues.reduce((a, b) => a + b, 0) / localDbValues.length);
            if (!isFinite(volume)) volume = 0;
            db.innerText = volume.toString();
            setDecibelValue(volume);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            localDbValues = [];

            if (volume > 0) {
                const postData = {
                    decibel_value: volume,
                };
                axios.post('http://localhost:5000/api/record_decibel', postData)
                    .then(response => {
                        console.log('Decibel value saved:', response.data);
                    })
                    .catch(error => {
                        console.log('Error saving decibel value:', error);
                    });
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
        interval = window.setInterval(updateDb, refresh_rate);

    }, [chartData, refresh_rate])

    useEffect(() => {
        const interval = setInterval(updateDb, refresh_rate);
        return () => clearInterval(interval);
    }, [updateDb, refresh_rate]);

    useEffect(() => {
        if (chartRef.current) {
            const chart = chartRef.current;
            const newData = [...chart.data.datasets[0].data, decibelValue];
            const newLabels = [...chart.data.labels,];
            if (newData.length > 20) {
                newData.shift();
                newLabels.shift();
            }
            chart.data.datasets[0].data = newData;
            chart.data.labels = newLabels;
            chart.update();
        }
    }, [decibelValue]);

    let interval = window.setInterval(updateDb, refresh_rate)

    return (
        <div className="mx-auto max-w-5xl items-center gap-2 py-4 lg:gap-4 xl:gap-6">
            <div
                className="relative drop-shadow-lg mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last xl:rounded-2xl">
                <Line ref={chartRef} options={options} data={chartData}/>
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
