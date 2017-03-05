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
        this.productSoldRepository = new ProductSoldRepository();
        this.paymentSettlementRepository = new PaymentSettlementRepository();
        this.config = new ConfigRepository();
    }
    p.vaildateAll = function() {
        throw new Error('Not Implemented');
    }
    p.findAllProductSolds = function() {
        return this.productSoldRepository.valuesToEntities();
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
        var paymentSettlement = new PaymentSettlementEntity();
        var haveTarget = false;
        for (var key in productSolds) {
            if (productSolds.hasOwnProperty(key)) {
                if (Utility.isEmpty(productSolds[key].getAccountSettlementMonth()) && Utility.formatDateToMonth(productSolds[key].getLastUpdateTime()) == Utility.formatDateToMonth(new Date()) && productSolds[key].getIsPaid() == "否") {
                    paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[key].getItemCount() * productSolds[key].getItemUnitPriceJPY()));
                    paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[key].getDeliveryChargeJPY()));
                    paymentSettlement.setCostAmountJPY(paymentSettlement.getCostAmountJPY() + (productSolds[key].getDeliveryChargeCNY() * exchange));
                    paymentSettlement.setSalesAmountJPY(paymentSettlement.getSalesAmountJPY() + (productSolds[key].getItemCount() * (productSolds[key].getItemRetailPriceCNY() * exchange)));
                    haveTarget = true;
                }
            }
        }
        if (haveTarget) {
            paymentSettlement.setIncomeAmountJPY(paymentSettlement.getSalesAmountJPY() - paymentSettlement.getCostAmountJPY());
            paymentSettlement.setCostAmountCNY(paymentSettlement.getCostAmountJPY() / exchange);
            paymentSettlement.setIncomeAmountCNY(paymentSettlement.getIncomeAmountJPY() / exchange);
            paymentSettlement.setSalesAmountCNY(paymentSettlement.getSalesAmountJPY() / exchange);
            paymentSettlement.setExchange(exchange);
            paymentSettlement.put();
            paymentSettlement.putToDatastore();
        }
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
