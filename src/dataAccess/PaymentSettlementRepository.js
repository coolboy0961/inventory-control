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
//子クラス定義
var PaymentSettlementRepository = (function() {
    //クラス内定数
    var spreadsheetId = "1sznm0e9qyu7Yg_mbPsaPgJeXWxseM3xjvAPYXKoIvps";
    var sheetName = "货款结算一览";
    var sheet = Utility.getSheetByIdAndName(spreadsheetId, sheetName);
    var firstRow = 2;
    var firstColumn = 1;
    var numberColumns = 10;
    var numberRows = sheet.getLastRow() - (firstRow - 1);
    var recordVersionColumnNum = 10;
    var accountSettlementMonth = 2;
    //コンストラクタ
    var PaymentSettlementRepository = function() {
        if (!(this instanceof PaymentSettlementRepository)) {
            return new PaymentSettlementRepository();
        }
        this.init();
    }
    //継承関係設定
    Utility.inherits(PaymentSettlementRepository, Repository);
    //プロトタイプ内でメソッド定義
    var p = PaymentSettlementRepository.prototype;
    p.init = function() {
        if (numberRows == 0) {
            this.values = new Object();
        } else {
            var sheetValues = sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).getValues();
            this.values = new Object();
            for (var i = 0; i < sheetValues.length; i++) {
                if (Utility.isEmpty(sheetValues[i][accountSettlementMonth - 1])) {
                    sheetValues[i][accountSettlementMonth - 1] = Utility.formatDateToMonth(new Date());
                } else {
                    sheetValues[i][accountSettlementMonth - 1] = Utility.formatDateToMonth(sheetValues[i][accountSettlementMonth - 1]);
                }
                this.values[sheetValues[i][accountSettlementMonth - 1]] = sheetValues[i];
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
            var entity = new PaymentSettlementEntity(value[0], value[1], value[2], value[3], value[4], value[5], value[6], value[7], value[8]);
            entities[entity.getAccountSettlementMonth()] = entity;
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
                    entities[key].getLastUpdateTime(),
                    entities[key].getAccountSettlementMonth(),
                    entities[key].getCostAmountJPY(),
                    entities[key].getSalesAmountJPY(),
                    entities[key].getIncomeAmountJPY(),
                    entities[key].getCostAmountCNY(),
                    entities[key].getSalesAmountCNY(),
                    entities[key].getIncomeAmountCNY(),
                    entities[key].getExchange(),
                    versionNumber
                ];
            }
        }
    }
    p.putEntityToValues = function(entity) {
        var versionNumber;
        var key = entity.getAccountSettlementMonth();
        if (this.values.hasOwnProperty(entity.getAccountSettlementMonth())) {
            versionNumber = this.values[key][recordVersionColumnNum - 1] + 1;
        } else {
            versionNumber = 0;
        }
        this.values[entity.getAccountSettlementMonth()] = [
            entity.getLastUpdateTime(),
            entity.getAccountSettlementMonth(),
            entity.getCostAmountJPY(),
            entity.getSalesAmountJPY(),
            entity.getIncomeAmountJPY(),
            entity.getCostAmountCNY(),
            entity.getSalesAmountCNY(),
            entity.getIncomeAmountCNY(),
            entity.getExchange(),
            versionNumber
        ];
    }
    //クラスメソッド定義
    PaymentSettlementRepository.instance = undefined;
    PaymentSettlementRepository.getInstance = function() {
        if (Utility.isEmpty(PaymentSettlementRepository.instance)) {
            PaymentSettlementRepository.instance = new PaymentSettlementRepository();
            return PaymentSettlementRepository.instance;
        } else {
            return PaymentSettlementRepository.instance;
        }
    }
    return PaymentSettlementRepository;
})();

function testPaymentSettlementRepositoryPutEntityToValues() {
    var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
    var paymentSettlementEntity = new PaymentSettlementEntity(new Date(), Utility.formatDateToMonth(new Date()), 111, 222, 333, 444, 555, 666, 0.05);
    paymentSettlementRepository.putEntityToValues(paymentSettlementEntity);
    for (var key in paymentSettlementRepository.getValues()) {
        if (paymentSettlementRepository.getValues().hasOwnProperty(key)) {
            Logger.log(paymentSettlementRepository.getValues()[key]);
        }
    }
}

function testPaymentSettlementRepositoryPutValuesToDatastore() {
    var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
    var paymentSettlementEntity = new PaymentSettlementEntity(new Date(), Utility.formatDateToMonth(new Date()), 111, 222, 333, 444, 555, 666, 0.05);
    paymentSettlementRepository.putEntityToValues(paymentSettlementEntity);
    paymentSettlementRepository.putValuesToDatastore();
}

function testPaymentSettlementRepositoryEntitiesToValues() {
    var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
    var entities = paymentSettlementRepository.valuesToEntities();
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            entities[key].setExchange(0.06);
        }
    }
    paymentSettlementRepository.putEntitiesToValues(entities);
    for (var key in paymentSettlementRepository.getValues()) {
        if (paymentSettlementRepository.getValues().hasOwnProperty(key)) {
            Logger.log(paymentSettlementRepository.getValues()[key]);
        }
    }
}

function testPaymentSettlementRepository() {
    var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
    Logger.log(paymentSettlementRepository.getValues());
    paymentSettlementRepository.setValues(["a", "b", "c", "d"]);
    var paymentSettlementRepository2 = PaymentSettlementRepository.getInstance();
    Logger.log(paymentSettlementRepository2.getValues());
}

function testPaymentSettlementRepositoryValuesToEntities() {
    var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
    var entities = paymentSettlementRepository.valuesToEntities();
    for (var key in entities) {
        if (entities.hasOwnProperty(key)) {
            entities[key].printLog();
        }
    }
    for (var i = 0; i < entities.length; i++) {
        Logger.log("PaymentSettlementEntity[" + i + "]:");
        entities[i].printLog();
    }
}
