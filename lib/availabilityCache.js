// Global cache for server runtime
let cache = {
  slots: [],
  lastUpdated: 0
};

export function getCachedAvailability() {
  return cache;
}

export function updateCachedAvailability(slots) {
  cache.slots = slots;
  cache.lastUpdated = Date.now();
}
