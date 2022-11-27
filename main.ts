// base types test
let booleanInferenceVar = true,
    booleanVar: boolean,
    stringVar: string,
    numberVar = 5;

// function type
type sumFnType = (first:number,second:number) => number;

// function implementation
let sum:sumFnType = (first, second) => {
    return first + second
    };

// interface of object to iterate for computing
interface iterableNumbersIF {
    first: string;
    second: string;
}
// list object
type numbersIteratorType = iterableNumbersIF[]

// list of numbers to sum, generated randomly
let rand = () => Math.random() * 100,
    numbersList: numbersIteratorType = [...Array(4)].map(() =>  {
        return { first: String(rand()), second: String(rand()) };
    });

type TableData = Record<string,string>[];
type TableHeaders = Record<string,string>;

// sum all and save in new var
let resultList: TableData = numbersList.map((line:iterableNumbersIF) => {
    return {...line, result: String(sum(+line.first,+line.second)) }
});

let headerTexts: TableHeaders = {
    first: 'First number',
    second: 'Second Number',
    result: 'Total',
}

class Page{
    hasBody: boolean;
    body: HTMLBodyElement;
    constructor(){
        this.hasBody = document.querySelector('body') != null;
        this.body = this.hasBody ? document.querySelector('body')! : document.createElement('body');
    }
}

class IdentityManager {
    id: number;
    constructor() {
        this.id = Math.floor(Math.random() * 100);
    }
    public static getId(): number{
        return new IdentityManager().id;
    }
}

class TableGenerator {
    headers: TableHeaders;
    tableData: TableData;
    componentId = IdentityManager.getId();
    cssBaseName = 'table';
    page = new Page();

    cssStyle = `
        .${this.cssClassPrefix()}-cell-body {
            border: 1px solid #f00;
        }
        
        .${this.cssClassPrefix()}-cell-header {
            font-weight: bold;
        }
        
        .${this.cssClassPrefix()}-row-body {
            border: 1px solid #00f;
            display:flex;
            flex-direction: row;
        }
        
        .${this.cssClassPrefix()}-row-header {
            border-bottom: 1px solid #777;
            display:flex;
            flex-direction: row;
        }
        
        .${this.cssClassPrefix()}-table {
            border: 1px solid #0f0;
            display:flex;
            flex-direction: column;
        }
        `;
    constructor(tableData:TableData,headers:TableHeaders,){
        this.headers = headers;
        this.tableData = tableData;
    }
    cssClassPrefix(){
        return `${this.cssBaseName}-${this.componentId}`;
    }
    addStyleToDOM(){
        let style = document.createElement('style');
        style.innerHTML = this.cssStyle;
        this.page.body.appendChild(style);
    }
    addToDOM(){
        let table = document.createElement('div');
        // adding cell and rows to the table
        this.tableData.forEach((rowData, index) => {
            if (index == 0) {
                let header = document.createElement('div'),
                    headerTexts = this.headers;
                Object.keys(rowData).forEach(field => {
                    let headerCell = document.createElement('div');
                    headerCell.classList.add(`${this.cssClassPrefix()}-cell-header`);
                    headerCell.textContent = headerTexts[field] || '';
                    header.appendChild(headerCell);
                });
                header.classList.add(`${this.cssClassPrefix()}-row-body`);
                table.appendChild(header);
            }

            let row = document.createElement('div');
            Object.values(rowData).forEach(number => {
                let cell = document.createElement('div');
                cell.classList.add(`${this.cssClassPrefix()}-cell-body`);
                cell.textContent = String(number);
                row.appendChild(cell);
            });
            row.classList.add(`${this.cssClassPrefix()}-row-body`);
            table.appendChild(row);
        })
        table.classList.add(`${this.cssClassPrefix()}-table`);
        return table
    }
}


function initLoader(){
    // now some basic js
    let hasBody = document.querySelector('body') != null,
        page = new Page(),
        body = page.body;
    let table = new TableGenerator(resultList,headerTexts);
    table.addStyleToDOM();
    body.appendChild(table.addToDOM());
    if (!hasBody) {
        document.appendChild(body);
    }
}
function initApp(){

}

document.addEventListener("readystatechange", function(){
    if (this.readyState === "interactive") {
        initLoader();
    } else if (this.readyState === "complete") {
        initApp();
    }
});