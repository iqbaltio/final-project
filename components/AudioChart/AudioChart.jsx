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

    function TimeLabels() {
        const startHour = 9;
        const endHour = 16;
        const intervalMinutes = 10;
        let labels = [];

        let currentTime = new Date();
        currentTime.setHours(startHour, 0, 0, 0);

        while (currentTime.getHours() < endHour || (currentTime.getHours() === endHour && currentTime.getMinutes() === 0)) {
            let timeLabel = currentTime.toTimeString().split(' ')[0].substring(0, 5);
            labels.push(timeLabel);
            currentTime.setMinutes(currentTime.getMinutes() + intervalMinutes);
        }

        return labels;
    }

    const [chartData, setChartData] = useState({
        labels: TimeLabels(),
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
    let saving_rate = 600000;

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

            let value = rms;
            localDbValues.push(value);
        };
    })

    let updateDb = useCallback(function () {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour >= 9 && currentHour <= 16) {
            let volume = Math.round(localDbValues.reduce((a, b) => a + b, 0) / localDbValues.length);
            if (!isFinite(volume)) volume = 0;
            setDecibelValue(volume);
            localDbValues = [];

            setChartData(prevData => {
                const newData = [...prevData.datasets[0].data, volume];
                const newLabels = [...prevData.labels];
                if (newData.length > 42) {
                    newData.shift();
                    newLabels.shift();
                }
                return {
                    ...prevData,
                    datasets: [{ ...prevData.datasets[0], data: newData }],
                    labels: newLabels,
                };
            });
        }
    }, [localDbValues])

    let updateDisplay = useCallback(function () {
        const db = document.getElementById("db");
        let volume = Math.round(localDbValues.reduce((a, b) => a + b, 0) / localDbValues.length);
        if (!isFinite(volume)) volume = 0;
        db.innerText = volume.toString();
    }, [localDbValues]);

    const saveDbToDatabase = useCallback(() => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        if (currentHour >= 9 && currentHour <= 16) {
            const db = document.getElementById("db");
            let volume = parseInt(db.innerText, 10);
            if (volume > 0) {
                const postData = { decibel_value: volume };
                axios.post('http://localhost:5000/api/record_decibel', postData)
                    .then(response => console.log('Decibel value saved:', response.data))
                    .catch(error => console.log('Error saving decibel value:', error));
            }
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(updateDb, saving_rate);
        const saveInterval = setInterval(saveDbToDatabase, saving_rate);
        const displayInterval = setInterval(updateDisplay, refresh_rate);
        return () => {
            clearInterval(interval);
            clearInterval(saveInterval);
            clearInterval(displayInterval);
        };
    }, [updateDb, updateDisplay, saveDbToDatabase, refresh_rate, saving_rate]);

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
