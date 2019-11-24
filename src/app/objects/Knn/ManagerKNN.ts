
import KnnObject from './KnnObject';
import CellValue from './CellValue';
import Database from '../utils/Database';
import KnnUser from './KnnUser';
var MAX_VALUE = 10;

class ManagerKNN {

    titulares: string[];
    database: Database;
    data: KnnObject[];

    constructor(database: Database) {
        this.database = database;
        this.titulares = [];
        this.data = [];


        this.database.data.forEach((datos, i) => {
            if (i == 0) {
                this.titulares = datos;
            } else {
                let name = "Undefined";
                let cellInformation: CellValue[] = [];
                datos.forEach((dato, i) => {
                    let datoResult: number = parseFloat(dato);
                    let datoCell: string | number = dato;
                    if (datoResult) {
                        datoCell = datoResult;
                    }

                    let cell = new CellValue(this.titulares[i], datoCell);
                    if (this.titulares[i] === "Nombre completo" || this.titulares[i] === "Destino") {
                        name = cell.value + "";
                    }
                    cellInformation.push(cell);
                });

                let knnObject = new KnnObject(name, cellInformation);
                this.data.push(knnObject);
            }
        });

    }


    evaluateDistCoseno(data: KnnObject, ref: KnnObject) {

        var queryDates = data.information;
        var queryRefs = ref.information;

        let distCoseno = 0;
        let distance = 0;

        let acumulateA = 0;
        let acumulateB = 0;

        for (let index = 0; index < queryDates.length; index++) {
            let queryDate = queryDates[index];
            let queryRef = queryRefs[index];

            if (isNaN(queryDate.value as number) == false && queryRef.value <= MAX_VALUE) {
                let valDate = queryDates[index].value as number;
                let valRef = queryRefs[index].value as number;
                distance += valDate * valRef;
                acumulateA += Math.pow(valDate, 2);
                acumulateB += Math.pow(valRef, 2);
            }
        }

        let productoA = Math.sqrt(acumulateA);
        let productoB = Math.sqrt(acumulateB);

        distCoseno = distance / (productoA * productoB);

        return distCoseno;
    }

    calculate(reference: KnnUser | KnnObject, filter: number) {

        let ref: KnnObject;
        if (reference instanceof KnnObject) {
            ref = reference;
        } else if (reference instanceof KnnUser) {
            ref = this.getRef(reference)
        }

        let resultData: KnnUser[] = [];

        if (filter < this.data.length) {

            this.data.forEach((dato) => {
                dato.distance = this.evaluateDistCoseno(ref, dato);
            });

            // Ordenamiento de menor y a mayor
            this.data.sort((datoA, datoB) => {
                return datoB.distance - datoA.distance;
            });

            let userKnns: KnnUser[] = [];
            this.data.forEach((user) => {
                userKnns.push(new KnnUser(user.nombre, user.distance));
            })

            for (let i = 0; resultData.length < filter; i++) {
                let dato = userKnns[i];

                if (dato.nombre != ref.nombre) {
                    resultData.push(dato);
                }
            }
        }
        return resultData;
    }

    consensoUser(ref: KnnObject, queryRef: ManagerKNN, firtsFilter: number, secondFilter: number) {

        var result: KnnUser[] = [];
        var resultOfKNN: VotoKnn[] = [];



        let factor = 0;
        while (result.length < secondFilter && factor + 1 < queryRef.data.length) {

            factor++;

            let userRefs = this.calculate(ref, firtsFilter);
            let secondUserRefs: KnnUser[][] = [];
            secondUserRefs.push(queryRef.calculate(ref, factor))

            for (let i = 0; i < userRefs.length; i++) {
                let userRef = userRefs[i];
                secondUserRefs.push(queryRef.calculate(userRef, factor));
            }

            let namesSame: VotoKnn[] = [];

            secondUserRefs.forEach((userArray) => {

                userArray.forEach((user) => {
                    let find = false;

                    namesSame.forEach((name) => {

                        if (name.name === user.nombre) {
                            name.value++;
                            find = true;
                        }
                    });

                    if (!find) {
                        namesSame.push({
                            name: user.nombre,
                            object: user,
                            value: 1,
                            factor: factor
                        });
                    }
                });

            });



            namesSame.forEach((name) => {

                if (result.length < secondFilter && name.value === secondUserRefs.length) {

                    let find = false;

                    resultOfKNN.forEach((r) => {
                        if (name.name == r.name) {
                            find = true;
                        }
                    })

                    if (!find) {
                        resultOfKNN.push(name)
                        result.push(name.object);
                    }
                }
            });

        }

        return { result: result, resultKnn: resultOfKNN };
    }

    calculateUsers(refs: KnnObject[] | KnnUser[], filter: number, exclude?: KnnObject[] | KnnUser[]) {

        var resultOfKNN: VotoKnn[] = [];

        let factor = 0;
        while (resultOfKNN.length < filter && factor + 1 < this.data.length) {
            factor++;

            let userRefs: KnnUser[][] = [];

            refs.forEach((ref) => {
                let result = this.calculate(ref, factor);
                userRefs.push(result);
            });

            let namesSame: VotoKnn[] = [];

            userRefs.forEach((userArray) => {

                userArray.forEach((user) => {
                    let find = false;
    
                    namesSame.forEach((name) => {
                    
                        if (name.name === user.nombre) {
                            name.value++;
                            find = true;
                        }
                    });

                    if (!find) {
                        namesSame.push({
                            name: user.nombre,
                            object: user,
                            value: 1,
                            factor: factor
                        });
                    }
                });

            });



            namesSame.forEach((name) => {

                if (resultOfKNN.length < filter && name.value === refs.length) {

                    let find = false;

                    resultOfKNN.forEach((r) => {
                        if (name.name == r.name) {
                            find = true;
                        }
                    })

                    if (exclude) {
                        exclude.forEach((user) => {
                            if (name.name == user.nombre) {
                                find = true;
                            }
                        });
                    }

                    if (!find) {
                        resultOfKNN.push(name);
                    }
                }
            });

        }

        return resultOfKNN;
    }

    getRef(userKnn: KnnUser | string): KnnObject {
        let user = undefined;
        for (let i = 0; i < this.data.length; i++) {
            let userData = this.data[i];
            let name = "";
            if (userKnn instanceof KnnUser) {
                name = userKnn.nombre;
            } else {
                name = userKnn
            }

            if (userData.nombre === name) {
                user = userData;
                i = this.data.length;
            }
        }

        return user;
    }

    getAllName() {
        let names: string[] = [];
        this.data.forEach(dato => {
            names.push(dato.nombre);
        });
        return names;
    }
}

interface VotoKnn {
    name: string;
    object: KnnUser;
    value: number;
    factor: number;
}

export default ManagerKNN;