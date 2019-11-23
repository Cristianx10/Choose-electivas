"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const KnnObject_1 = __importDefault(require("./KnnObject"));
var MAX_VALUE = 10;
class ManagerKNN {
    constructor(database) {
        this.database = database;
        this.titulares = [];
        this.data = [];
        this.database.data.forEach((datos, i) => {
            if (i == 0) {
                this.titulares = datos;
            }
            else {
                let name = "Undefined";
                let cellInformation = [];
                datos.forEach((dato, i) => {
                    let datoResult = parseFloat(dato);
                    let datoCell = dato;
                    if (datoResult) {
                        datoCell = datoResult;
                    }
                    let cell = new CellValue(this.titulares[i], datoCell);
                    if (this.titulares[i] === "Nombre completo" || this.titulares[i] === "Destino") {
                        name = cell.value + "";
                    }
                    cellInformation.push(cell);
                });
                let knnObject = new KnnObject_1.default(name, cellInformation);
                this.data.push(knnObject);
            }
        });
    }
    evaluateDistCoseno(data, ref) {
        var queryDates = data.information;
        var queryRefs = ref.information;
        let distCoseno = 0;
        let distance = 0;
        let acumulateA = 0;
        let acumulateB = 0;
        for (let index = 0; index < queryDates.length; index++) {
            let queryDate = queryDates[index];
            let queryRef = queryRefs[index];
            if (isNaN(queryDate.value) == false && queryRef.value <= MAX_VALUE) {
                let valDate = queryDates[index].value;
                let valRef = queryRefs[index].value;
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
    calculate(ref, filter) {
        this.data.forEach((dato) => {
            dato.distance = this.evaluateDistCoseno(ref, dato);
        });
        // Ordenamiento de menor y a mayor
        this.data.sort((datoA, datoB) => {
            return datoB.distance - datoA.distance;
        });
        let resultData = [];
        for (let i = 0; resultData.length < filter; i++) {
            let dato = this.data[i];
            if (dato != ref) {
                resultData.push(dato);
            }
        }
        return resultData;
    }
    consenso(ref, query, queryRef) {
    }
    getName(name) {
        let dataRef = undefined;
        for (let i = 0; i < this.data.length; i++) {
            let dato = this.data[i];
            if (dato.nombre == name) {
                dataRef = dato;
                i = this.data.length;
            }
        }
        return dataRef;
    }
    getAllName() {
        let names = [];
        this.data.forEach(dato => {
            names.push(dato.nombre);
        });
        return names;
    }
}
exports.default = ManagerKNN;
//# sourceMappingURL=ManagerKNN.js.map