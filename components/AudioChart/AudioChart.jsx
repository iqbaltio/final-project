import { VolumeIcon } from "lucide-react";
import { Chart as ChartJS, registerables } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

ChartJS.register(...registerables);

const options = {
    responsive: true,
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
    plugins: {
        legend: { position: 'top', display: false },
    },
};

export default function AudioChart({ setShowNotification }) {
    const [decibelValue, setDecibelValue] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{ label: 'Decibel Values', data: [], tension: 0.1, borderColor: 'rgb(53, 162, 235)', backgroundColor: 'rgba(53, 162, 235, 0.5)' }],
    });
    const chartRef = useRef(null);
    const localDbValues = useRef([]);
    const refresh_rate = 1000;
    const saving_rate = 600000;

    const TimeLabels = () => {
        const labels = [];
        const currentTime = new Date();
        currentTime.setHours(9, 0, 0, 0);
        while (currentTime.getHours() < 16 || (currentTime.getHours() === 16 && currentTime.getMinutes() === 0)) {
            labels.push(currentTime.toTimeString().split(' ')[0].substring(0, 5));
            currentTime.setMinutes(currentTime.getMinutes() + 10);
        }
        return labels;
    };

    const fetchData = useCallback(async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/decibel');
            const today = new Date().toISOString().split('T')[0];
            const filteredData = data.filter(entry => new Date(entry.time).toISOString().split('T')[0] === today);
            setChartData({
                labels: TimeLabels(),
                datasets: [{ ...chartData.datasets[0], data: filteredData.map(entry => entry.decibel_value) }],
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, []);

    const updateDecibel = useCallback(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 9 && currentHour <= 16) {
            const volume = Math.round(localDbValues.current.reduce((a, b) => a + b, 0) / localDbValues.current.length) || 0;
            setDecibelValue(volume);
            localDbValues.current = [];
            setChartData(prevData => {
                const newData = [...prevData.datasets[0].data, volume];
                const newLabels = [...prevData.labels];
                if (newData.length > 42) {
                    newData.shift();
                    newLabels.shift();
                }
                return { ...prevData, datasets: [{ ...prevData.datasets[0], data: newData }], labels: newLabels };
            });
        }
    }, []);

    const updateDisplay = useCallback(() => {
        const db = document.getElementById("db");
        if (db) {
            const volume = Math.round(localDbValues.current.reduce((a, b) => a + b, 0) / localDbValues.current.length) || 0;
            db.innerText = volume.toString();
            return volume;
        }
        return 0;
    }, []);

    const saveDbToDatabase = useCallback(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 4 && currentHour <= 16) {
            const db = document.getElementById("db");
            const volume = parseInt(db.innerText, 10);
            if (volume > 0) {
                axios.post('http://localhost:5000/api/record_decibel', { decibel_value: volume })
                    .then(response => console.log('Decibel value saved:', response.data))
                    .catch(error => console.log('Error saving decibel value:', error));
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const interval = setInterval(updateDecibel, saving_rate);
        const saveInterval = setInterval(saveDbToDatabase, saving_rate);
        const displayInterval = setInterval(updateDisplay, refresh_rate);
        return () => {
            clearInterval(interval);
            clearInterval(saveInterval);
            clearInterval(displayInterval);
        };
    }, [updateDecibel, updateDisplay, saveDbToDatabase]);

    useEffect(() => {
        const interval = setInterval(() => {
            const volume = updateDisplay();
            if (volume >= 55) {
                setShowNotification(true, { decibelValue: volume });
                setTimeout(() => setShowNotification(false, null), 5000);
            } else {
                setShowNotification(false, null);
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [setShowNotification, updateDisplay]);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(stream => {
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
                const data = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(data);
                const rms = Math.sqrt(data.reduce((sum, value) => sum + Math.min(value, 120) ** 2, 0) / data.length);
                localDbValues.current.push(rms);
            };
        });
    }, []);

    return (
        <div className="mx-auto max-w-5xl items-center gap-2 py-4 lg:gap-4 xl:gap-6">
            <div className="relative drop-shadow-lg mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last xl:rounded-2xl">
                <Line ref={chartRef} options={options} data={chartData} />
                <div className={`absolute top-4 right-8 px-3 py-1 rounded-xl text-sm flex items-center gap-2 ${decibelValue > 55 ? "bg-red-500" : "bg-gray-900"} text-gray-50`}>
                    <VolumeIcon className="h-4 w-4" />
                    <span>Sound Level : <span id='db'> </span> dB</span>
                </div>
                <div className={`absolute top-14 right-8 px-3 py-1 rounded-xl text-sm flex items-center gap-2 ${decibelValue > 55 ? "bg-red-500" : "bg-gray-900"} text-gray-50`}>
                    <VolumeIcon className="h-4 w-4" />
                    <span>Chatter 80%</span>
                </div>
            </div>
        </div>
    );
}

AudioChart.propTypes = {
    setShowNotification: PropTypes.func.isRequired,
};