//THIS FILE IS THE SCRIPT THAT RUNS IMMEDIATELY WHEN ONE ENTERS THE NewRecord.html file
// IT CREATES THE <form/> Necessary to create the new record.

//PROCEDURE:
//    Anonymous Function() with JQuery
//PARAMETERS:
//    None
//PURPOSE:
//   Modifies the NewRecord.html file using JQuery to create a <form/> with
//   the necessary <input> tags to match the columns of AirTable table.
//PRE-CONDITIONS:
//   Make sure to manually specify which of the AirTable columns should not
//   be included in the <form/>. For example, columns which are of the
//   AirTable data type "formula" should not be included in the <form/>
//   since submitting a Create request to AirTable with an input directed to a
//   "formula" type field will return an error from AirTable.
//POST-CONDITONS:
//   NewRecord.html will be populated by a <form/> with the appropriate <input> tags
//   to create a new record in the desired airtable table.
$(function (){
  $.getJSON('/GetFields', function(data){// Makes '/GetFields' call to the server.
                                         // Server Returns 'data'

    var $FormContainer = $('#form-container'); //form-container is the id of the <main/> in
                                               // the NewRecord.html file

    if(data.error){ //if data includes error field, show it in NewRecord.html
      $FormContainer.html("Error: " + data.error);
      return;
    }

    $FormContainer.html(''); //Empty the <main/>

    //Start creating <form/>
    var $form = $('<form></form>');
    $form.attr({action : "/CreateRecordObject", method: "GET"})

    //This for loop decides and creates the <input> tags for the <form/>
    for (i in data.fields){
      if (data.fields[i] != 'Age') //THIS IS WHERE YOU FILTER THE COLUMNS THAT SHOULDN'T BE IN <FORM/>
      {
        var $label = $('<strong/>').text(data.fields[i] + ": ");
        $label.appendTo($form);
        $('<br>').appendTo($form);

        var $input = $('<input>');
        $input.attr({name: data.fields[i], value: "", type: "text"}).appendTo($form);
        $('<br><br>').appendTo($form);
      }
    }

    //Adding the submit button to <form/>
    $('<input type="submit" value="submit">').appendTo($form);


    //Appending the <form/> to the <main/>
    $FormContainer.append($form);
  });
});
