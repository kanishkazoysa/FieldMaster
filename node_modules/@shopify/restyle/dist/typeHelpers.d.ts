export declare const getKeys: <T extends {
    [key: string]: any;
}>(object: T) => (keyof T)[];
