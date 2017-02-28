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

function testEntities() {
    var entities = new Entities();
    Logger.log(entities.find());
}
