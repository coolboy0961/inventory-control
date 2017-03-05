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
    p.putEntitiesToValues = function(entities) {
        throw new Error('Not Implemented');
    }
    p.putEntityToValues = function(entity) {
        throw new Error('Not Implemented');
    }
    p.putValuesToDatastore = function() {
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
    var numberColumns = 11;
    var numberRows = sheet.getLastRow() - (firstRow - 1);
    var recordVersionColumnNum = 11;
    var recordIDColumnNum = 1;
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
        if (numberRows == 0) {
            this.values = new Object();
        } else {
            var sheetValues = sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).getValues();
            this.values = new Object();
            for (var i = 0; i < sheetValues.length; i++) {
                if (Utility.isEmpty(sheetValues[i][recordIDColumnNum - 1])) {
                    sheetValues[i][recordIDColumnNum - 1] = Utility.uuid();
                }
                this.values[sheetValues[i][recordIDColumnNum - 1]] = sheetValues[i];
            }
        }
    }
    p.putValuesToDatastore = function() {
        var sheetValues = [];
        for (var key in this.values) {
            if (this.values.hasOwnProperty(key)) {
                sheetValues.push(this.values[key]);
            }
        }
        if (sheetValues.length == 0) {
            return;
        }
        sheet.getRange(firstRow, firstColumn, sheetValues.length, numberColumns).setValues(sheetValues);
    }
    p.valuesToEntities = function() {
        var entities = new Object();
        for (var key in this.values) {
            var value = this.values[key];
            var entity = new ProductSoldEntity(value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8], value[9]);
            entities[entity.getRecordID()] = entity;
        }
        return entities;
    }
    p.putEntitiesToValues = function(entities) {
        for (var key in entities) {
            if (entities.hasOwnProperty(key)) {
                var versionNumber;
                if (this.values.hasOwnProperty(key)) {
                    versionNumber = this.values[key][recordVersionColumnNum - 1] + 1;
                } else {
                    versionNumber = 0;
                }
                this.values[key] = [
                    entities[key].getRecordID(),
                    entities[key].getLastUpdateTime(),
                    entities[key].getAccountSettlementMonth(),
                    entities[key].getProductName(),
                    entities[key].getItemCount(),
                    entities[key].getItemUnitPriceJPY(),
                    entities[key].getDeliveryChargeJPY(),
                    entities[key].getItemRetailPriceCNY(),
                    entities[key].getDeliveryChargeCNY(),
                    entities[key].getIsPaid(),
                    versionNumber
                ];
            }
        }
    }
    p.putEntityToValues = function(entity) {
        var versionNumber;
        var key = entity.getRecordID();
        if (this.values.hasOwnProperty(key)) {
            versionNumber = this.values[key][recordVersionColumnNum - 1] + 1;
        } else {
            versionNumber = 0;
        }
        this.values[entity.getRecordID()] = [
            entity.getRecordID(),
            entity.getLastUpdateTime(),
            entity.getAccountSettlementMonth(),
            entity.getProductName(),
            entity.getItemCount(),
            entity.getItemUnitPriceJPY(),
            entity.getDeliveryChargeJPY(),
            entity.getItemRetailPriceCNY(),
            entity.getDeliveryChargeCNY(),
            entity.getIsPaid(),
            versionNumber
        ];
    }
    //クラスメソッド定義
    ProductSoldRepository.instance = undefined;
    ProductSoldRepository.getInstance = function() {
        if (Utility.isEmpty(ProductSoldRepository.instance)) {
            ProductSoldRepository.instance = new ProductSoldRepository();
            return ProductSoldRepository.instance;
        } else {
            return ProductSoldRepository.instance;
        }
    }
    return ProductSoldRepository;
})();

function testProductSoldRepositoryPutValuesToDatastore() {
    var productSoldRepository = ProductSoldRepository.getInstance();
    var entities = productSoldRepository.valuesToEntities();
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            entities[key].setDeliveryChargeJPY(300);
        }
    }
    productSoldRepository.putEntitiesToValues(entities);
    productSoldRepository.putValuesToDatastore();
}

function testProductSoldRepositoryEntitiesToValues() {
    var productSoldRepository = ProductSoldRepository.getInstance();
    var entities = productSoldRepository.valuesToEntities();
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            entities[key].setDeliveryChargeJPY(300);
        }
    }
    productSoldRepository.putEntitiesToValues(entities);
    for (var key in productSoldRepository.getValues()) {
        if (productSoldRepository.getValues().hasOwnProperty(key)) {
            Logger.log(productSoldRepository.getValues()[key]);
        }
    }
}

function testProductSoldRepository() {
    var productSoldRepository = ProductSoldRepository.getInstance();
    Logger.log(productSoldRepository.getValues());
    productSoldRepository.setValues(["a", "b", "c", "d"]);
    var productSoldRepository2 = ProductSoldRepository.getInstance();
    Logger.log(productSoldRepository2.getValues());
}

function testProductSoldRepositoryValuesToEntities() {
    var productSoldRepository = ProductSoldRepository.getInstance();
    var entities = productSoldRepository.valuesToEntities();
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            entities[key].printLog();
        }
    }
    for (var i = 0; i < entities.length; i++) {
        Logger.log("ProductSoldEntity " + i + ":");
        entities[i].printLog();
    }
}
