
//******************** ABOUT FILE ************************
///// THIS FILE INCLUDES THE SCRIPT THAT IS FIRST RAN IN THE MAIN PAGE, INDEX.HTML.
///// IT PULLS THE RECORDS OF THE SPECIFIED (in server) TABLE AND LISTS THEM IN INDEX.HTML
//    AS WELL AS THE SELECTED-RECORD, VIEW-RECORD, CREATE FORM, AND DELETE FUNCTIONS
//    PROVIDES CRUD FUNCTIONALITY.


///// FUNCTIONS INCLUDED IN FILE (in order):
//        - Anonymous function() -> calls /data from server
//        - Selected() -----------> modifies the selected-record div to exhibit the info
//                                  of the desired record.
//        - ViewItem()------------> retrieves the data of the item to be viewed. item to be viewed
//                                  is specified by hardcoding the record id as a parameter when the
//                                  ViewItem() is called in the section of the Anonymous function()
//                                  that deals with "VIEW RECORD".


//// FILES THAT CLIENT.JS MAKES USE OF
//        - RandomColor.js (client.js utilizes GenerateRandomColor())
//        - ChangeViews.js (client.js utilizes TakeToCardInfo() and TakeToNewRecordForm())
//        - AppearDelete.js (client.js utilizes AppearDeletes() and DisappearDeletes())


/////////////////////////////////////////////////////////////////////////////////////////////////


//***************************FUNCTIONS***************************************

//PROCEDURE:
//     Anonymous function() with JQuery -> calls /data
//PARAMETERS:
//    NONE
//PURPOSE:
//   Populates Index.html with the list of records of the specified table,
//   as well as the selected-record, view-record, delete, and create form components
//PRE-CONDITIONS:
//   1) User must be in the index.html view
//   2) There must be existing records in the table
//POST-CONDITONS:
//   The index.html view will be populated with the <div class="gallery-card"/>, one for
//   each record in the table. It will also inject a <button class="Delete-Button"/>
//   that can be used to delete records as well as a <button class="gallery-cardAdd"/> that
//   redirects users to NewRecord.html. Each of the <div class="gallery-card"/> will contain
//   a <button class="Gallery-Button"/> with the text "see more..." which when clicked
//  redirects the user to the About.html file.
$(function() {
  $.getJSON('/data', function(data){
    var $dataContainer = $('#data-container'); //$dataContainer = <main id="data-container"/>
    var $homepageHeader = $('#homepage-header'); //$homepageHeader = <header id="homepage-header"/>

    if (data.error){ //If there is an error, display it in the html of index.html
      $dataContainer.html("Error: " + data.error);
      return;
    }

    //Inject <button class="Delete-Button"/> in header
    $('<button class="Delete-Button" OnClick="AppearDeletes()" ondblclick="DisappearDeletes()"><span class="glyphicon glyphicon-trash icon-size"></span> </button>').appendTo($homepageHeader);


    $dataContainer.html(''); //empty the <main/>

    //*********************************************************************************//
    //**************THIS IS THE SECTION THAT DEALS WITH LISTING THE RECORDS  ***********//

    //For-loop processes each record
    data.records.forEach(function(record){

      var $galleryCard = $('<div class="gallery-card" />').attr({id: record.id,
                                                                 OnClick: "Selected(this.id)"}); //div to contain record
      $galleryCard.css("background-color", GenerateRandomColor()).appendTo($dataContainer);
      var $label =  $('<strong class="StrongClass" />').text(record.Name).appendTo($galleryCard); //record.Name can be replaced for whatever field you feel best identifies/characterizes the record

      $('<button class="Gallery-Button" OnClick="TakeToCardInfo(this.id)">See More..</button>').attr('id', record.id).appendTo($galleryCard);
    });

    //After Processing all records, we inject a <button class="gallery-cardAdd"/>
    var $galleryCardAdd = $('<button class="gallery-cardAdd" OnClick="TakeToNewRecordForm()"/>');
    var $shape = $('<div id="cross"/>');
    $shape.appendTo($galleryCardAdd);
    $dataContainer.append($galleryCardAdd);
    //******************** END OF SECTION THAT DEALS WITH LISTING RECORDS ***************//
    //***********************************************************************************//



    //*******************************************************************************************//
    //*************THIS IS THE SECTION THAT DEALS WITH THE SELECT RECORD ***********************//
    var $SelectedRecord = $('#selected-record').html('');

    var $TitleRowSelectedRecord = $('<div class="row"/>').appendTo($SelectedRecord);
    var $TitleColSelectedRecord = $('<div class="col-4"/>').css({"background-color": "blue",
                                                   "border-radius": "10px",
                                                   "text-align": "center",
                                                   "margin":"20px"}).appendTo($TitleRowSelectedRecord);

    $('<strong class="SelectedFont"/>').text("Selected Record: ").appendTo($TitleColSelectedRecord);

    var $FieldRowSelectedRecord = $('<div class="row justify-content-center"/>').appendTo($SelectedRecord);
    var $FieldColSelectedRecord = $('<div class="col-6" id="SelectedGallery"/>').appendTo($FieldRowSelectedRecord);

    for (i in data.records[0]){
      var $SubFieldRow = $('<div class="row"/>').appendTo($FieldColSelectedRecord);

      var $SubFieldRowNameColumn = $('<div class="col Cen"/>').css("background-color", "green").appendTo($SubFieldRow);
      $('<strong class="SelectedFont"/>').text(i + ': ').appendTo($SubFieldRowNameColumn);
      var $SubFieldRowDataColumn = $('<div class="col Cen SelectedField"/>').css("background-color", "orange").appendTo($SubFieldRow);
      $('<strong />').text(data.records[0][i]).attr("id", i).appendTo($SubFieldRowDataColumn);
    }
    //*************** END OF SECTION THAT DEALS WITH THE SELECT RECORD *************************//
    //*****************************************************************************************//




   //******************************************************************************************//
   //********** THIS IS THE SECTION THAT DEALS WITH THE VIEW RECORD **************************//
   var DesiredRecord = ViewItem(data,"recs791pm1zuV5ANl"); //Aquí se pone el ID del record que se desea ver
   var $ViewRecordSection = $('#view-record').html('');


   var $TitleRowViewSection = $('<div class="row"/>').appendTo($ViewRecordSection);
   var $TitleColViewSection = $('<div class="col-4"/>').css({"background-color": "pink",
                                                              "border-radius": "10px",
                                                              "text-align": "center",
                                                              "margin":"20px"}).appendTo($TitleRowViewSection);

   $('<strong class="SelectedFont"/>').text("View Record: ").appendTo($TitleColViewSection);

   var $FieldRowViewSection = $('<div class="row justify-content-center"/>').appendTo($ViewRecordSection);
   var $FieldColViewSection = $('<div class="col-6" id="ViewGallery"/>').appendTo($FieldRowViewSection);

   for (i in DesiredRecord){
     var $SubFieldRow = $('<div class="row"/>').appendTo($FieldColViewSection);

     var $SubFieldRow_NameCol = $('<div class="col Cen"/>').css("background-color", "Teal").appendTo($SubFieldRow);
     $('<strong class="SelectedFont"/>').text(i + ": ").appendTo($SubFieldRow_NameCol);
     var $SubFieldRow_DataCol = $('<div class="col Cen"/>').css("background-color","Aqua").appendTo($SubFieldRow);
     $('<strong />').text(DesiredRecord[i]).appendTo($SubFieldRow_DataCol);
   }
   //*************** END OF SECTION THAT DEALS WITH THE VIEW RECORD ***********************************//
   //**************************************************************************************************//



   //*************************************************************************************************//
   //***************** THIS IS THE SECTION THAT DEALS WITH THE CREATE FORM **************************//
   var DesiredFields = ["Notes", "Name", "BirthYear"] //En este array se ponen los fields deseados en el form
   var $CreateRecordSection = $('#create-record').html('');

   var $TitleRowCreateRecord = $('<div class="row"/>').appendTo($CreateRecordSection);
   var $TitleColCreateRecord =  $('<div class="col-4"/>').css({"background-color":"Tomato",
                                                             "border-radius": "10px",
                                                             "text-align": "center",
                                                             "margin":"20px"}).appendTo($TitleRowCreateRecord);
   $('<strong class="SelectedFont"/>').text("New Record: ").appendTo($TitleColCreateRecord);

   var $RowForForm = $('<div class="row justify-content-center"/>').appendTo($CreateRecordSection);
   var $ColForForm = $('<div class="col-6"/>').appendTo($RowForForm);

   var $form = $('<form/>').attr({id: "CreateFormGallery",action : "/CreateRecordObject", method: "GET"}).appendTo($ColForForm);

   for (i in DesiredFields){
     var $label = $('<strong/>').text(DesiredFields[i] + ": ").css("font-size", "x-large");
     $label.appendTo($form);
     $('<br>').appendTo($form);

     var $input = $('<input>').css({"height":"40px", "width": "300px", "font-size": "large"});
     $input.attr({name: DesiredFields[i], value: "", type: "text"}).appendTo($form);
     $('<br><br>').appendTo($form);
   }

   $('<input type="submit" value="submit">').appendTo($form);
   //********************* END OF SECTION THAT DEALS WITH CREATE FORM *****************************//
   //*********************************************************************************************//


  });
});


//PROCEDURE:
//    SELECTED(ID)
//PARAMETERS:
//    id, string, id of the record/gallery-card to be viewed,
//PURPOSE:
//    Takes in the id of the record/gallery-card to be Viewed.
//    Removes information that populates the "selected-record" div, makes
//    a call to the server to retrieve data of the desired record (specified by the id parameter)
//    and populates the "selected-record" div with the newly retrieved data.
//PRE-CONDITIONS
//    1) id must be a string
//    2) id must be of an existing record
//    3) at least one gallery-card with data must be present
//POST-CONDITIONS
//    The selected-record div will exhibit the information of the record whose id
//    matches the id passed in as a parameter.
function Selected(id){
  var $Body = $('body');
  var $Overlay = $('<div id="overlay"/>').appendTo($Body);
  $('<div class="loader"/>').appendTo($Overlay);

  $.getJSON('/ViewSelected?record=' + id, function(data){
    //Console.log("inside ViewSelected");
    $('.SelectedField').each(function(i, obj){
      var $Child = $(this).children()[0];

      if ($Child.id != 'id'){
        var $DataColumn = $('<strong/>').text(data.fields[$Child.id]).attr('id', $Child.id);
        $Child.remove();
        $(this).append($DataColumn);
      } else{
        var $DataColumn = $('<strong/>').text(data.id).attr('id', $Child.id);
        $Child.remove();
        $(this).append($DataColumn);
      }
    });

    $('#overlay').remove();
  });

}

//PROCEDURE:
//    ViewItem(data, recordID)
//PARAMETERS:
//   data, a json object that represents all the records
//   recordID, a string, represents id of record to be viewed
//PURPOSE:
//  return the record object whose ID matches the recordID parameter
//PRE-CONDITIONS:
//   1) data must be a json object will all the records in the airtable
//   2) data must contain a record whose ID matched recordID
//POST-CONDITIONS:
//   returns record with matched ID
function ViewItem(data, recordID){
  var DesiredRecord;
  data.records.forEach(function(record){
    if (record.id == recordID){
      DesiredRecord = record;
      return;
    }
  });

  return DesiredRecord;
}
