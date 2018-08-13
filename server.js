
var Access_token = 'keyWZWwp2PqupHKCf';

var AirTable = require('airtable');
var base = new AirTable({apiKey:Access_token}).base('appWNDqbqhrbxnhGp');
var TableName = 'UsersInfo';
var ViewName = 'Grid view';

var express = require('express');
var app = express();

app.use(express.static('Public'));



app.get('/ViewSelected', function(request, response){
  var rec = request.query.record;

  base(TableName).find(rec, function(error,record){
    if(error){
      response.send({error:error});
    }else{
      SelectedResponse={
        id : record['id'],
        fields: record['fields']
      };
      response.send(SelectedResponse);
    }
  });
});



//DEALING WITH DELETING RECORD
app.get('/Delete', function(request, response){
  console.log("inside Delete");
  var rec = request.query.RemoveRecord;
  base(TableName).destroy(rec, function(error, deletedRec){
    if(error){
      response.send({error: error});
    } else{response.send({success: 'success'});}
  });
});



//DEALING WITH NEW RECORD FORM PAGE

app.get('/NewRecord', function(request, response){
  response.sendFile(__dirname + '/views/NewRecord.html');
});

app.get('/GetFields', function(request, response){
  base(TableName).select({
    view: ViewName
  }).firstPage(function (error, records){
    if(error){
      response.send({error: error});
    } else{
      NResponse = {
        fields : Object.keys(records[0]['fields'])
      };

      response.send(NResponse);
    }
  });
});

app.get('/CreateRecordObject', function(request, response){
  var RecordToCreate = request.query;

  base(TableName).create(RecordToCreate,{typecast: true},
    function(error, record){
      if(error){
        response.send({error: error});
      }
      response.redirect('http://dccd862d.ngrok.io');
    });
});


app.get('/UpdateRecord', function(request,response){
  var RecordID = request.query['record'];
  var newQuer = Object.keys(request.query).reduce((object,key) =>{
    if (key !== 'record'){
      object[key] = request.query[key]
    }
    return object
  }, {})
  base(TableName).update(RecordID,newQuer,{typecast: true}, function(error,record){
    if (error){
      response.send({error:error});
    }
    else{
      response.redirect('http://dccd862d.ngrok.io/About?user=' + RecordID);
    }
  });
});




//DEALING WITH ABOUT PAGE

app.get('/About', function(request, response){
  response.sendFile(__dirname + '/views/About.html');
});

app.get('/About1', function(request, response){
  var user = request.query.user;
  base(TableName).find(user, function(error, record){
    if (error){
      response.send({error: error});
    }
    else{
      UResponse = {
        id : record['id'],
        fields : record['fields']
      };
      response.send(UResponse);
    }
  });
});

var cacheTimeoutMs = 5 * 1000;
var CResponse = null;
var CResponseDate = null;


////DEALING WITH MAIN PAGE

app.get('/', function(request, response){
  response.sendFile(__dirname + '/views/Index.html');
});


app.get('/data', function(_,response){
  if (CResponse && ((new Date() - CResponseDate) < cacheTimeoutMs)){
    response.send(CResponse);
  }
  else {
    base(TableName).select({
      view: ViewName
    }).firstPage(function (error,records){
      if(error){
        response.send({error: error});
      } else {
        //records.map(record => {
          //var rec = record['fields']
          //rec['id'] = record['id'];
          //console.log(rec);
        //})
        CResponse = {
          records: records.map(record => {
            var rec = record['fields']
            rec['id'] = record['id'];
            return rec;

            /*return {
              id: record['id'],
              name: record.get('Name'),
              notes: record.get('Notes'),
              birthyear: record.get('BirthYear'),
              age: record.get('Age')
            };*/
          }),
        };
        ///console.log(CResponse);
        CResponseDate = new Date();
        response.send(CResponse);
      }
    });
  }
});

var listener = app.listen(process.env.PORT || '3000', function(){
  console.log("Your app is listening to port " + listener.address().port);
});
