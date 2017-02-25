var ProductRepository = (function() {
    //クラス内定数

    //コンストラクタ
    var ProductRepository = function() {
        if (!(this instanceof ProductRepository)) {
            return new ProductRepository();
        }
    }
    //継承関係設定
    Utility.inherits(ProductRepository, Repository);

    this.init();
    //プロトタイプ内でメソッド定義
    var v = ProductRepository.prototype;
    v.init = function() {

    }
    return ProductRepository;
})();

function testProductRepository() {
    var productRepository = new ProductRepository();
    Logger.log(productRepository.getName());
    Logger.log(productRepository.getColor());
}
