export class CellValue {
    title: string;
    value: string | number;
    constructor(title: string, value: string | number) {
        this.title = title;
        var conValue;
        var valNumber = parseInt(value + "");
        if(isNaN(valNumber) === false){
            conValue = valNumber;
        }else{
            conValue = value;
        }
        this.value = conValue;
    }
}

export default CellValue;