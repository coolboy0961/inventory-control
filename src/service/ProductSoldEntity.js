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

function testEntity() {
    var entity = new Entity();
    Logger.log(entity.find());
}


var ProductSoldEntity = (function() {
    //クラス内定数

    //コンストラクタ
    var ProductSoldEntity = function(recordID, lastUpdateTime, accountSettlementMonth, productName, itemCount, itemUnitPriceJPY, deliveryChargeJPY, itemRetailPriceCNY, deliveryChargeCNY, isPaid) {
        if (!(this instanceof ProductSoldEntity)) {
            return new ProductSoldEntity(recordID, lastUpdateTime, accountSettlementMonth, productName, itemCount, itemUnitPriceJPY, deliveryChargeJPY, itemRetailPriceCNY, deliveryChargeCNY, isPaid);
        }
        this.recordID = recordID;
        this.lastUpdateTime = lastUpdateTime;
        this.accountSettlementMonth = accountSettlementMonth;
        this.productName = productName;
        this.itemCount = itemCount;
        this.itemUnitPriceJPY = itemUnitPriceJPY;
        this.deliveryChargeJPY = deliveryChargeJPY;
        this.itemRetailPriceCNY = itemRetailPriceCNY;
        this.deliveryChargeCNY = deliveryChargeCNY;
        this.isPaid = isPaid;
        this.init();
    }

    //継承関係設定
    Utility.inherits(ProductSoldEntity, Entity);
    var p = ProductSoldEntity.prototype;
    //プロトタイプ内でメソッド定義
    p.init = function() {

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
    p.getRecordID = function() {
        return this.recordID;
    }
    p.setRecordID = function(recordID) {
        this.recordID = recordID;
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
    p.getProductName = function() {
        return this.productName;
    }
    p.setProductName = function(productName) {
        this.productName = productName;
    }
    p.getItemCount = function() {
        return this.itemCount;
    }
    p.setItemCount = function(itemCount) {
        this.itemCount = itemCount;
    }
    p.getItemUnitPriceJPY = function() {
        return this.itemUnitPriceJPY;
    }
    p.setItemUnitPriceJPY = function(itemUnitPriceJPY) {
        this.itemUnitPriceJPY = itemUnitPriceJPY;
    }
    p.getDeliveryChargeJPY = function() {
        return this.deliveryChargeJPY;
    }
    p.setDeliveryChargeJPY = function(deliveryChargeJPY) {
        this.deliveryChargeJPY = deliveryChargeJPY;
    }
    p.getItemRetailPriceCny = function() {
        return this.itemRetailPriceCNY;
    }
    p.setItemRetailPriceCny = function(itemRetailPriceCNY) {
        this.itemRetailPriceCNY = itemRetailPriceCNY;
    }
    p.getDeliveryChargeCNY = function() {
        return this.deliveryChargeCNY
    }
    p.setDeliveryChargeCNY = function(deliveryChargeCNY) {
        this.deliveryChargeCNY = deliveryChargeCNY;
    }
    p.getIsPaid = function() {
        return this.isPaid;
    }
    p.setIsPaid = function(isPaid) {
        this.isPaid = isPaid;
    }
    return ProductSoldEntity;
})();

function testProductSoldEntity() {
    var productSoldEntity = new ProductSoldEntity();
    Logger.log(productSoldEntity.find());
}
