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
