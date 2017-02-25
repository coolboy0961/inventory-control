var MailEntity = (function() {
    //クラス内定数

    //コンストラクタ
    var MailEntity = function(mailEntityType, to, cc, bcc, title, nameContent, content) {
        if (!(this instanceof MailEntity)) {
            return new MailEntity(mailEntityType, to, cc, bcc, title, nameContent, content);
        }
        this.mailEntityType = mailEntityType;
        this.to = to;
        this.cc = cc;
        this.bcc = bcc;
        this.title = title;
        this.nameContent = nameContent;
        this.content = content;
    }

    var p = MailEntity.prototype;
    //プロトタイプ内でメソッドを定義
    p.getTo = function() {
        return this.to;
    }
    p.getCc = function() {
        return this.cc;
    }
    p.getBcc = function() {
        return this.bcc;
    }
    p.getTitle = function() {
        return this.title;
    }
    p.getContent = function() {
        return this.content;
    }
    p.getMailEntityType = function() {
        return this.mailEntityType;
    }
    p.addTo = function(to) {
        if (this.to != "") {
            this.to += "," + to;
        } else this.to = to;
    }
    p.addCc = function(cc) {
        if (this.cc != "") {
            this.cc += "," + cc;
        } else this.cc = cc;
    }
    p.addBcc = function(bcc) {
        if (this.bcc != "") {
            this.bcc += "," + bcc;
        } else this.bcc = bcc;
    }
    p.setTitle = function(title) {
        this.title = title;
    }
    p.setContent = function(content) {
        this.content = content;
    }
    p.addNameToNameContent = function(name) {
        if (this.nameContent !== "") {
            this.nameContent += "、" + name + "さん";
        } else this.nameContent = name + "さん";
    }
    p.getNameContent = function() {
        return this.nameContent;
    }
    p.printLog = function() {
        Logger.log("mailEntityType:" + this.mailEntityType);
        Logger.log("cc:" + this.cc);
        Logger.log("to:" + this.to);
        Logger.log("bcc:" + this.bcc);
        Logger.log("title:" + this.title);
        Logger.log("name content:" + this.nameContent);
        Logger.log("content:" + this.content);
    }
    p.sendMailEntity = function() {
        MailEntityApp.sendEmailEntity(this.to, this.title, this.content, {
            cc: this.cc,
            bcc: this.bcc,
            noReply: true
        });
    }

    return MailEntity;
})();

function testMailEntity() {
    var mailEntity = new MailEntity("remaid", "to@gmailEntity.com", "cc@gmailEntity.com", "bcc@test.com", "test title", "", "test content");
    mailEntity.addTo("addTo@gmailEntity.com");
    mailEntity.addCc("addCc@gmailEntity.com");
    mailEntity.addNameToNameContent("陳佳冬");
    Logger.log(mailEntity.getMailEntityType());
    Logger.log(mailEntity.getTo());
    Logger.log(mailEntity.getCc());
    Logger.log(mailEntity.getBcc());
    Logger.log(mailEntity.getTitle());
    Logger.log(mailEntity.getContent());
    Logger.log(mailEntity.getNameContent());
}
