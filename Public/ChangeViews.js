//THIS FILE IS FOR CHANGING THE VIEWS

//FUNCTIONS IN THIS FILE (in order):
//     - TakeToCardInfo()
//     - TakeToNewRecordForm()


//PROCEDURE:
//     TakeToCardInfo()
//PARAMETERS:
//    id, type: String
//      This is the ID of the Record the user Wishes to see.
//      It is attached to the "see more" button's id that exists in each
//      <div class= gallery-Card/> in the index.html file after the client script runs.
//PURPOSE:
//   Changes view from Index.html to the About.html file to present the detailed
//   information of the selected record.
//PRE-CONDITIONS:
//   id must match the id of a record already existing in the AirTable table.
//POST-CONDITONS:
//   The view will be the About.html file.
function TakeToCardInfo(id){
  $(window).attr("location", 'http://dccd862d.ngrok.io/About?user=' + id);
};


//PROCEDURE:
//     TakeToNewRecordForm()
//PARAMETERS:
//    None
//PURPOSE:
//   Changes view from Index.html to the NewRecord.html file.
//PRE-CONDITIONS:
//   None
//POST-CONDITONS:
//   The view will be the NewRecord.html file
function TakeToNewRecordForm(){
  $(window).attr("location", 'http://dccd862d.ngrok.io/NewRecord');
}
