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
    p.valuesToEntities = function() {
        throw new Error('Not Implemented');
    }
    p.putEntitiesToValues = function(entities) {
        throw new Error('Not Implemented');
    }
    p.putEntityToValues = function(entity) {
        throw new Error('Not Implemented');
    }
    p.putValuesToDatastore = function() {
        throw new Error('Not Implemented');
    }
    p.getInstance = function() {
        throw new Error('Not Implemented');
    }
    return Repository;
})();


//子クラス定義
var ConfigRepository = (function() {
    //クラス内定数
    var spreadsheetId = "1sznm0e9qyu7Yg_mbPsaPgJeXWxseM3xjvAPYXKoIvps";
    var sheetName = "config";
    var sheet = Utility.getSheetByIdAndName(spreadsheetId, sheetName);
    var firstRow = 2;
    var firstColumn = 1;
    var numberColumns = 1;
    var numberRows = 1;
    var exchangeRowNum = 1;
    var exchangeColumnNum = 1;
    //コンストラクタ
    var ConfigRepository = function() {
        if (!(this instanceof ConfigRepository)) {
            return new ConfigRepository();
        }
        this.init();
    }
    //継承関係設定
    Utility.inherits(ConfigRepository, Repository);
    //プロトタイプ内でメソッド定義
    var p = ConfigRepository.prototype;
    p.init = function() {
        this.values = sheet.getRange(firstRow, firstColumn, numberRows, numberColumns).getValues();
    }
    p.getExchange = function() {
        return this.values[exchangeRowNum - 1][exchangeColumnNum - 1];
    }

    //クラスメソッド定義
    ConfigRepository.instance = undefined;
    ConfigRepository.getInstance = function() {
        if (Utility.isEmpty(ConfigRepository.instance)) {
            ConfigRepository.instance = new ConfigRepository();
            return ConfigRepository.instance;
        } else {
            return ConfigRepository.instance;
        }
    }
    return ConfigRepository;
})();

function testConfigRepository() {
    var configRepository = ConfigRepository.getInstance();
    Logger.log(configRepository.getValues());
    configRepository.setValues(["a", "b", "c", "d"]);
    var configRepository2 = ConfigRepository.getInstance();
    Logger.log(configRepository2.getValues());
}
