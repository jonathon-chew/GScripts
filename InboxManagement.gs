function InboxManagement() {
  var inbox_threads = GmailApp.getInboxThreads();
  var counter = 0;
  var today = new Date();
  var monthDeleteAllBefore = today.setMonth(today.getMonth()-1);
  today.setHours(0,0,0,0);
  var weekDeleteAllBefore = today.setDate(today.getDate()-7);
  today.setHours(0,0,0,0);

  const monthlyEmails = ['"Paul Tassi\'s God Rolls" <paultassi@substack.com>'] //add as many here as you want to delete a month
  const weeklyEmails = ["PlayStation <email@email.playstation.com>"] //add as many here as you want to delete a week
  const onlyReadMessages = ['Credit Karma <notifications@mail.creditkarma.co.uk>'] // extra protection if you only want to delete unread messages

  for(i = 0; i < inbox_threads.length; i++){
    var message = inbox_threads[i].getMessages();
    for (x = 0; x < message.length; x++){
      var sender = message[x].getFrom()
      var dateRecieved = message[x].getDate()
      
      if(monthlyEmails.includes(sender) && dateRecieved < monthDeleteAllBefore){
        if(onlyReadMessages.includes(sender) && message[x].isUnread()){
          counter += 1
          message[x].markRead();
          message[x].moveToTrash();
        }
      }else if(!onlyReadMessages.includes(sender)){
          counter += 1
          message[x].markRead();
          message[x].moveToTrash();
      }

      if( weeklyEmails.includes(sender) && dateRecieved < weekDeleteAllBefore){
        counter += 1
        message[x].markRead();
        message[x].moveToTrash();
      }
    }
  }
  console.log("Moved ", counter, "to the bin")
}

