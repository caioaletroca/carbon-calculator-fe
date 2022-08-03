class SessionStorage {
    private keys: string[] = [];

    constructor() {
        this.initialize();
    }

    initialize() {
        this.keys = JSON.parse(sessionStorage.getItem('keys') as string) || [];
    }
    
    save(key: string, data: any) {
        if(!this.keys.includes(key))
            this.keys.push(key);
            
        sessionStorage.setItem('keys', JSON.stringify(this.keys));
        sessionStorage.setItem(key, JSON.stringify(data));
    }

    load(key: string) : any {
        return JSON.parse(sessionStorage.getItem(key) as string);
    }

    clear() {
        this.keys = [];
        sessionStorage.clear();
    }
}

export default new SessionStorage();