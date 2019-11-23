import CellValue from './CellValue';
import KnnUser from './KnnUser';

class KnnObject {
    nombre: string;
    distance: number;
    information: CellValue[];

    constructor(nombre: string, information: CellValue[]) {
        this.nombre = nombre;
        this.distance = 0;
        this.information = information;
    }
}

export interface ManagerKNNCache {
    id: number;
    cache: KnnUser[];
}

export default KnnObject;