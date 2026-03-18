/**
 * In-memory sliding window rate limiter.
 * No external dependencies — uses a Map of timestamps per token.
 */
const rateLimit = (options: {
  interval: number;
  uniqueTokenPerInterval: number;
}) => {
  const tokenCache = new Map<string, number[]>();

  return {
    check: (
      limit: number,
      token: string
    ): { success: boolean; remaining: number } => {
      const now = Date.now();
      const windowStart = now - options.interval;

      const timestamps = tokenCache.get(token) ?? [];
      const valid = timestamps.filter((t) => t > windowStart);

      if (valid.length >= limit) {
        return { success: false, remaining: 0 };
      }

      valid.push(now);
      tokenCache.set(token, valid);

      // Cleanup old entries periodically
      if (tokenCache.size > options.uniqueTokenPerInterval) {
        const firstKey = tokenCache.keys().next().value;
        if (firstKey) tokenCache.delete(firstKey);
      }

      return { success: true, remaining: limit - valid.length };
    },
  };
};

export default rateLimit;
