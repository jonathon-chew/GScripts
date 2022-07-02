function DeleteOldJobEmails() {
  var inbox_threads = GmailApp.getInboxThreads();
  var counter = 0;
  var today = new Date();
  var deleteAllBefore = today.setMonth(today.getMonth()-1);
  today.setHours(0,0,0,0);

  for(i = 0; i < inbox_threads.length; i++){
    var message = inbox_threads[i].getMessages();
    for (x = 0; x < message.length; x++){
      var sender = message[x].getFrom()
      var dateRecieved = message[x].getDate()
      if(sender=="Indeed <alert@indeed.com>" && dateRecieved < deleteAllBefore){
        counter += 1
        //console.log(counter, sender, dateRecieved)
        message[x].moveToTrash();
      } 
    }
  }
  console.log("Moved ", counter, "to the bin")
}