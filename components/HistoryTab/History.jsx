import {Card} from "/components/ui/card"
import {Tabs, TabsList, TabsTrigger, TabsContent} from "/components/ui/tabs"
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "/components/ui/table"
import AudioChart from "/components/AudioChart/AudioChart.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import axios from "axios";

export default function History({setShowNotification}) {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const fetchHistoryData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/decibel');
                setHistoryData(response.data);
            } catch (error) {
                console.error('Error fetching history data:', error);
            }
        };

        fetchHistoryData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    return (
        <Card className="w-full overflow-auto">
            <Tabs defaultValue="chart" className="w-full">
                <TabsList className="border-b">
                    <TabsTrigger value="chart" className="selected-tab">Noise Average</TabsTrigger>
                    <TabsTrigger value="events" className="selected-tab">History</TabsTrigger>
                </TabsList>
                <TabsContent value="chart">
                    <div className="mx-auto max-w-5xl text-center items-center gap-2 py-4 lg:gap-4 xl:gap-6">
                        <AudioChart setShowNotification={setShowNotification}/>
                    </div>
                </TabsContent>
                <TabsContent value="events">
                    <div className="mx-auto max-w-5xl text-center items-center gap-2 py-4 lg:gap-4 xl:gap-6">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center w-[200px]">Date</TableHead>
                                    <TableHead className="text-center w-[100px]">Time</TableHead>
                                    <TableHead className="text-center w-[200px]">Noise Decibel</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {historyData.map((entry, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{formatDate(entry.time)}</TableCell>
                                        <TableCell>{formatTime(entry.time)}</TableCell>
                                        <TableCell>{entry.decibel_value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>
            </Tabs>
        </Card>
    )
}

History.propTypes = {
    setShowNotification: PropTypes.func.isRequired,
};