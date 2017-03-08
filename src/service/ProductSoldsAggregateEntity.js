//親クラス
var Entities = (function() {
    //クラス内定数

    //コンストラクタ
    var Entities = function() {
        if (!(this instanceof Entities)) {
            return new Entities();
        }
        this.init();
    }
    var p = Entities.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {
        throw new Error('Not Implemented');
    }
    p.vaildateAll = function() {
        throw new Error('Not Implemented');
    }
    p.findAll = function() {
        throw new Error('Not Implemented');
    }
    p.putAll = function() {
        throw new Error('Not Implemented');
    }
    p.checkIntegrityAll = function() {
        throw new Error('Not Implemented');
    }
    p.putToDatastore = function() {
        throw new Error('Not Implemented');
    }
    return Entities;
})();

//子クラス
var ProductSoldsAggregateEntity = (function() {
    //クラス内定数

    //コンストラクタ
    var ProductSoldsAggregateEntity = function() {
        if (!(this instanceof ProductSoldsAggregateEntity)) {
            return new ProductSoldsAggregateEntity();
        }
        this.init();
    }
    var p = ProductSoldsAggregateEntity.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {
        this.productSoldRepository = ProductSoldRepository.getInstance();
        this.paymentSettlementRepository = PaymentSettlementRepository.getInstance();
        this.config = ConfigRepository.getInstance();
    }
    p.vaildateAll = function() {
        throw new Error('Not Implemented');
    }
    p.findAllProductSolds = function() {
        return this.productSoldRepository.valuesToEntities();
    }
    p.findAllPaymentSettlement = function() {
        return this.paymentSettlementRepository.valuesToEntities();
    }
    p.putAll = function() {
        throw new Error('Not Implemented');
    }
    p.checkIntegrityAll = function() {
        throw new Error('Not Implemented');
    }
    p.putToDatastore = function() {
        this.productSoldRepository.putValuesToDatastore();
        this.paymentSettlementRepository.putValuesToDatastore();
    }
    p.accountSettlement = function() {
        var exchange = this.config.getExchange();
        var productSolds = this.findAllProductSolds();
        var paymentSettlements = this.findAllPaymentSettlement();
        var targetAccountSettlementMonths = new Object();
        //从未结算的已售出商品中确定需要结算的月份
        for (var key in productSolds) {
            if (productSolds.hasOwnProperty(key)) {
                if (Utility.isEmpty(productSolds[key].getAccountSettlementMonth()) && Utility.formatDateToMonth(productSolds[key].getLastUpdateTime()) == Utility.formatDateToMonth(new Date()) && productSolds[key].getIsPaid() == "是") {
                    targetAccountSettlementMonths[Utility.formatDateToMonth(productSolds[key].getLastUpdateTime())] = Utility.formatDateToMonth(productSolds[key].getLastUpdateTime());
                }
            }
        }
        //为每个对象月进行结算
        for (var accountSettlementMonth in targetAccountSettlementMonths) {
            if (targetAccountSettlementMonths.hasOwnProperty(accountSettlementMonth)) {
                var paymentSettlement;
                if (Utility.isEmpty(paymentSettlements[accountSettlementMonth])) {
                    paymentSettlement = new PaymentSettlementEntity();
                } else {
                    paymentSettlement = paymentSettlements[accountSettlementMonth];
                }
                for (var recordID in productSolds) {
                    if (productSolds.hasOwnProperty(recordID)) {
                        if (Utility.isEmpty(productSolds[recordID].getAccountSettlementMonth()) && Utility.formatDateToMonth(productSolds[recordID].getLastUpdateTime()) == accountSettlementMonth && productSolds[recordID].getIsPaid() == "是") {
                            paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[recordID].getItemCount() * productSolds[recordID].getItemUnitPriceJPY()));
                            paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[recordID].getDeliveryChargeJPY()));
                            paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[recordID].getDeliveryChargeCNY() * exchange));
                            paymentSettlement.setSalesAmountJPY(paymentSettlement.getSalesAmountJPY() + (productSolds[recordID].getItemCount() * (productSolds[recordID].getItemRetailPriceCNY() * exchange)));
                            productSolds[recordID].setAccountSettlementMonth(paymentSettlement.getAccountSettlementMonth());
                            productSolds[recordID].put();
                        }
                    }
                }
                paymentSettlement.setIncomeAmountJPY(paymentSettlement.getSalesAmountJPY() - paymentSettlement.getCostAmountJPY());
                paymentSettlement.setCostAmountCNY(paymentSettlement.getCostAmountJPY() / exchange);
                paymentSettlement.setIncomeAmountCNY(paymentSettlement.getIncomeAmountJPY() / exchange);
                paymentSettlement.setSalesAmountCNY(paymentSettlement.getSalesAmountJPY() / exchange);
                paymentSettlement.setExchange(exchange);
                paymentSettlement.put();
            }
        }
        this.putToDatastore();
    }
    return ProductSoldsAggregateEntity;
})();

function testAccountSettlement() {
    var productSoldsAggregateEntity = new ProductSoldsAggregateEntity();
    productSoldsAggregateEntity.accountSettlement();
}

function testProductSoldsAggregateEntity() {
    var productSoldsAggregateEntity = new ProductSoldsAggregateEntity();
    Logger.log(productSoldsAggregateEntity.find());
}
