const cron = require('node-cron');
const { fetchDataAndSave } = require('./services/fetchDataService');

// Function to start the cron jobs
const startCronJobs = () => {
    console.log('Starting Cron Jobs Scheduler...');

    // Schedule task to run every minute
    // The schedule expression '* * * * *' means: Every minute, of every hour, of every day of the month, of every month, of every day of the week.
    cron.schedule('* * * * *', async () => {
        console.log('Running scheduled data fetch job...');
        await fetchDataAndSave();
    });

    console.log('Scheduled job: Data fetch every 1 minute initialized.');
};

module.exports = { startCronJobs };
