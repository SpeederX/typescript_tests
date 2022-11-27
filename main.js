var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// base types test
var booleanInferenceVar = true, booleanVar, stringVar, numberVar = 5;
// function implementation
var sum = function (first, second) {
    return first + second;
};
// list of numbers to sum, generated randomly
var rand = function () { return Math.random() * 100; }, numbersList = __spreadArray([], Array(4), true).map(function (v) {
    return { first: String(rand()), second: String(rand()) };
});
// sum all and save in new var
var resultList = numbersList.map(function (line) {
    return __assign(__assign({}, line), { result: String(sum(+line.first, +line.second)) });
});
var headerTexts = {
    first: 'First number',
    second: 'Second Number',
    result: 'Total'
};
var Page = /** @class */ (function () {
    function Page() {
        this.hasBody = document.querySelector('body') != null;
        this.body = this.hasBody ? document.querySelector('body') : document.createElement('body');
    }
    return Page;
}());
var IdentityManager = /** @class */ (function () {
    function IdentityManager() {
        this.id = Math.floor(Math.random() * 100);
    }
    IdentityManager.getId = function () {
        return new IdentityManager().id;
    };
    return IdentityManager;
}());
var TableGenerator = /** @class */ (function () {
    function TableGenerator(tableData, headers) {
        this.componentId = IdentityManager.getId();
        this.cssBaseName = 'table';
        this.page = new Page();
        this.cssStyle = "\n        .".concat(this.cssClassPrefix(), "-cell-body {\n            border: 1px solid #f00;\n        }\n        \n        .").concat(this.cssClassPrefix(), "-cell-header {\n            font-weight: bold;\n        }\n        \n        .").concat(this.cssClassPrefix(), "-row-body {\n            border: 1px solid #00f;\n            display:flex;\n            flex-direction: row;\n        }\n        \n        .").concat(this.cssClassPrefix(), "-row-header {\n            border-bottom: 1px solid #777;\n            display:flex;\n            flex-direction: row;\n        }\n        \n        .").concat(this.cssClassPrefix(), "-table {\n            border: 1px solid #0f0;\n            display:flex;\n            flex-direction: column;\n        }\n        ");
        this.headers = headers;
        this.tableData = tableData;
    }
    TableGenerator.prototype.cssClassPrefix = function () {
        return "".concat(this.cssBaseName, "-").concat(this.componentId);
    };
    TableGenerator.prototype.addStyleToDOM = function () {
        var style = document.createElement('style');
        style.innerHTML = this.cssStyle;
        this.page.body.appendChild(style);
    };
    TableGenerator.prototype.addToDOM = function () {
        var _this = this;
        var table = document.createElement('div');
        // adding cell and rows to the table
        this.tableData.forEach(function (rowData, index) {
            if (index == 0) {
                var header_1 = document.createElement('div'), headerTexts_1 = _this.headers;
                Object.keys(rowData).forEach(function (field) {
                    var headerCell = document.createElement('div');
                    headerCell.classList.add("".concat(_this.cssClassPrefix(), "-cell-header"));
                    headerCell.textContent = headerTexts_1[field] || '';
                    header_1.appendChild(headerCell);
                });
                header_1.classList.add("".concat(_this.cssClassPrefix(), "-row-body"));
                table.appendChild(header_1);
            }
            var row = document.createElement('div');
            Object.values(rowData).forEach(function (number) {
                var cell = document.createElement('div');
                cell.classList.add("".concat(_this.cssClassPrefix(), "-cell-body"));
                cell.textContent = String(number);
                row.appendChild(cell);
            });
            row.classList.add("".concat(_this.cssClassPrefix(), "-row-body"));
            table.appendChild(row);
        });
        table.classList.add("".concat(this.cssClassPrefix(), "-table"));
        return table;
    };
    return TableGenerator;
}());
function initLoader() {
    // now some basic js
    var hasBody = document.querySelector('body') != null, page = new Page(), body = page.body, head = document.querySelector('head');
    var table = new TableGenerator(resultList, headerTexts);
    table.addStyleToDOM();
    body.appendChild(table.addToDOM());
    if (!hasBody) {
        document.appendChild(body);
    }
}
function initApp() {
}
document.addEventListener("readystatechange", function (event) {
    if (this.readyState === "interactive") {
        initLoader();
    }
    else if (this.readyState === "complete") {
        initApp();
    }
});
