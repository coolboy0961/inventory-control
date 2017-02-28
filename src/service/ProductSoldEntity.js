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
    var ProductSoldEntity = function() {
        if (!(this instanceof ProductSoldEntity)) {
            return new ProductSoldEntity();
        }
        this.init();
    }

    //継承関係設定
    Utility.inherits(ProductSoldEntity, Entity);
    var p = ProductSoldEntity.prototype;
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
    p.getLastUpdateTime = function() {
        return this.lastUpdateTime;
    }
    p.setLastUpdateTime = function(lastUpdateTime) {
        this.lastUpdateTime = lastUpdateTime;
    }
    return ProductSoldEntity;
})();

function testProductSoldEntity() {
    var productSoldEntity = new ProductSoldEntity();
    Logger.log(productSoldEntity.find());
}
