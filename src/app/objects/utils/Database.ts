class Database {
    data: string[][];
    id: number;

    constructor(id?: number) {
        this.data = [];
        this.id = id;
    }
}

export default Database;