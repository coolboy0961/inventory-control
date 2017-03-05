var Entity = (function() {
    //クラス内定数

    //コンストラクタ
    var Entity = function() {
        if (!(this instanceof Entity)) {
            return new Entity();
        }
        this.init();
    }
    var p = Entity.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {
        throw new Error('Not Implemented');
    }
    p.validate = function() {
        throw new Error('Not Implemented');
    }
    p.find = function() {
        throw new Error('Not Implemented');
    }
    p.put = function() {
        throw new Error('Not Implemented');
    }
    p.checkIntegrity = function() {
        throw new Error('Not Implemented');
    }
    p.putToDatastore = function() {
        throw new Error('Not Implemented');
    }
    return Entity;
})();


var PaymentSettlementEntity = (function() {
    //クラス内定数

    //コンストラクタ
    var PaymentSettlementEntity = function(lastUpdateTime, accountSettlementMonth, costAmountJPY, salesAmountJPY, incomeAmountJPY, costAmountCNY, salesAmountCNY, incomeAmountCNY, exchange) {
        if (!(this instanceof PaymentSettlementEntity)) {
            return new PaymentSettlementEntity(lastUpdateTime, accountSettlementMonth, costAmountJPY, salesAmountJPY, incomeAmountJPY, costAmountCNY, salesAmountCNY, incomeAmountCNY, exchange);
        }
        this.lastUpdateTime = lastUpdateTime;
        this.accountSettlementMonth = accountSettlementMonth;
        this.costAmountJPY = costAmountJPY;
        this.salesAmountJPY = salesAmountJPY;
        this.incomeAmountJPY = incomeAmountJPY;
        this.costAmountCNY = costAmountCNY;
        this.salesAmountCNY = salesAmountCNY;
        this.incomeAmountCNY = incomeAmountCNY;
        this.exchange = exchange;
        this.init();
    }

    //継承関係設定
    Utility.inherits(PaymentSettlementEntity, Entity);
    var p = PaymentSettlementEntity.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {
        if (Utility.isEmpty(this.lastUpdateTime)) {
            this.lastUpdateTime = new Date();
        }
        if (Utility.isEmpty(this.accountSettlementMonth)) {
            this.accountSettlementMonth = Utility.formatDateToMonth(new Date())
        }
        if (Utility.isEmpty(this.costAmountJPY)) {
            this.costAmountJPY = 0;
        }
        if (Utility.isEmpty(this.salesAmountJPY)) {
            this.salesAmountJPY = 0;
        }
        if (Utility.isEmpty(this.incomeAmountJPY)) {
            this.incomeAmountJPY = 0;
        }
        if (Utility.isEmpty(this.costAmountCNY)) {
            this.costAmountCNY = 0;
        }
        if (Utility.isEmpty(this.salesAmountCNY)) {
            this.salesAmountCNY = 0;
        }
        if (Utility.isEmpty(this.incomeAmountCNY)) {
            this.incomeAmountCNY = 0;
        }
        if (Utility.isEmpty(this.exchange)) {
            this.exchange = 1;
        }
    }
    p.validate = function() {
        //throw new Error('Not Implemented');
    }
    p.find = function(key) {
        var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
        return paymentSettlementRepository.valuesToEntities()[key];
    }
    p.put = function() {
        var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
        paymentSettlementRepository.putEntityToValues(this);
    }
    p.checkIntegrity = function() {
        //throw new Error('Not Implemented');
    }
    p.putToDatastore = function() {
        var paymentSettlementRepository = PaymentSettlementRepository.getInstance();
        paymentSettlementRepository.putValuesToDatastore();
    }
    p.getLastUpdateTime = function() {
        return this.lastUpdateTime;
    }
    p.setLastUpdateTime = function(lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }
    p.getAccountSettlementMonth = function() {
        return this.accountSettlementMonth;
    }
    p.setAccountSettlementMonth = function(accountSettlementMonth) {
        this.accountSettlementMonth = accountSettlementMonth;
    }
    p.getSalesAmountCNY = function() {
        return this.salesAmountCNY;
    }
    p.setSalesAmountCNY = function(salesAmountCNY) {
        this.salesAmountCNY = salesAmountCNY;
    }
    p.getIncomeAmountCNY = function() {
        return this.incomeAmountCNY;
    }
    p.setIncomeAmountCNY = function(incomeAmountCNY) {
        this.incomeAmountCNY = incomeAmountCNY;
    }
    p.getCostAmountCNY = function() {
        return this.costAmountCNY;
    }
    p.setCostAmountCNY = function(costAmountCNY) {
        this.costAmountCNY = costAmountCNY;
    }
    p.getSalesAmountJPY = function() {
        return this.salesAmountJPY;
    }
    p.setSalesAmountJPY = function(salesAmountJPY) {
        this.salesAmountJPY = salesAmountJPY;
    }
    p.getIncomeAmountJPY = function() {
        return this.incomeAmountJPY;
    }
    p.setIncomeAmountJPY = function(incomeAmountJPY) {
        this.incomeAmountJPY = incomeAmountJPY;
    }
    p.getCostAmountJPY = function() {
        return this.costAmountJPY
    }
    p.setCostAmountJPY = function(costAmountJPY) {
        this.costAmountJPY = costAmountJPY;
    }
    p.getExchange = function() {
        return this.exchange;
    }
    p.setExchange = function(exchange) {
        this.exchange = exchange;
    }
    p.printLog = function() {
        Logger.log("lastUpdateTime:" + this.lastUpdateTime);
        Logger.log("accountSettlementMonth:" + this.accountSettlementMonth);
        Logger.log("salesAmountCNY:" + this.salesAmountCNY);
        Logger.log("incomeAmountCNY:" + this.incomeAmountCNY);
        Logger.log("costAmountCNY:" + this.costAmountCNY);
        Logger.log("salesAmountJPY:" + this.salesAmountJPY);
        Logger.log("incomeAmountJPY:" + this.incomeAmountJPY);
        Logger.log("costAmountJPY:" + this.costAmountJPY);
        Logger.log("exchange:" + this.exchange);
    }
    return PaymentSettlementEntity;
})();

function testPaymentSettlementEntityPut() {
    var entity = new PaymentSettlementEntity();
    entity = entity.find("2017年03月");
    entity.setExchange(0.07);
    entity.put();
    entity.putToDatastore();
}

function testPaymentSettlementEntityFind() {
    var entity = new PaymentSettlementEntity();
    entity = entity.find("2017年03月");
    entity.printLog();
}

function testPaymentSettlementEntity() {
    var paymentSettlementEntity = new PaymentSettlementEntity();
    Logger.log(paymentSettlementEntity.printLog());
}
