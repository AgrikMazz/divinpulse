type RequestCounts = {
    [key: string]: {
        count: number;
        lastRequest: number;
    };
};

const requestCounts: RequestCounts = {};
const TIME_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

export function rateLimiter(key: string): boolean {
    const currentTime = Date.now();

    if (requestCounts[key]) {
        const { count, lastRequest } = requestCounts[key];

        if (currentTime - lastRequest < TIME_WINDOW) {
            if (count >= MAX_REQUESTS) {
                return false; // Reject request
            } else {
                requestCounts[key].count += 1;
            }
        } else {
            requestCounts[key].count = 1; // Reset count after time window
        }
        requestCounts[key].lastRequest = currentTime;
    } else {
        requestCounts[key] = { count: 1, lastRequest: currentTime };
    }

    return true; // Allow request
}
