function doGet() {
    return HtmlService
        .createTemplateFromFile('index')
        .evaluate();
}

function getData() {
    //var data =new Mail("mailType1", "to", "cc", "bcc", "title", "nameContent", "content");
    // list.push(new Mail("mailType1", "to", "cc", "bcc", "title", "nameContent", "content"));
    // list.push(new Mail("mailType2", "to", "cc", "bcc", "title", "nameContent", "content"));
    return "test string";
}
