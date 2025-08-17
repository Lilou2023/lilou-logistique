import { statusConfig } from '@/data/driverMockData.jsx';

export const generatePlanningData = (weeks) => {
    const data = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    const currentDayOfWeek = today.getDay(); 

    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1));

    for (let i = 0; i < weeks * 7; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);

        const dayOfWeek = date.getDay();
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        let statusCode;
        if (date < today) {
            statusCode = isWeekend ? 'R' : 'T';
        } else {
            statusCode = isWeekend ? 'R' : 'P';
        }
        
        if (date.getTime() === today.getTime()){
             statusCode = 'P';
        }


        data.push({
            date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
            day: date.toLocaleDateString('fr-FR', { weekday: 'short' }).charAt(0).toUpperCase() + date.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(1),
            tour: isWeekend ? 'Repos' : `Tournée ${String.fromCharCode(65 + (i % 5))}-${i + 1}`,
            code: statusCode,
        });
    }
    return data;
};