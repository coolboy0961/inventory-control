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
    p.updateValues = function() {
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
    var numberColumns = 9;
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
    p.updateValues = function() {
        sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).setValues(this.values);
    }
    // p.findValue() = function(lastUpdateDate, productName, productQuantity, productPrice_j, shipment_j, productPrice_c, shipment_c, alreadyPay) {
    //     for (var value in this.values) {
    //         Utility.countDays(value[0], lastUpdateDate) == 1;
    //         value[2] == productName;
    //         value[3] == productQuantity;
    //         value[4] == productPrice_j;
    //         value[5] == shipment_j
    //         value[6] == productPrice_c
    //         value[7] ==
    //             if (object.hasOwnProperty(value)) {
    //
    //             }
    //     }
    // }
    return ProductSoldRepository;
})();

function testProductSoldRepository() {
    var productSoldRepository = new ProductSoldRepository();
    Logger.log(productSoldRepository.getValues());
}
