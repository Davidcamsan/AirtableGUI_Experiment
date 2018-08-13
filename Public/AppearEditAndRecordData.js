//THIS FILE INCLUDES THE FUNCTIONS USED IN THE About.html FILE.
//IT INCLUDES THE EDIT FUNCTIONS AND THE SCRIPT TO POPULATE THE
//ABOUT.html WITH THE DETAILED INFORMATION OF A RECORD



//FUNCTIONS IN THIS FILE (in order):
//    - Anonymous Function() -> calls /About1
//    - AppearEdits()
//    - DisappearEdits()


//Timer and Status are variables used in the Edit functions
// to differentiate between single-clicks and double-clicks
var timer;
var status = 1;



//PROCEDURE:
//     Anonymous function() with JQuery -> calls /About1
//PARAMETERS:
//    NONE
//PURPOSE:
//   Populates About.html with the detailed information of the specified record
//PRE-CONDITIONS:
//   1) User must be in the about.html view
//   2) the url location must include the record id as a query ie. http://d7a179ed.ngrok.io/About?user=recs791pm1zuV5ANl
//   3) record id must match an existing record id.
//POST-CONDITONS:
//   The about.html view will be populated with the detailed information of
//   the specified record. Each field of the record is presented as a
//  <div class="gallery-cardRecordData"/>
$(function() {
  $.getJSON('/About1' + location.search, function(data) {
    var $containerA = $('#containerA'); //$containerA is <main id="containerA"/>
    var $AboutHeader = $('#About-Header'); //$AboutHeader is <header id="About-Header"/>

    if(data.error){
      $containerA.html('Error! ' + data.error);
      return;
    }

    $containerA.html(''); //empty <main id="containerA"/>

    //Includes an Edit Button in the Header.
    $('<button class="Edit-Button" OnClick="AppearEdits()" ondblclick="DisappearEdits()"><span class="glyphicon glyphicon-pencil icon-sizeC"></span></button>').appendTo($AboutHeader);

    //For-loop processes each field
    for (i in data.fields){
      $GalleryCardRecordData = $('<div class="gallery-cardRecordData" />'); //div in which to store/display field data

      $RecordBanner = $('<div class="RecordBanner"/>'); //banner that goes atop field data. displays field title
      $RecordBanner.attr("id", i);
      $('<strong class="FieldTitle"/>').text(i).appendTo($RecordBanner);
      $RecordBanner.appendTo($GalleryCardRecordData);

      $ActualFieldData = $('<strong class="ActualFieldData">' + data.fields[i] + '</strong>').attr({ id: data.fields[i], name: i});

      $ActualFieldData.appendTo($GalleryCardRecordData);
      $containerA.append($GalleryCardRecordData);
    }

  })
});

//PROCEDURE:
//     AppearEdits()
//PARAMETERS:
//    NONE
//PURPOSE:
//   For each <div class="gallery-cardRecordData"> present in the About.html,
//   the <strong class="ActualFieldData"/> is replaced by a <form/> with a <input>
//   with attributes name: FieldName and Value: FieldValue. If FieldValue
//   is modified and the user presses submit, the record's field is updated
//  in the AirTable Table
//PRE-CONDITIONS:
//  1) User must single-click on the <button class="Edit-Button"/>
//  2) There must be at least one <div class="gallery-cardRecordData"/> present
//POST-CONDITONS:
//   The <strong class="ActualFieldData"/> of each <div class="gallery-cardRecordData"/>
//   present is replaced by a <form/> that allows the user to edit the respective field
//   of the record.
function AppearEdits(){

  $('.gallery-cardRecordData').each(function(i,obj){
    var FieldName = $(this).children()[0].id; //fieldName = RecordBanner.id
    var FieldValue = $(this).children()[1].id;// fieldValue = ActualFieldData.id
    var $ActualData = $(this).children()[1]; // $ActualData = <strong class="ActualFieldData"/>

    //Creating Form
    var $form = $('<form class="EditForm"></form>').attr({action:"/UpdateRecord", method: "GET", id: FieldValue});
    $input = $('<input>').attr({name: FieldName, value: FieldValue}).appendTo($form); //input that can be modified

    //This $inputRecord is used to "secretly" submit along with the form, the record's id
    //since, to send the update to AirTable, the record id is needed in addition to the fields
    //to update
    $inputRecord = $('<input>').attr({name:"record",value: /=(.*)$/.exec(location.search)[1]}); //extracting record id from location.search with regex
    $inputRecord.css("visibility","hidden").appendTo($form);
    $('<br>').appendTo($form);

    //Attaching submit button
    $('<input class="SubmitEdit-Button" type="submit" value="submit">').appendTo($form);

    //Removing <strong class="ActualFieldData"/>
    $ActualData.remove();

    //Adding the form to the html
    $(this).append($form);
  });
};



//PROCEDURE:
//     DisappearEdits()
//PARAMETERS:
//    NONE
//PURPOSE:
//  To replace all <form/> created with the AppearEdits() call from the
//  <div class="gallery-cardRecordData"/> present, with a <strong class="ActualFieldData"/>
//  that shows the current value of the respective field as stored in AirTable table.
//PRE-CONDITIONS:
//  1) User must have successfully single-clicked on the <button class="Edit-Button"/>
//     to activate a call to AppearEdits()
//  2) Must double-click the <button class="Edit-Button"/>
//POST-CONDITONS:
//   All <form/> in the <div class="gallery-cardRecordData"/> present are replaced
//   by a <strong class="ActualFieldData"/> that displays the current value for
//   its respective field as stored in AirTable table
function DisappearEdits(){
  clearTimeout(timer);
  status= 0;
  $('.EditForm').each(function(i,obj){
    $ActualFieldData = $('<strong class="ActualFieldData">' + $(this).children()[0].value + '</strong>');
    $ActualFieldData.attr("id", $(this).children()[0].value)
    $(this).replaceWith($ActualFieldData);
  });
}
