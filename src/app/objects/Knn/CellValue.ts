export class CellValue {
    title: string;
    value: string | number;
    constructor(title: string, value: string | number) {
        this.title = title;
        this.value = value;
    }
}

export default CellValue;