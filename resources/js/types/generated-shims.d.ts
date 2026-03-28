type WayfinderRoute = ((...args: unknown[]) => any) & {
    form: (...args: unknown[]) => Record<string, unknown>;
};
type WayfinderAction = {
    form: (...args: unknown[]) => Record<string, unknown>;
    [key: string]: unknown;
};

declare module '@/routes' {
    export const dashboard: WayfinderRoute;
    export const home: WayfinderRoute;
    export const login: WayfinderRoute;
    export const logout: WayfinderRoute;
    export const register: WayfinderRoute;

    const routeModule: Record<string, WayfinderRoute>;
    export default routeModule;
}

declare module '@/routes/*' {
    export const confirm: WayfinderRoute;
    export const disable: WayfinderRoute;
    export const edit: WayfinderRoute;
    export const email: WayfinderRoute;
    export const enable: WayfinderRoute;
    export const qrCode: WayfinderRoute;
    export const recoveryCodes: WayfinderRoute;
    export const regenerateRecoveryCodes: WayfinderRoute;
    export const request: WayfinderRoute;
    export const secretKey: WayfinderRoute;
    export const send: WayfinderRoute;
    export const store: WayfinderRoute;
    export const update: WayfinderRoute;

    const routeEntry: WayfinderRoute;
    export default routeEntry;
}

declare module '@/actions/*' {
    const actionEntry: Record<string, WayfinderAction>;
    export default actionEntry;
}
