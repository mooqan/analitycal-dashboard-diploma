import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getData, createData, analyzeData } from '../api/axios.api';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement);

const Dashboard: FC = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState<Date | null>(new Date('2022-01-01'));
    const [endDate, setEndDate] = useState<Date | null>(new Date());
    const [chartData, setChartData] = useState<any>([]);
    const [kpiData, setKpiData] = useState<any>({ totalSales: 0, totalRevenue: 0, totalOrders: 0 });
    const [newDate, setNewDate] = useState<Date | null>(null);
    const [newSales, setNewSales] = useState<number>(0);
    const [newRevenue, setNewRevenue] = useState<number>(0);
    const [newOrders, setNewOrders] = useState<number>(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await getData();
            setChartData(data);
            calculateKpis(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleStartDateChange = (date: Date | null) => setStartDate(date);
    const handleEndDateChange = (date: Date | null) => setEndDate(date);

    const handleNewDateChange = (date: Date | null) => setNewDate(date);
    const handleNewSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewSales(Number(e.target.value));
    const handleNewRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewRevenue(Number(e.target.value));
    const handleNewOrdersChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewOrders(Number(e.target.value));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDate) return;
        const data = {
            date: newDate.toISOString().split('T')[0],
            sales: newSales,
            revenue: newRevenue,
            orders: newOrders
        };
        try {
            await createData(data);
            fetchData();
        } catch (error) {
            console.error('Error creating data:', error);
        }
    };

    const handleApplyDates = () => {
        const filteredData = filterDataByDate(chartData, startDate, endDate);
        calculateKpis(filteredData);
        setChartData(filteredData);
    };

    const handleAnalyzeData = async () => {
        try {
            const recommendationsResponse = await analyzeData(chartData);
            
            navigate('/analysis-report', { state: { recommendations: recommendationsResponse } });
        } catch (error) {
            console.error('Error analyzing data:', error);
        }
    };
    

    const calculateKpis = (data: any) => {
        const totalSales = data.reduce((sum: number, item: any) => sum + item.sales, 0);
        const totalRevenue = data.reduce((sum: number, item: any) => sum + item.revenue, 0);
        const totalOrders = data.reduce((sum: number, item: any) => sum + item.orders, 0);
        setKpiData({ totalSales, totalRevenue, totalOrders });
    };

    const filterDataByDate = (data: any, startDate: Date | null, endDate: Date | null) => {
        if (!startDate || !endDate) return data;
        return data.filter((item: any) => {
            const date = new Date(item.date);
            return date >= startDate && date <= endDate;
        });
    };

    const formattedLabels = (data: any) => {
        return data.map((item: any) => format(new Date(item.date), 'd MMMM yyyy', { locale: ru }));
    };

    const barData = {
        labels: formattedLabels(chartData),
        datasets: [
            {
                label: 'Sales',
                data: chartData.map((item: any) => item.sales),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const lineData = {
        labels: formattedLabels(chartData),
        datasets: [
            {
                label: 'Revenue',
                data: chartData.map((item: any) => item.revenue),
                fill: false,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
            },
        ],
    };

    const pieData = {
        labels: ['Sales', 'Revenue', 'Orders'],
        datasets: [
            {
                data: [
                    chartData.reduce((sum: number, item: any) => sum + item.sales, 0),
                    chartData.reduce((sum: number, item: any) => sum + item.revenue, 0),
                    chartData.reduce((sum: number, item: any) => sum + item.orders, 0)
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <button onClick={handleAnalyzeData} className="btn btn-blue">Analyze Data</button>
            </div>
            <div className="date-filters flex justify-center gap-4 mb-5">
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">Start Date</label>
                    <DatePicker selected={startDate} onChange={handleStartDateChange} className="input" />
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">End Date</label>
                    <DatePicker selected={endDate} onChange={handleEndDateChange} className="input" />
                </div>
                <button onClick={handleApplyDates} className="btn btn-green">Apply Dates</button>
            </div>
            <div className="kpi-container">
                <div className="kpi">
                    <h2>Total Sales</h2>
                    <p>{kpiData.totalSales}</p>
                </div>
                <div className="kpi">
                    <h2>Total Revenue</h2>
                    <p>${kpiData.totalRevenue}</p>
                </div>
                <div className="kpi">
                    <h2>Total Orders</h2>
                    <p>{kpiData.totalOrders}</p>
                </div>
            </div>
            <div style={{ width: '600px', margin: 'auto' }}>
                <h2>Bar Chart</h2>
                <Bar data={barData} options={{ responsive: true }} />
                <h2>Line Chart</h2>
                <Line data={lineData} options={{ responsive: true }} />
                <h2>Pie Chart</h2>
                <Pie data={pieData} options={{ responsive: true }} />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-8">
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">New Date</label>
                    <DatePicker selected={newDate} onChange={handleNewDateChange} className="input" />
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">Sales</label>
                    <input type="number" value={newSales} onChange={handleNewSalesChange} className="input" />
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">Revenue</label>
                    <input type="number" value={newRevenue} onChange={handleNewRevenueChange} className="input" />
                </div>
                <div className="flex flex-col items-center">
                    <label className="mb-2 text-white">Orders</label>
                    <input type="number" value={newOrders} onChange={handleNewOrdersChange} className="input" />
                </div>
                <button type="submit" className="btn btn-green">Add Data</button>
            </form>
        </div>
    );
};

export default Dashboard;
