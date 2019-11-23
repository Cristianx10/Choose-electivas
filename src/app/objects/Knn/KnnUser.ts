class KnnUser {
    nombre: string;
    distance: number;

    constructor(nombre: string, distance:number) {
        this.nombre = nombre;
        this.distance = distance;
    }
}

export default KnnUser;