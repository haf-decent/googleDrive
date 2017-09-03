function checkEmail() {
  var unread = GmailApp.getInboxUnreadCount();
  if (unread > 0) {
    GmailApp.getInboxThreads(0,unread).forEach(function(x) {
      x.getMessages().forEach(function(m) {
        if (m.isUnread()) checkBody(m.getPlainBody());
      });
    });
  }
}

function checkBody(body) {
  //Check body of email for specific word or phrase
  //Do something if word or phrase is found
}
