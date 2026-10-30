// Fragment-only navigation can retain a browser entry key. Include the route
// so an unrelated page never inherits its saved scroll or focus position.
export const getRouteEntryKey = location => `${location.key || 'default'}:${location.pathname}${location.search}`;
