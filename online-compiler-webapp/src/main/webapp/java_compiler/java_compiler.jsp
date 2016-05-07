<!DOCTYPE html>  
<html>  
<head>  
<%@include file="headtags.jsp" %>
</head>

<body class="easyui-layout" id="cc">
<div id="loading"></div>
<form id="ff">
<div id="sign" class="easyui-window" title="Coding Ground" data-options="iconCls:'icon-login',modal:true, maximizable:false, closed:true, minimizable:false" style="width:530px;height:475px;padding:10px;"></div>
<div id="dircontext" class="easyui-menu" style="width:150px;">
   <div onclick="newFile()" data-options="iconCls:'icon-add-file'">Create File</div>
   <div onclick="saveFiles( function( status ){ return true; })" data-options="iconCls:'icon-save-project'">Save Files</div>
   <div onclick="openFileUpload()" data-options="iconCls:'icon-upload-file'">Upload File</div>
   <div onclick="newDir()" data-options="iconCls:'icon-add-dir'">New Directory</div>
   <div onclick="deleteDir()" data-options="iconCls:'icon-delete-file'">Delete Directory</div>
   <div onclick="renameFile()" data-options="iconCls:'icon-rename-file'">Rename Directory</div>
   <div onclick="reloadTree()" data-options="iconCls:'icon-refresh-project'">Refresh Files</div>
</div>
<div id="filecontext" class="easyui-menu" style="width:150px;">
   <div onclick="loadFile(false, false)" data-options="iconCls:'icon-save-file'">Open File</div>
   <div onclick="saveFiles( function( status ){ return true; })" data-options="iconCls:'icon-save-project'">Save File</div>
   <div onclick="deleteFile()" data-options="iconCls:'icon-delete-file'">Delete File</div>
   <div onclick="renameFile()" data-options="iconCls:'icon-rename-file'">Rename File</div>
   <div onclick="downloadFile()" data-options="iconCls:'icon-download-file'">Download File</div>
   <div onclick="reloadTree()" data-options="iconCls:'icon-refresh-project'">Refresh Files</div>
</div>
<iframe id="download" style="display:hidden"></iframe>
 <div data-options="region:'north'" style="height:90px; width:100%;overflow:hidden;background:url(/images/grey_img_bg.png);">  
   <a href='http://www.tutorialspoint.com/codingground.htm'>
      <img src="/images/logo_pro.jpeg" style="padding:5px; float:left; margin-top: 0px; width:200px; height:76px"/>
   </a>
   <h1 class="main-title">The Java Compiler</h1>
 <div class="easyui-panel,border:false,doSize:false" style="margin:18px 0px 0px 0px; float:right;">
   <a id="help" href="#" class="easyui-linkbutton" data-options="iconCls:'icon-help', plain:true" style="float:right;color: white;">Help</a>
   <a id="shutdown" href="javascript:shutdown();" class="easyui-linkbutton" data-options="iconCls:'icon-exit', plain:true" style="float:right;color: white;">Shut Down</a>
   <a id="view" href="#" class="easyui-menubutton" data-options="menu:'#mm3',iconCls:'icon-view'" style="float:right;">View</a>
   <a id="edit" href="#" class="easyui-menubutton" data-options="menu:'#mm2',iconCls:'icon-edit'" style="float:right;">Edit</a>
   <a id="edit" href="#" class="easyui-menubutton" data-options="menu:'#mm1', iconCls:'icon-file'" style="float:right;">File</a>
   <a id="project" href="#" class="easyui-menubutton" data-options="menu:'#mm4', plain:true, iconCls:'icon-project'" style="float:right;">Project</a>
</div>
<div id="mm1" style="width:200px;">
   <div onclick="newFile()" data-options="iconCls:'icon-add-file'">Create File</div>
   <div onclick="saveFiles( function( status ){ return true; })" data-options="iconCls:'icon-save-project'">Save Files</div>
   <div onclick="deleteFile()" data-options="iconCls:'icon-delete-file'">Delete File</div>
   <div onclick="renameFile()" data-options="iconCls:'icon-rename-file'">Rename File</div>
   <div onclick="downloadFile()" data-options="iconCls:'icon-download-file'">Download File</div>
   <div onclick="openFileUpload()" data-options="iconCls:'icon-upload-file'">Upload File</div>
   <div class="menu-sep"></div>
   <div onclick="newDir()" data-options="iconCls:'icon-add-dir'">New Directory</div>
   <div onclick="deleteDir()" data-options="iconCls:'icon-delete-file'">Delete Directory</div>
   <div onclick="renameFile()" data-options="iconCls:'icon-rename-file'">Rename Directory</div>
</div>
<div id="mm2" style="width:200px;">
   <div id="undo" data-options="iconCls:'icon-undo'">Undo</div>
   <div id="redo" data-options="iconCls:'icon-redo'">Redo</div>
   <div class="menu-sep"></div>
   <div id="cut" data-options="iconCls:'icon-cut'">Cut</div>
   <div id="copy" data-options="iconCls:'icon-copy'">Copy</div>
   <div id="paste" data-options="iconCls:'icon-paste'">Paste</div>
   <div id="delete" data-options="iconCls:'icon-delete'">Delete</div>
   <div id="select" data-options="iconCls:'icon-select'">Select All</div>
   <div class="menu-sep"></div>
   <div id="find" data-options="iconCls:'icon-find'">Find</div>
   <div id="findreplace" data-options="iconCls:'icon-replace'">Find and Replace</div>
</div>
<div id="mm3" style="width:200px;">
   <div id="editor-theme" data-options="iconCls:'icon-editor-theme'"><span>Editor Theme</span>
           <div>
                <div onclick="setEditorTheme('chrome');">Chrome</div>
                <div onclick="setEditorTheme('crimson_editor');">Crimson Editor</div>
                <div onclick="setEditorTheme('dreamweaver');">Dreamweaver</div>
                <div onclick="setEditorTheme('eclipse');">Eclipse</div>
                <div onclick="setEditorTheme('github');">Github</div>
                <div onclick="setEditorTheme('kuroir');">Kuroir</div>
                <div onclick="setEditorTheme('solarized_light');">Solarized Light</div>
                <div onclick="setEditorTheme('solarized_dark');">Solarized Dark</div>
                <div onclick="setEditorTheme('xcode');">XCode</div>
                <div onclick="setEditorTheme('ambiance');">Ambiance</div>
                <div onclick="setEditorTheme('cobalt');">Cobalt</div>
                <div onclick="setEditorTheme('idle_fingers');">idle Fingers</div>
                <div onclick="setEditorTheme('kr_theme');">krTheme</div>
                <div onclick="setEditorTheme('mono_industrial');">Mono Industrial</div>
                <div onclick="setEditorTheme('monokai');">Monokai</div>
                <div onclick="setEditorTheme('terminal');">Terminal</div>
                <div onclick="setEditorTheme('textmate');">Textmate</div>
                <div onclick="setEditorTheme('tomorrow');">Tomorrow</div>
                <div onclick="setEditorTheme('twilight');">Twilight</div>
                <div onclick="setEditorTheme('vibrant_ink');">Vibrant Ink</div>
            </div>
   </div>
   <div id="font-size" data-options="iconCls:'icon-font-size'"><span>Font Size</span>
            <div>
                <div onclick="setEditorFontSize('8');">8px</div>
                <div onclick="setEditorFontSize('9');">9px</div>
                <div onclick="setEditorFontSize('10');">10px</div>
                <div onclick="setEditorFontSize('11');">11px</div>
                <div onclick="setEditorFontSize('12');">12px</div>
                <div onclick="setEditorFontSize('13');">13px</div>
                <div onclick="setEditorFontSize('14');">14px</div>
                <div onclick="setEditorFontSize('15');">15px</div>
                <div onclick="setEditorFontSize('16');">16px</div>
                <div onclick="setEditorFontSize('17');">17px</div>
                <div onclick="setEditorFontSize('18');">18px</div>
                <div onclick="setEditorFontSize('20');">20px</div>
                <div onclick="setEditorFontSize('22');">22px</div>
                <div onclick="setEditorFontSize('24');">24px</div>
            </div>
   </div>
   <div id="tab-size" data-options="iconCls:'icon-tab-size'"><span>Tab Size</span>
            <div>
                <div onclick="setEditorTabSize('1');">1</div>
                <div onclick="setEditorTabSize('2');">2</div>
                <div onclick="setEditorTabSize('3');">3</div>
                <div onclick="setEditorTabSize('4');">4</div>
                <div onclick="setEditorTabSize('5');">5</div>
                <div onclick="setEditorTabSize('6');">6</div>
                <div onclick="setEditorTabSize('7');">7</div>
                <div onclick="setEditorTabSize('8');">8</div>
            </div>
   </div>
   <div id="soft-wrap" data-options="iconCls:'icon-soft-wrap'"><span>Soft Wrap</span>
            <div>
                <div onclick="setEditorSoftWrap('true');">On</div>
                <div onclick="setEditorSoftWrap('false');">Off</div>
                <div onclick="setEditorSoftWrap('40');">40 Chars</div>
                <div onclick="setEditorSoftWrap('60');">60 Chars</div>
                <div onclick="setEditorSoftWrap('80');">80 Chars</div>
                <div onclick="setEditorSoftWrap('100');">100 Chars</div>
                <div onclick="setEditorSoftWrap('120');">120 Chars</div>
                <div onclick="setEditorSoftWrap('140');">140 Chars</div>
            </div>
   </div>
   <div class="menu-sep"></div>
   <div onclick="setEditorInvisible(true);"  data-options="iconCls:'icon-show-invisible'">Show Invisible</div>
   <div onclick="setEditorInvisible(false);" data-options="iconCls:'icon-hide-invisible'">Hide Invisible</div>
   <div class="menu-sep"></div>
   <div onclick="setEditorGutter(true);" data-options="iconCls:'icon-show-gutter'">Show Gutter</div>
   <div onclick="setEditorGutter(false);" data-options="iconCls:'icon-hide-gutter'">Hide Gutter</div>
</div>
<div id="mm4" style="width:200px;">
     <div onclick="createProject('http://'+ window.location.hostname +':8080')" data-options="iconCls:'icon-create-project'"><span>New Project</span>
     </div>
     <!--
     <div onclick="refreshProject();" data-options="iconCls:'icon-refresh-project'">Refresh Project</div>
-->
     <div onclick="renameProject();" data-options="iconCls:'icon-rename-file'">Rename Project</div>
     <div class="menu-sep"></div>
     <div class="menu-sep"></div>
     <div onclick="downloadProject()" data-options="iconCls:'icon-download-file'">Download Project</div>
     <div onclick="openUploadProject()"  data-options="iconCls:'icon-upload-file'">Upload Project</div>
     <!-- <div class="menu-sep"></div>
     <div class="menu-sep"></div>
     <div id="compileoptions" onclick="openCompileOptions()" data-options="iconCls:'icon-execute-project'">Compile Options</div> -->
    </div>
</div><!--HEADER ENDS -->

<div id="spectrum-tools" style="position:relative; display:none;">
  <input type='text' id="spectrum" />
</div>
<div id="terminal-tools" style="position:relative;">
   <a href="javascript:void(0);" onclick="setSpectrum()" class='icon-color'></a>
</div>
<div data-options="region:'east',onCollapse:doVertical, title:'Project',iconCls:'icon-project', split:true, tools: [{ iconCls:'icon-save-project', handler:function(){saveFiles( function( status ){ return true; } )} },{ iconCls:'icon-refresh-project', handler:function(){reloadTree()} },{ iconCls:'icon-add-file', handler:function(){newFile()} }]" style="width:250px;">
<ul id="home" class="easyui-tree" data-options="method:'GET', animate:true,lines:true">
<div id='treewait'>
<img style="margin-left:4px;margin-top:3px;width:28px; height:28px;" src='/images/loading.gif'/>
</div>
</ul>
</div>
<div id="south" data-options="region:'south', iconCls:'icon-terminal', split:true, tools:'#terminal-tools',title:'Console'" style="width:300px;mar"><!--FOOTER STARTS -->
      <div id="terminal" style="padding:0px; margin:0px;overflow:hidden;"></div>
</div><!--FOOTER ENDS -->
<div data-options="region:'center'" style="padding:0px;background:#eee;"><!--CODE AREA STARTS -->
<div data-options="fit:true,border:false,tools:'#tab-tools',toolPosition:'right'" id="codebox" class="easyui-tabs" style="width:55%;">
</div>
<div id="tab-tools" style="border-top:0px; border-right:0px;margin-right: 10px;	" >
<div id='wait' style='display:none'>
<img style="margin-left:4px;margin-top:3px;width:28px; height:28px;" src='/images/loading.gif'/>
</div>
<a href="javascript:void(0)" id="compile"  class="easyui-linkbutton" data-options="iconCls:'icon-compile-project'" style="white-space:nowrap;"><b>Compile</b></a>
<a href="javascript:void(0)" id="preview"  class="easyui-linkbutton" data-options="plain:true,iconCls:'icon-execute-project'" style="white-space:nowrap;"><b>Preview</b></a>
&nbsp;&nbsp;
<a href="javascript:void(0)" id="execute"  class="easyui-linkbutton" data-options="iconCls:'icon-run-project'" style="white-space:nowrap;"><b>Execute</b></a>
</div>
</div><!--CODE AREA STARTS -->
</body>
</html>

