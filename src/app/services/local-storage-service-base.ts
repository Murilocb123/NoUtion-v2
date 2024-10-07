export abstract class LocalStorageServiceBase<T> {
    protected abstract readonly storageKey: string;

    protected get(): T {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    protected set(data: T): void {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    protected clear(): void {
        localStorage.removeItem(this.storageKey);
    }
}
