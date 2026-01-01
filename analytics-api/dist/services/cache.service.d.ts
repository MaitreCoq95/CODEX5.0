/**
 * Simple in-memory cache service
 * For production, replace with Redis
 */
declare class CacheService {
    private cache;
    private cleanupInterval;
    constructor();
    /**
     * Get a value from cache
     */
    get(key: string): Promise<any | null>;
    /**
     * Set a value in cache
     * @param ttl Time to live in seconds
     */
    set(key: string, value: any, ttl?: number): Promise<void>;
    /**
     * Delete a key from cache
     */
    delete(key: string): Promise<void>;
    /**
     * Delete all keys matching a pattern
     */
    deletePattern(pattern: string): Promise<void>;
    /**
     * Clear all cache
     */
    clear(): Promise<void>;
    /**
     * Get cache stats
     */
    getStats(): {
        size: number;
        keys: string[];
    };
    /**
     * Cleanup expired entries
     */
    private cleanup;
    /**
     * Stop the cleanup interval
     */
    destroy(): void;
}
export declare const cacheService: CacheService;
export {};
//# sourceMappingURL=cache.service.d.ts.map