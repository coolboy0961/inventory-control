//親クラス定義
var Repository = (function() {
    //クラス内定数

    //コンストラクタ
    var Repository = function() {
        if (!(this instanceof Repository)) {
            return new Repository();
        }
        this.init();
    }
    var p = Repository.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {
        throw new Error('Not Implemented');
    }
    p.setValues = function(values) {
        this.values = values;
    }
    p.getValues = function() {
        return this.values;
    }
    p.valuesToEntities = function() {
        throw new Error('Not Implemented');
    }
    p.entitiesToValues = function() {
        throw new Error('Not Implemented');
    }
    p.getInstance = function() {
        throw new Error('Not Implemented');
    }
    return Repository;
})();

//子クラス定義
var ProductSoldRepository = (function() {
    //クラス内定数
    var spreadsheetId = "1sznm0e9qyu7Yg_mbPsaPgJeXWxseM3xjvAPYXKoIvps";
    var sheetName = "已售出商品一览";
    var sheet = Utility.getSheetByIdAndName(spreadsheetId, sheetName);
    var firstRow = 2;
    var firstColumn = 1;
    var numberColumns = 10;
    var numberRows = sheet.getLastRow() - (firstRow - 1);
    //コンストラクタ
    var ProductSoldRepository = function() {
        if (!(this instanceof ProductSoldRepository)) {
            return new ProductSoldRepository();
        }
        this.init();
    }
    //継承関係設定
    Utility.inherits(ProductSoldRepository, Repository);
    //プロトタイプ内でメソッド定義
    var p = ProductSoldRepository.prototype;
    p.init = function() {
        this.values = sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).getValues();
    }
    p.putValuesToDatastore = function() {
        sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).setValues(this.values);
    }
    p.valuesToEntities = function() {
        throw new Error('Not Implemented');
    }
    p.entitiesToValues = function() {
        throw new Error('Not Implemented');
    }
    //クラスメソッド定義
    ProductSoldRepository.instance = undefined;
    ProductSoldRepository.getInstance = function() {
        if (ProductSoldRepository.instance != "" && ProductSoldRepository.instance != undefined) {
            return ProductSoldRepository.instance;
        } else {
            ProductSoldRepository.instance = new ProductSoldRepository();
            return ProductSoldRepository.instance;
        }
    }
    return ProductSoldRepository;
})();

function testProductSoldRepository() {
    var productSoldRepository = ProductSoldRepository.getInstance();
    Logger.log(productSoldRepository.getValues());
    productSoldRepository.setValues(["a", "b", "c", "d"]);
    var productSoldRepository2 = ProductSoldRepository.getInstance();
    Logger.log(productSoldRepository2.getValues());
}
