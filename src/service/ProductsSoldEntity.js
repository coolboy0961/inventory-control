var ProductSoldsEntity = (function() {
    //クラス内定数

    //コンストラクタ
    var ProductSoldsEntity = function() {
        if (!(this instanceof ProductSoldsEntity)) {
            return new ProductSoldsEntity();
        }
        this.init();
    }
    var p = ProductSoldsEntity.prototype;
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
    return ProductSoldsEntity;
})();

function testProductSoldsEntity() {
    var productSoldsEntity = new ProductSoldsEntity();
    Logger.log(productSoldsEntity.find());
}
