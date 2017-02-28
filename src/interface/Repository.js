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
    p.entitiesToValues = function() {
        throw new Error('Not Implemented');
    }
    p.getInstance = function() {
        throw new Error('Not Implemented');
    }
    return Repository;
})();

function testRepository() {
    var repository = new Repository();
    Logger.log(repository.getValues());
}
