class Load {
    data: string = "";
    ruta: string;
    constructor(ruta: string) {
        this.ruta = ruta;
    }

    async loadFile() {
        const promise = await fetch(this.ruta);
        const data = await promise.text();
        this.data = data;
    }
}

export default Load;