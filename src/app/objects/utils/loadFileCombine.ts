import Database from './Database';

var idRefDatabase = 0;

class LoadFileCombine {

    ruta: string
    databaseA: Database;
    databaseB: Database;
    constructor(ruta: string) {
        this.ruta = ruta;
        idRefDatabase++;
        this.databaseA = new Database(idRefDatabase);
        idRefDatabase++;
        this.databaseB = new Database(idRefDatabase);

        this.getFile(ruta);
    }

    async loadFile(load?: Function) {

        const promise = await fetch(this.ruta);
        const data = await promise.text();

        const rows = data.split('\n');

        rows.forEach((elem) => {
            var celds = elem.split(',');
            this.databaseA.data.push(celds);
        });

        if (load) {
            load();
        }

        return this.databaseA;
    }

    getFile(data: string) {
        const rows = data.split('\n');

       
        var dataVertical: string[][] = [];

        var coma = ",";
        if(rows[0] && rows[0].indexOf(";") != -1){
            coma = ";";
        }

        rows.forEach((elem, i) => {
            var celds: string[] = elem.split(coma);
            this.databaseA.data.push(celds);
            celds.forEach((celd, index) => {
                if(dataVertical[index] instanceof Array){

                    dataVertical[index].push(celd);
                }else{
                    dataVertical[index] = [];
                    dataVertical[index].push(celd);
                }
            });
        });
        
        console.log(this.databaseA)
        dataVertical.forEach((dv) => {
            this.databaseB.data.push(dv);
        })


        return this.databaseA;
    }

}

export default LoadFileCombine;