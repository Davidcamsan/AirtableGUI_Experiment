//THIS FILE IS DEVOTED TO THE DELETE FUNCTIONS. **NOT** To the <button class="Delete-Button"/>
//which calls these functions. The <button class="Delete-Button"/> can be found in the client.js
//script

//FUNCTIONS INCLUDED IN THIS FILE (in order):
//      - AppearDeletes()
//      - DisappearDeletes()
//      - DeleteRecordAction()


//PROCEDURE:
//     AppearDeletes()
//PARAMETERS:
//    NONE
//PURPOSE:
//   In the Index.html file, displays on the top-right corner of each record <div class="gallery-card"/>
//   a small circle <div> with an 'x' that serves as a delete button for its respective record.
//PRE-CONDITIONS:
//   1) There must be at least one <div class="gallery-card"/> in the index.html
//   2) The <button class="Delete-Button"/> needs to be included in the Index.html
//      and needs a single-click to call AppearDeletes().
//POST-CONDITONS:
//   A circle with an 'x' on the top-right corner of each <div class="gallery-card"/> in the Index.html
//   will be displayed and have the functionality to delete its respective record.
function AppearDeletes(){
  $('.gallery-card').each(function(i, obj){
    var $DeleteButton = $('<div class="circle" OnClick="DeleteRecordAction(this.id, event)"><span class="glyphicon glyphicon-remove icon-sizeB"></span></div>');
    $DeleteButton.attr('id', this.id);
    $DeleteButton.appendTo($(this));
  });
};


//PROCEDURE:
//     DisappearDeletes()
//PARAMETERS:
//    NONE
//PURPOSE:
//   In the Index.html file, removes any cirle with 'x' <div/> that were included with a previous
//   call to AppearDeletes();
//PRE-CONDITIONS:
//   1) A previous successful call to AppearDeletes() must have been made.
//   2) The <div class="circle"/> must be present at the time of invoking DisappearDeletes()
//   3) The <button class="Delete-Button"/> must be double clicked.
//POST-CONDITONS:
//   Any <div class="circle"/> in index.html will be removed
function DisappearDeletes(){
  $('.circle').remove();
};




//PROCEDURE:
//     DeleteRecordAction(id)
//PARAMETERS:
//    id, String
//    This is the ID of the record. It is attached to the Id of its respective <div class="circle"/>
//PURPOSE:
//   To delete the specified record from the AirTable table
//PRE-CONDITIONS:
//   1) The id parameter must match the id of the record to delete
//   2) To call this function, the user must first invoke AppearDeletes(), then single-click
//      on the <div class="circle"/> of the record to be deleted.
//POST-CONDITONS:
//   The specified record will be deleted.
function DeleteRecordAction(id, event){
  event.stopPropagation();
  var $dataContainer = $('#data-container');

  //To prevent user from clicking on multiple deletes and overloading server,
  //A loader and overlay are appended
  $('<div class="loader"/>').appendTo($dataContainer);
  $('<div id="overlay"/>').appendTo($dataContainer);

  //Call to server is made
  $.getJSON("/Delete" + "?RemoveRecord=" + id, function(data){

    if(data.error){
      $dataContainer.html('Error: '+ data.error);
      return;
    }

    //Find and remove the <div class="gallery-card"/>
    //whose ID matches the id of the specified to-delete record.
    $('.gallery-card').each(function(i, obj){
      if (this.id == id){
        $(this).remove();
      }

      //Once the record deletion is completed and the corresponding <div class="gallery-card"/>
      //removed, we remove the loader and the overlay so that the user can once again
      //interact with the interface.
      $('.loader').remove();
      $('#overlay').remove();


    });
  });
};
