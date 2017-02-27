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
var ProductRepository = (function() {
    //クラス内定数

    //コンストラクタ
    var ProductRepository = function() {
        if (!(this instanceof ProductRepository)) {
            return new ProductRepository();
        }
        this.init();
    }
    //継承関係設定
    Utility.inherits(ProductRepository, Repository);
    //プロトタイプ内でメソッド定義
    var p = ProductRepository.prototype;
    p.init = function() {

    }
    p.setValues = function(values) {
        this.values = values;
    }
    p.getValues = function() {
        return this.values;
    }
    return ProductRepository;
})();

function testProductRepository() {
    var productRepository = new ProductRepository();
    Logger.log(productRepository.getValues());
}
