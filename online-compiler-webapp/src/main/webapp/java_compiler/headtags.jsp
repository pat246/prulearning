<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Compile and Execute Java code Online</title>
<meta name="Description" content="Compile and Execute Java Online - Try and experience the best cloud computing where you can edit, compile, execute and share your varities of projects with the help of simple clicks. You can save your projects at Dropbox, GitHub, GoogleDrive and OneDrive to be accessed anywhere and any time. We support almost all the popular programming languages including Java, JSP, Cold Fusion, C, C++, Hadoop, PL/SQL, SQL, NumPy, SymPy, Octave, CentOS, iPython, Pascal, Fortran, PHP, Perl, Ruby, Python and many more other programming languages using your browsers, iPhones, iPads or any other online device like smart TV." />
<meta name="Keywords" content="Compile and Execute Java Online, compile, execute, programs, online, linux, experience, cloud, computing, source code, dropbox, googledrive, onedrive, programming, java, jsp, cold fusion, c, c++, pascal, fortran, php, perl, ruby, python, browsers, iphones, ipads, smart tv."/>
<link rel="shortcut icon" href="/images/favicon.ico" />
<script src="/js/jquery.min.js"></script>
<script src="/js/jquery.easyui.min.js"></script>
<script src="/js/ace.js" type="text/javascript" charset="utf-8"></script>
<script src="/js/spectrum.js"></script>
<!-- <link rel="stylesheet" type="text/css" href="/css/easyui.css"> -->
<link rel="stylesheet" type="text/css" href="/css/easyui_themes/bootstrap/easyui.css">
<link rel="stylesheet" type="text/css" href="/css/icon.css">
<link rel="stylesheet" type="text/css" href="/css/spectrum.css">
<link rel="stylesheet" type="text/css" href="/css/pl.css">
<script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
<script src="/js/term.js"></script>
<style>
.main-title{
    border-left: 1px solid #ccc;
    height: 17px;
    color: #FDFDFD;
    font-size: 100%;
    float: left;
    margin: 21px 5px 0px 5px;
    padding: 6px 0px 0px 5px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 4px;
}
#east a img:hover{
   opacity:0.5;
}
#east a img{
   padding-top:10px;
   padding-left:10px;
   width:80px !important;
   height:60px !important;
   
}
</style>
<script type="text/javascript">
var port = "3000";
var sessionid = '<%= (String)request.getSession(true).getId() %>';
var HOME="http://localhost";
var terminal="0";
var server="1";
</script>
<script src="/js/pl.js"></script>
<script src="http://www.google-analytics.com/urchin.js">
</script>
<script type="text/javascript">
_uacct = "UA-32077377-1";
urchinTracker();
</script>
<script type="text/javascript">
   function shutdown() {
      $.messager.defaults.ok = "Yes";
      $.messager.defaults.cancel = "No";
      $.messager.confirm('Confirmation','Do you really want to shut down the system?', function(r){
         if (r){
            // Make Ajax call to redirect to dropbox
            var url = HOME + ':'  + '8080' + '/shut_down?port=' + port + "&sessionid=" + sessionid;
            var inputs = {"hello":"bye"};
            $.ajax({
               type: "GET",
               url: url,
               data: inputs,
               dataType: 'json',
               beforeSend: function(  ) {
                  $("#loading").css({"visibility":"visible"});
               },
               success: function(data){
           }
            });
            window.onbeforeunload = null;
            $("#loading").css({"visibility":"hidden"});
            window.location = "'http://'+ window.location.hostname +':8080";
         }
      }).window({  width:400 }); 
   }
</script>