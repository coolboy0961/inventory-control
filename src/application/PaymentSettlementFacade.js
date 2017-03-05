var PaymentSettlementFacade = (function() {
    //クラス内定数

    //コンストラクタ
    var PaymentSettlementFacade = function() {
        if (!(this instanceof PaymentSettlementFacade)) {
            return new PaymentSettlementFacade();
        }
    }
    var p = PaymentSettlementFacade.prototype;
    //プロトタイプ内でメソッドを定義
    p.execute = function() {
        var productSoldsAggregateEntity = new ProductSoldsAggregateEntity();
        productSoldsAggregateEntity.accountSettlement();
    }

    return PaymentSettlementFacade;
})();
