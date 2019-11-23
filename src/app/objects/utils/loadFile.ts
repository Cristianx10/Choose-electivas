import Database from './Database';

var idRefDatabase = 0;

class LoadFile {

    ruta: string
    database: Database;
    constructor(ruta: string) {
        this.ruta = ruta;
        idRefDatabase++;
        this.database = new Database(idRefDatabase);
        this.getFile(ruta);
    }

    async loadFile(load?: Function) {

        const promise = await fetch(this.ruta);
        const data = await promise.text();

        const rows = data.split('\n');

        rows.forEach((elem) => {
            var celds = elem.split(',');
            this.database.data.push(celds);
        });

        if (load) {
            load();
        }

        return this.database;
    }

    getFile(data: string) {
        const rows = data.split('\n');

        rows.forEach((elem) => {
            var celds = elem.split(',');
            this.database.data.push(celds);
        });
        return this.database;
    }

}

export default LoadFile;