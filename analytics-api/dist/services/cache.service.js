"use strict";
/**
 * Simple in-memory cache service
 * For production, replace with Redis
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheService = void 0;
class CacheService {
    cache = new Map();
    cleanupInterval;
    constructor() {
        // Clean up expired entries every minute
        this.cleanupInterval = setInterval(() => this.cleanup(), 60000);
    }
    /**
     * Get a value from cache
     */
    async get(key) {
        const entry = this.cache.get(key);
        if (!entry) {
            return null;
        }
        if (Date.now() > entry.expiry) {
            this.cache.delete(key);
            return null;
        }
        return entry.value;
    }
    /**
     * Set a value in cache
     * @param ttl Time to live in seconds
     */
    async set(key, value, ttl = 300) {
        this.cache.set(key, {
            value,
            expiry: Date.now() + (ttl * 1000),
        });
    }
    /**
     * Delete a key from cache
     */
    async delete(key) {
        this.cache.delete(key);
    }
    /**
     * Delete all keys matching a pattern
     */
    async deletePattern(pattern) {
        const regex = new RegExp(pattern.replace('*', '.*'));
        for (const key of this.cache.keys()) {
            if (regex.test(key)) {
                this.cache.delete(key);
            }
        }
    }
    /**
     * Clear all cache
     */
    async clear() {
        this.cache.clear();
    }
    /**
     * Get cache stats
     */
    getStats() {
        return {
            size: this.cache.size,
            keys: [...this.cache.keys()],
        };
    }
    /**
     * Cleanup expired entries
     */
    cleanup() {
        const now = Date.now();
        for (const [key, entry] of this.cache.entries()) {
            if (now > entry.expiry) {
                this.cache.delete(key);
            }
        }
    }
    /**
     * Stop the cleanup interval
     */
    destroy() {
        clearInterval(this.cleanupInterval);
    }
}
exports.cacheService = new CacheService();
//# sourceMappingURL=cache.service.js.map