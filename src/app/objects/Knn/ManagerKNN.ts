import KnnObject from './KnnObject';
import CellValue from './CellValue';
import Database from '../utils/Database';
import KnnUser from './KnnUser';
var MAX_VALUE = 10;

class ManagerKNN {

    titulares: string[];
    database: Database[];
    dataObserver: KnnObject[];

    constructor(database?: Database[]) {
        this.titulares = [];
        this.database = database ? database : [];
        this.dataObserver = [];


        this.database[0].data.forEach((datos, i) => {
            let name = "Undefined";
            if (i == 0) {
                this.titulares = datos;
            } else {
                let cellInformation: CellValue[] = [];
                datos.forEach((dato, i) => {
                    let datoResult: number = parseFloat(dato);
                    let datoCell: string | number = dato;
                    if (datoResult) {
                        datoCell = datoResult;
                    }

                    let cell = new CellValue(this.titulares[i], datoCell);
                    if (i === 0) {
                        name = cell.value + "";
                        console.log()
                    }
                    cellInformation.push(cell);
                });

                let knnObject = new KnnObject(name, cellInformation);
                this.dataObserver.push(knnObject);
            }
        });

    }

    addToDatabase(database: Database) {
        this.database.push(database);
    }

    setDatabase(dateFind: string) {
        var tempTitulares: string[] = [];
        var tempData: KnnObject[] = [];
        var found = false;

        for (let j = 0; j < this.database.length; j++) {
            const database = this.database[j];

            database.data.forEach((datos, i) => {
                if (i == 0) {
                    tempTitulares = datos;
                } else {
                    let name = "Undefined";
                    let cellInformation: CellValue[] = [];
                    datos.forEach((dato, i) => {
                        let datoResult: number = parseFloat(dato);
                        let datoCell: string | number = dato;
                        if (datoResult) {
                            datoCell = datoResult;
                        }

                        let cell = new CellValue(tempTitulares[i], datoCell);
                        if (i === 0) {
                            name = cell.value + "";
                        }
                        cellInformation.push(cell);
                    });

                    if (name === dateFind) {
                        found = true;
                        console.log("Base de datos encontrada")
                    }

                    let knnObject = new KnnObject(name, cellInformation);
                    tempData.push(knnObject);
                }
            });

            if (found) {
                this.titulares = tempTitulares;
                this.dataObserver = tempData;
                j = this.dataObserver.length;
            }

        }

        if (!found) {
            console.log("No se encontro Base de datos ")
        }


    }


    evaluateDistCoseno(data: KnnUser | KnnObject, ref: KnnUser | KnnObject) {

        var knnDate;
        var knnRef;

        if (data instanceof KnnUser) {
            knnDate = this.getRef(data);
        } else {
            knnDate = data;
        }

        if (ref instanceof KnnUser) {
            knnRef = this.getRef(ref);
        } else {
            knnRef = ref;
        }

        var queryDates = knnDate.information;
        var queryRefs = knnRef.information;

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

        if (filter < this.dataObserver.length) {

            this.dataObserver.forEach((dato) => {
                dato.distance = this.evaluateDistCoseno(ref, dato);
            });

            // Ordenamiento de menor y a mayor
            this.dataObserver.sort((datoA, datoB) => {
                return datoB.distance - datoA.distance;
            });

            let userKnns: KnnUser[] = [];
            this.dataObserver.forEach((user) => {
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
        while (result.length < secondFilter && factor + 1 < queryRef.dataObserver.length) {

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
        while (resultOfKNN.length < filter && factor + 1 < this.dataObserver.length) {
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

    calculateSumilatTo(refs: KnnObject[], dates: KnnObject[], filter: number) {
        var result = [];
        refs.forEach((ref) => {

            dates.forEach((date) => {
                var distance = this.evaluateDistCoseno(ref, date);
                var obj = new KnnUser(ref.nombre, distance);

                result.push(obj);
            });
        });
    }

    calculateFilter(database: KnnUser[] | KnnObject[], reference: KnnUser | KnnObject, filter: number) {

        let ref: KnnObject;
        if (reference instanceof KnnObject) {
            ref = reference;
        } else if (reference instanceof KnnUser) {
            ref = this.getRef(reference)
        }

        let resultData: KnnUser[] = [];

        if (filter < this.dataObserver.length) {

            database.forEach((dato) => {
                dato.distance = this.evaluateDistCoseno(ref, dato);
            });

            // Ordenamiento de menor y a mayor
            database.sort((datoA, datoB) => {
                return datoB.distance - datoA.distance;
            });

            let userKnns: KnnUser[] = [];
            database.forEach((user) => {
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

    calculateUsersFilter(database: KnnUser[] | KnnObject[], refs: KnnObject[] | KnnUser[], filter: number, exclude?: KnnObject[] | KnnUser[]) {

        var resultOfKNN: VotoKnn[] = [];

        let factor = 0;
        while (resultOfKNN.length < filter && factor + 1 < this.dataObserver.length) {
            factor++;

            let userRefs: KnnUser[][] = [];

            refs.forEach((ref) => {
                let result = this.calculateFilter(database, ref, factor);
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

    informationFilter(knnObject: KnnObject, filter: number) {
        var information: CellValue[] = Object.assign([], knnObject.information);
        information.sort((a, b) => {
            if (isNaN(parseInt(a.value + "")) === false && isNaN(parseInt(b.value + "")) === false && a.value <= 10 && b.value <= 10) {
                let valA = a.value as number;
                let valB = b.value as number;
                return valB - valA;
            } else {
                return -1;
            }
        });
        var resultFilter = [];
        for (let index = 0; index < filter; index++) {
            resultFilter.push(information[index])
        }
        return resultFilter;
    }

    getRef(userKnn: KnnUser | string): KnnObject {
        let user = undefined;
        for (let i = 0; i < this.dataObserver.length; i++) {
            let userData = this.dataObserver[i];
            let name = "";
            if (userKnn instanceof KnnUser) {
                name = userKnn.nombre;
            } else {
                name = userKnn
            }

            if (userData.nombre === name) {
                user = userData;
                i = this.dataObserver.length;
            }
        }

        return user;
    }

    getAllName() {
        let names: string[] = [];
        this.dataObserver.forEach(dato => {
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