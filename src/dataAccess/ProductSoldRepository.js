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
    return Repository;
})();

//子クラス定義
var ProductSoldRepository = (function() {
    //クラス内定数

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

    }
    p.setValues = function(values) {
        this.values = values;
    }
    p.getValues = function() {
        return this.values;
    }
    return ProductSoldRepository;
})();

function testProductSoldRepository() {
    var productSoldRepository = new ProductSoldRepository();
    Logger.log(productSoldRepository.getValues());
}
