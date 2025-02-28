export interface StorageInterface {
    store(key: string, data: any): Promise<void>;
    get(key: string): Promise<any>;
    clear(key: string): Promise<void>;
}
