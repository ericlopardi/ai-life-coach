import { AFFIRMATIONS } from '../constants/affirmations';


export const getDailyAffirmation = () => {
    const now = new Date();
    
    // If it's before 6 AM, use the previous day's affirmation
    let currentDate = new Date(now);
    if (now.getHours() < 6) {
        currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Create a date string in YYYY-MM-DD format to ensure consistency
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;
    
    // Create a simple hash from the date string to get a consistent index
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
        const char = dateString.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Ensure positive index and map to affirmations array length
    const index = Math.abs(hash) % AFFIRMATIONS.length;
    
    return AFFIRMATIONS[index];
};

export const getNextRotationTime = () => {
    const now = new Date();
    const next6AM = new Date(now);
    
    // Set to 6:00 AM today
    next6AM.setHours(6, 0, 0, 0);
    
    // If it's already past 6 AM today, move to tomorrow's 6 AM
    if (now >= next6AM) {
        next6AM.setDate(next6AM.getDate() + 1);
    }
    
    return next6AM;
};

export const getTimeUntilNextRotation = () => {
    const now = new Date();
    const nextRotation = getNextRotationTime();
    const diff = nextRotation - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds };
};
