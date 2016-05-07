var addthis_config = addthis_config || {};
addthis_config.data_track_addressbar = false;
addthis_config.data_track_clickback = false;
var editors = {};
var editor_theme = "crimson_editor";
//var editor_theme = "eclipse";
var editor_font_size = 14;
var editor_invisible = false;
var editor_gutter = true;
var editor_tab_size = 4;
var editor_type = "Java";
var editor_soft_wrap = "false";
var projecttitle = "New Project";
var loginstatus = false;
var terminal_color = '#084d11';
var terminal_mode = 'H';
var root;
var languageid;
var version;
var preview = "";
var ext;
var mainfile;
var mainmode;
var cmd_execute;
var cmd_compile;
var $win = null;
var term = null;
var nodeid;
var nodetext;
var nodetype;
var connected = false;
var timeout;
var retrycount;
var proxy_port = 8080;
const
RETRY_INTERVAL = 2000;
$(document)
		.ready(
				function() {
					window.onbeforeunload = function() {
						return "Leaving this page may cause loss of your code!";
					};
					$('#spectrum').spectrum(
							{
								color : terminal_color,
								showButtons : false,
								move : function(color) {
									terminal_color = color.toHexString();
									$('.terminal').css('background-color',
											color.toHexString());
									$('#terminal').css('background-color',
											color.toHexString());
									setCookie('terminal_color', color
											.toHexString());
								}
							});
					$('#terminal-color').spectrum(
							{
								color : terminal_color,
								showButtons : false,
								move : function(color) {
									terminal_color = color.toHexString();
									$('.terminal').css('background-color',
											color.toHexString());
									$('#terminal').css('background-color',
											color.toHexString());
									setCookie('terminal_color', color
											.toHexString());
								}
							});
					$(window).bind(
							'keydown',
							function(event) {
								if (event.ctrlKey || event.metaKey) {
									switch (String.fromCharCode(event.which)
											.toLowerCase()) {
									case 'd':
										event.preventDefault();
										alert('ctrl-D');
										break;
									case 's':
										event.preventDefault();
										alert('ctrl-s');
										break;
									case 'f':
										event.preventDefault();
										alert('ctrl-f');
										break;
									case 'g':
										event.preventDefault();
										alert('ctrl-g');
										break;
									}
								}
							});
					$(window)
							.load(
									function() {
										$("#home").css({
											"visibility" : "hidden"
										});
										var eh = $('#east').height();
										var sh = $('#south').height();
										var fh = 345;
										if (eh + sh + 50 - 520 < fh) {
											fh = eh + sh + 50 - 520;
										}
										if (terminal <= 0) {
											$("#cc").layout('panel', 'south')
													.panel('resize', {
														height : 265
													});
										} else if (terminal > 100) {
											$("#cc").layout('panel', 'south')
													.panel('resize', {
														height : 195
													});
										} else {
											$("#cc").layout('panel', 'south')
													.panel('resize', {
														height : 1
													});
											$("#cc").layout('collapse', 'west');
											$("#cc").layout('expand', 'west');
											$("#cc").layout('collapse', 'west');
										}
										$("#cc").layout('resize');
										var url = HOME + ":" + proxy_port
												+ "/api/init?port=" + port;
										var inputs = {
											'hello' : 'bye'
										};
										$
												.ajax({
													type : "GET",
													data : inputs,
													url : url,
													dataType : 'json',
													beforeSend : function() {
														$("#loading")
																.css(
																		{
																			"visibility" : "visible"
																		});
													},
													success : function(data) {
														root = data.root;
														ext = data.ext;
														preview = data.preview;
														languageid = data.languageid;
														mainfile = data.mainfile;
														mainmode = data.mainmode;
														$("#home")
																.css(
																		{
																			"visibility" : "visible"
																		});
														$('#preview').css(
																"display",
																"none");
														if (data.compile.length <= 0) {
															$('#compile').css(
																	"display",
																	"none");
															$('#separator')
																	.css(
																			"display",
																			"none");
															$('#execute')
																	.linkbutton(
																			{
																				iconCls : 'icon-execute-project'
																			});
														}
														if (data.preview.length > 0) {
															$('#cc')
																	.layout(
																			'panel',
																			'south')
																	.panel(
																			'setTitle',
																			"Web View");
															$('#terminal')
																	.css(
																			'background-color',
																			'#fff');
															$('#south')
																	.css(
																			'background-color',
																			'#fff');
															$('#compile').css(
																	"display",
																	"none");
															$('#compileoptions')
																	.css(
																			"display",
																			"none");
															$('#execute').css(
																	"display",
																	"none");
															$('#preview').css(
																	"display",
																	"block");
															if (languageid === "phpdb"
																	|| languageid === "perldb"
																	|| languageid === "pythondb"
																	|| languageid === "rubydb") {
																$('#cc')
																		.layout(
																				'panel',
																				'south')
																		.panel(
																				'setTitle',
																				"Result View");
																$('#preview')
																		.linkbutton(
																				{
																					text : 'Execute'
																				});
															}
															$('#separator')
																	.css(
																			"display",
																			"none");
														}
														if (languageid === "java-maven"
																|| languageid === "java8-maven") {
															addNewGoogleTab(
																	root,
																	mainfile,
																	false);
														} else if (terminal > 100) {
															addNewTab(root,
																	mainfile,
																	null,
																	mainmode);
															$('#south')
																	.css(
																			'background-color',
																			'#eee');
															$('#east')
																	.css(
																			'background-color',
																			'#aaa');
															$('#cc')
																	.layout(
																			'panel',
																			'south')
																	.panel(
																			'setTitle',
																			"");
														} else if (terminal <= 0) {
															addNewTab(root,
																	mainfile,
																	null,
																	mainmode);
														}
														$('#version')
																.html(
																		"("
																				+ data.version
																				+ ")");
														setProjectTitle(data.projecttitle);
														console
																.log("Got project title "
																		+ data.projecttitle);
													}
												});
										if (getCookie("editor_theme")) {
											editor_theme = getCookie("editor_theme");
										}
										if (getCookie("editor_type")) {
											editor_type = getCookie("editor_type");
										}
										if (getCookie("editor_font_size")) {
											editor_font_size = parseInt(getCookie("editor_font_size"));
											setEditorFontSize(editor_font_size);
										}
										if (getCookie("editor_soft_wrap")) {
											editor_soft_wrap = getCookie("editor_soft_wrap");
										}
										if (getCookie("editor_tab_size")) {
											editor_tab_size = parseInt(getCookie("editor_tab_size"));
										}
										if (getCookie("editor_invisible")
												&& getCookie("editor_invisible") !== 'false') {
											editor_invisible = getCookie("editor_invisible");
										}
										if (getCookie("editor_gutter")
												&& getCookie("editor_gutter") !== 'false') {
											editor_gutter = getCookie("editor_gutter");
										}
										if (getCookie("terminal_color")) {
											terminal_color = getCookie("terminal_color");
										}
										setTerminalMode("H");
										$("#cc").css({
											opacity : 1.0,
											visibility : "visible"
										});
										$("#loading").css({
											"visibility" : "hidden"
										});
										if (port > 0) {
											var socket = io.connect(HOME + ":"
													+ port + "/?port="
													+ port + "&sessionid="+ sessionid);
											socket
													.on(
															'connect',
															function() {
																connected = true;
																clearTimeout(timeout);
																socket
																		.emit(
																				'verify',
																				{
																					'sessionid' : sessionid,
																					'port' : port
																				});
																var fontsize = editor_font_size;
																term = new Terminal(
																		{
																			cols : 80,
																			rows : 24,
																			useStyle : true,
																			screenKeys : true,
																			cursorBlink : true
																		});
																$("#cc")
																		.css(
																				{
																					opacity : 1.0,
																					visibility : "visible"
																				});
																$("#compile")
																		.click(
																				function() {
																					saveFiles(function(
																							status) {
																						var command = "cmd-compile";
																						//$(term.element).html('');
																						socket
																								.emit(
																										'data',
																										{
																											'sessionid' : sessionid,
																											'command' : command
																										});
																						socket
																								.emit(
																										'data',
																										'\n');
																						term
																								.focus();
																						
																						return false;
																					});
																				});
																$("#execute")
																		.click(
																				function() {
																					saveFiles(function(
																							status) {
																						var command = "cmd-execute";
																						socket
																								.emit(
																										'data',
																										{
																											'sessionid' : sessionid,
																											'command' : command
																										});
																						socket
																								.emit(
																										'data',
																										'\n');
																						term
																								.focus();
																						return false;
																					});
																				});
																$("#preview")
																		.click(
																				function() {
																					if (languageid === "latex"
																							|| languageid === "tex") {
																						saveFiles(function(
																								status) {
																							$(
																									"#cc")
																									.layout(
																											'panel',
																											'east')
																									.panel(
																											{
																												href : HOME
																														+ ":"
																														+ proxy_port
																														+ "/web_view?port="
																														+ port,
																												extractor : function(
																														data) {
																													return data;
																												}
																											});
																						});
																					} else {
																						saveFiles(function(
																								status) {
																							$(
																									"#cc")
																									.layout(
																											'panel',
																											'south')
																									.panel(
																											{
																												href : HOME
																														+ ":"
																														+ proxy_port
																														+ "/web_view?port="
																														+ port,
																												extractor : function(
																														data) {
																													return data;
																												}
																											});
																						});
																					}
																				});
																$(
																		"#codingground")
																		.click(
																				function() {
																					saveFiles(function(
																							status) {
																						window.location = "http://www.tutorialspoint.com/codingground.htm";
																					});
																				});
																term
																		.on(
																				'data',
																				function(
																						data) {
																					socket
																							.emit(
																									'data',
																									data);
																				});
																term
																		.on(
																				'title',
																				function(
																						title) {
																					document.title = title;
																				});
																var resized = true;
																$("#cc")
																		.layout(
																				'panel',
																				'center')
																		.panel(
																				{
																					onResize : function(
																							w,
																							h) {
																						resized = true;
																					}
																				});
																setInterval(
																		function() {
																			if (resized) {
																				var termheight, termwidth;
																				if (document
																						.getElementById('terminal')) {
																					termheight = (document
																							.getElementById('terminal').clientHeight / term.element.offsetHeight);
																					termwidth = (document
																							.getElementById('terminal').clientWidth / term.element.offsetWidth);
																							termheight = termheight
																									* term.rows
																									| 0,
																							termwidth = termwidth
																									* term.cols
																									| 0,
																							term
																									.resize(
																											termwidth,
																											termheight),
																							typeof func === 'function'
																									&& func(
																											termwidth,
																											termheight);
																					term
																							.focus();
																				}
																				var url = HOME
																						+ ":"
																						+ proxy_port
																						+ "/resize?port="
																						+ port;
																				var inputs = {
																					'width' : termwidth,
																					'height' : termheight
																				};
																				$
																						.ajax({
																							type : "POST",
																							url : url,
																							data : inputs,
																							dataType : 'json',
																							success : function(
																									data) {
																							}
																						});
																				resized = false;
																			}
																		}, 800);
																term
																		.open(document
																				.getElementById("terminal"));
																if (getCookie("terminal_color")) {
																	terminal_color = getCookie("terminal_color");
																}
																setEditorFontSize(editor_font_size);
																socket
																		.on(
																				'data',
																				function(
																						data) {
																					term
																							.write(data);
																				});
																socket
																		.on(
																				'disconnect',
																				function() {
																					connected = false;
																					retrycount = 0;
																					term
																							.write('\x1b[1mDisconnected! Trying to reconnect with the server...\x1b[m\r\n');
																					retryConnectOnFailure(RETRY_INTERVAL);
																				});
																var retryConnectOnFailure = function(
																		retryInMilliseconds) {
																	timeout = setTimeout(
																			function() {
																				if (!connected) {
																					term
																							.write('\x1b[1mDisconnected! Trying to reconnect with the server...\x1b[m\r\n');
																					socket.socket
																							.reconnect();
																					retrycount++;
																					if (retrycount > 10) {
																						connected = true;
																						term
																								.destroy();
																						$(
																								"#terminal")
																								.html(
																										'<div class="expired-session"><p>Session Expired</p><a href="http://www.tutorialspoint.com/codingground.htm"><img src="http://codingground.tutorialspoint.com/home.png"/></a></div>');
																					}
																					retryConnectOnFailure(retryInMilliseconds);
																				}
																			},
																			retryInMilliseconds);
																}
																if (terminal > 0) {
																	terminal_color = '#2e3436';
																}
																$('#terminal')
																		.css(
																				'background-color',
																				terminal_color,
																				'!important');
																$('.terminal')
																		.css(
																				'background-color',
																				terminal_color,
																				'!important');
															});
										}
									});
					$("#cc").layout('panel', 'west').panel({
						onExpand : function() {
							reloadTree();
						}
					});
					$('#home')
							.tree(
									{
										url : HOME + ":" + proxy_port
												+ "/load_tree?port=" + port
												+ "&sessionid=" + sessionid,
										onContextMenu : function(e, node) {
											e.preventDefault();
											$('#home').tree('select',
													node.target);
											if (node.type === "F") {
												$('#filecontext').menu('show',
														{
															left : e.pageX,
															top : e.pageY
														});
											} else if (node.type === "D") {
												$('#dircontext').menu('show', {
													left : e.pageX,
													top : e.pageY
												});
											}
										},
										onExpand : function(node) {
											$(this).tree('select', node.target);
										},
										onCollapse : function(node) {
											$(this).tree('select', node.target);
										},
										onDblClick : function(node) {
											loadFile(node, false);
										},
										onBeforeEdit : function(node) {
											nodeid = node.id;
											nodetext = node.text;
											nodetype = node.type;
										},
										onAfterEdit : function(node) {
											if (/^[a-zA-Z0-9-_+@.?:=]*$/
													.test(node.text) == false) {
												$.messager
														.alert(
																'Message',
																'File name can have only these characters [a-zA-Z0-9-_+@.?:=]',
																'info');
												$('#home').tree('update', {
													target : node.target,
													text : nodetext
												});
												return false;
											} else if (!(node.text.length)
													&& nodetype === "F") {
												$.messager
														.alert(
																'Message',
																'File name can\'t be null',
																'info');
												$('#home').tree('update', {
													target : node.target,
													text : nodetext
												});
												return false;
											} else if (!(node.text.length)
													&& nodetype === "D") {
												$.messager
														.alert(
																'Message',
																'Directory name can\'t be null',
																'info');
												$('#home').tree('update', {
													target : node.target,
													text : nodetext
												});
												return false;
											}
											var index = node.id
													.lastIndexOf("/");
											var cwd = node.id.substring(0,
													index);
											var newid = cwd + "/" + node.text;
											var father = $('#home').tree(
													'getParent', node.target);
											var children = $('#home').tree(
													'getChildren',
													father.target);
											var retVal = true;
											$
													.each(
															children,
															function(i, n) {
																if (newid === n.id
																		&& nodeid !== newid) {
																	alert("A file with the same name already exists!");
																	$.messager
																			.alert(
																					'Message',
																					'A file with the same name already exists!',
																					'info');
																	retVal = false;
																}
															});
											if (!retVal) {
												$('#wait').hide();
												$('#home').tree('update', {
													target : node.target,
													text : nodetext
												});
												return false;
											}
											var url = HOME + ":" + proxy_port
													+ "/rename_file?port="
													+ port;
											var inputs = {
												"cwd" : cwd,
												"oldnode" : nodetext,
												"newnode" : node.text,
												"sessionid" : sessionid
											};
											$
													.ajax({
														type : "POST",
														url : url,
														data : inputs,
														dataType : 'json',
														beforeSend : function() {
															$("#loading")
																	.css(
																			{
																				"visibility" : "visible"
																			});
														},
														success : function(data) {
															if (data.status) {
																$.messager
																		.alert(
																				'Error Message',
																				data.message,
																				'error');
																$('#home')
																		.tree(
																				'update',
																				{
																					target : node.target,
																					text : nodetext
																				});
															} else {
																$('#home')
																		.tree(
																				'update',
																				{
																					target : node.target,
																					id : newid
																				});
																node.id = newid;
																refreshTab(
																		cwd,
																		nodetext,
																		node.text,
																		data.mode);
															}
															$("#loading")
																	.css(
																			{
																				"visibility" : "hidden"
																			});
														}
													});
										},
										onBeforeLoad : function(node, param) {
											$("#treewait").css({
												"visibility" : "visible"
											});
										},
										onLoadSuccess : function(node, data) {
											$("#treewait").css({
												"visibility" : "hidden"
											});
										}
									});
					$('#codebox')
							.tabs(
									{
										onBeforeClose : function(title, index) {
											if (deleting) {
												return true;
											}
											var target = this;
											var tab = $(target).tabs('getTab',
													index);
											var tabid = tab.panel('options').id;
											if (editors[tabid]) {
												if (!editors[tabid]
														.getSession()
														.getUndoManager()
														.isClean()) {
													$.messager.defaults.ok = "Save";
													$.messager.defaults.cancel = "No";
													$.messager
															.confirm(
																	'Confirmation',
																	'Do you want to save your changes for the file '
																			+ title,
																	function(r) {
																		if (r) {
																			saveFiles(function(
																					status) {
																				var opts = $(
																						target)
																						.tabs(
																								'options');
																				var bc = opts.onBeforeClose;
																				opts.onBeforeClose = function() {
																				};
																				$(
																						target)
																						.tabs(
																								'close',
																								index);
																				opts.onBeforeClose = bc;
																			});
																		} else {
																			var opts = $(
																					target)
																					.tabs(
																							'options');
																			var bc = opts.onBeforeClose;
																			opts.onBeforeClose = function() {
																			};
																			$(
																					target)
																					.tabs(
																							'close',
																							index);
																			opts.onBeforeClose = bc;
																		}
																	});
												} else {
													var opts = $(target).tabs(
															'options');
													var bc = opts.onBeforeClose;
													opts.onBeforeClose = function() {
													};
													$(target).tabs('close',
															index);
													opts.onBeforeClose = bc;
												}
											} else {
												var opts = $(target).tabs(
														'options');
												var bc = opts.onBeforeClose;
												opts.onBeforeClose = function() {
												};
												$(target).tabs('close', index);
												opts.onBeforeClose = bc;
											}
											return false;
										}
									});
					$('.keyboard li').click(function() {
						var $this = $(this);
						var html = $(this).html();
						var latex;
						var el = html.match(/(.*)MathJax-Element-(\d+)(.*)/);
						if (el) {
							var id = el[2];
							latex = $('#MathJax-Element-' + id).html();
						} else if (html.match(/Space/)) {
							latex = '\\:';
						} else if (html.match(/Quad/)) {
							latex = '\\quad';
						} else if (html.match(/Enter/)) {
							latex = '\\\\';
						}
						var tab = $('#codebox').tabs('getSelected');
						var tabid = tab.panel('options').id;
						var position = editors[tabid].getCursorPosition();
						editors[tabid].getSession().insert(position, latex);
					});
					$('#undo').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								if (editors[tabid].getSession()
										.getUndoManager().hasUndo()) {
									editors[tabid].getSession()
											.getUndoManager().undo(false);
								}
							});
					$('#redo').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								if (editors[tabid].getSession()
										.getUndoManager().hasRedo()) {
									editors[tabid].getSession()
											.getUndoManager().redo(false);
								}
							});
					var clipboard;
					$('#cut').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								var selectedRange = editors[tabid]
										.getSelectionRange();
								if (editors[tabid].getSession().getTextRange(
										selectedRange)) {
									clipboard = editors[tabid].getSession()
											.getTextRange(selectedRange);
									editors[tabid].getSession().remove(
											selectedRange);
								}
							});
					$('#delete').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								var selectedRange = editors[tabid]
										.getSelectionRange();
								if (editors[tabid].getSession().getTextRange(
										selectedRange)) {
									editors[tabid].getSession().remove(
											selectedRange);
								}
							});
					$('#copy').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								var selectedRange = editors[tabid]
										.getSelectionRange();
								if (editors[tabid].getSession().getTextRange(
										selectedRange)) {
									clipboard = editors[tabid].getSession()
											.getTextRange(selectedRange);
								}
							});
					$('#paste').click(
							function() {
								var tab = $('#codebox').tabs('getSelected');
								var tabid = tab.panel('options').id;
								var position = editors[tabid]
										.getCursorPosition();
								editors[tabid].getSession().insert(position,
										clipboard);
							});
					$('#select').click(function() {
						var tab = $('#codebox').tabs('getSelected');
						var tabid = tab.panel('options').id;
						editors[tabid].getSelection().selectAll();
					});
					$('#find').click(function() {
						var tab = $('#codebox').tabs('getSelected');
						var tabid = tab.panel('options').id;
						editors[tabid].execCommand("find");
					});
					$('#findreplace').click(function() {
						var tab = $('#codebox').tabs('getSelected');
						var tabid = tab.panel('options').id;
						editors[tabid].execCommand("replace");
					});
				});
function openFileUpload() {
	if ($("#cc").layout('panel', 'west').panel('options').collapsed) {
		$("#cc").layout('expand', 'west');
	}
	var selected = $('#home').tree('getSelected');
	if (selected) {
		if (selected.type !== 'D') {
			$.messager.alert('Alert Message',
					'Select a directory where file will be uploaded', 'info');
			return false;
		}
	} else {
		$.messager.alert('Alert Message',
				'Select a directory where file will be uploaded', 'info');
		return false;
	}
	$win = $('#sign').window({
		title : 'Upload File',
		iconCls : 'icon-upload-file',
		width : '650',
		height : '375'
	});
	$win.window('open');
	$('#sign').window('refresh',
			HOME + ":" + proxy_port + "/upload-file.htm?port=" + port);
}
function openShareProject() {
	saveFiles(function(status) {
		return true;
	});
	$win = $('#sign').window({
		title : 'Share Project',
		iconCls : 'icon-share-project',
		width : '675',
		height : '460'
	});
	$win.window('open');
	$('#sign').window('refresh',
			HOME + ":" + proxy_port + "/share-project.htm?port=" + port);
}
function openContact() {
	openWindow("http://www.tutorialspoint.com/contact.htm",
			"Contact Coding Ground", 675, 460);
}
function closeSign() {
	$('#sign').window('close');
	$win = null;
}
function openUploadProject() {
	$win = $('#sign').window({
		title : 'Upload project',
		iconCls : 'icon-upload-file',
		width : '650',
		height : '435'
	});
	$win.window('open');
	$('#sign').window('refresh',
			HOME + ":" + proxy_port + "/upload-project.htm?port=" + port);
}
function openCompileOptions() {
	$win = $('#sign').window({
		title : 'Compilation Options',
		iconCls : 'icon-execute-project',
		width : '550',
		height : '350'
	});
	$win.window('open');
	$('#sign').window('refresh',
			HOME + ":" + proxy_port + "/compile-options.htm?port=" + port);
}
function createProject(url) {
	$('#wait').show();
	window.location = url;
}
function reportError() {
	openWindow("http://www.tutorialspoint.com/reporterror.htm", "Report Error",
			1050, 650);
}
function saveAtDropbox() {
	openWindow(HOME + ":" + proxy_port + "/save_at_dropbox?port=" + port,
			"Save Project", 700, 500);
}
function saveAtGithub() {
	openWindow(HOME + ":" + proxy_port + "/save_at_github?port=" + port,
			"Save Project", 1050, 500);
}
function saveAtBox() {
	openWindow(HOME + ":" + proxy_port + "/save_at_box?port=" + port,
			"Save Project", 700, 500);
}
function saveAtGoogleDrive() {
	openWindow(HOME + ":" + proxy_port + "/save_at_googledrive?port=" + port,
			"Save Project", 700, 500);
}
function saveAtOneDrive() {
	openWindow(HOME + ":" + proxy_port + "/save_at_onedrive?port=" + port,
			"Save Project", 700, 500);
}
function listDropboxProjects() {
	openWindow(HOME + ":" + proxy_port + "/list_dropbox_projects?port=" + port,
			"Import Project", 700, 500);
}
function listGithubProjects() {
	openWindow(HOME + ":" + proxy_port + "/list_github_projects?port=" + port,
			"Import Project", 1050, 500);
}
function listBoxProjects() {
	openWindow(HOME + ":" + proxy_port + "/list_box_projects?port=" + port,
			"Import Project", 700, 500);
}
function listOneDriveProjects() {
	openWindow(
			HOME + ":" + proxy_port + "/list_onedrive_projects?port=" + port,
			"Import Project", 700, 500);
}
function listGoogleDriveProjects() {
	openWindow(HOME + ":" + proxy_port + "/list_googledrive_projects?port="
			+ port, "Import Project", 700, 500);
}
function refreshProject() {
	window.onbeforeunload = null;
	$("#loading").css({
		"visibility" : "visible"
	});
	window.location = "http://www.tutorialspoint.com/codingground/index.php?port="
			+ port + "&sessionid=" + sessionid + "&home=" + HOME;
}
function renameProject() {
	$.messager
			.prompt(
					'Change Project title',
					'Enter your project title:',
					function(title) {
						if (title) {
							if (/^[a-zA-Z0-9- ]*$/.test(title) == false) {
								$.messager.alert('Alert Message',
										'Project title should be plain text',
										'info');
								return false;
							} else if (title.length > 25) {
								$.messager
										.alert(
												'Alert Message',
												'Project title should be less than 25 characters',
												'info');
								return false;
							} else {
								projecttitle = title;
								setProjectTitle(title);
								var url = HOME + ":" + proxy_port
										+ "/rename_project?port=" + port;
								var inputs = {
									"projecttitle" : title
								};
								$.ajax({
									type : "POST",
									url : url,
									data : inputs,
									dataType : 'json',
									beforeSend : function() {
										$("#loading").css({
											"visibility" : "visible"
										});
									},
									success : function(data) {
										if (data.status) {
											$.messager.alert('Error Message',
													data.message, 'error');
										} else {
											$.messager.alert('Alert Message',
													data.message, 'info');
										}
										$("#loading").css({
											"visibility" : "hidden"
										});
									}
								});
							}
						}
					});
}
function setCookie(cname, cvalue) {
	var d = new Date();
	d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}
function getCookie(cname) {
	var cookies = document.cookie.split("; ");
	for (var i = 0; i < cookies.length; i++) {
		var cookie = cookies[i].split("=");
		if (cookie[0] === cname) {
			return unescape(cookie[1]);
		}
	}
	return null;
}
function openWindow(url, title, width, height) {
	var leftPosition, topPosition;
	leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
	topPosition = (window.screen.height / 2) - ((height / 2) + 50);
	window
			.open(
					url,
					title,
					"status=no,height="
							+ height
							+ ",width="
							+ width
							+ ",resizable=yes,left="
							+ leftPosition
							+ ",top="
							+ topPosition
							+ ",screenX="
							+ leftPosition
							+ ",screenY="
							+ topPosition
							+ ",toolbar=no,menubar=no,scrollbars=yes,location=no,directories=no");
}
function downloadFile() {
	var selected = $('#home').tree('getSelected');
	if (!selected) {
		$.messager.alert('Alert Message', 'Select a file to be downloaded',
				'info');
		return false;
	}
	if (selected.type !== 'F') {
		$.messager.alert('Alert Message', 'Select a file to be downloaded',
				'info');
		return false;
	}
	var index = selected.id.lastIndexOf("/");
	var cwd = selected.id.substring(0, index);
	var filename = selected.id.substring(index + 1, selected.id.length);
	var url = HOME + ":" + proxy_port + "/download_file?port=" + port + "&cwd="
			+ cwd + "&file=" + filename + "&sessionid=" + sessionid;
	$('#download').attr('src', url);
}
$('#download').load(function() {
	var response = $('#download').contents().find("html").text();
	$("#loading").css({
		"visibility" : "hidden"
	});
	if (response) {
		$.messager.alert('Alert Message', response, 'info');
	}
	return;
});
function downloadProject() {
	saveFiles(function(status) {
		return true;
	});
	var url = HOME + ":" + proxy_port + "/download_project" + '?port=' + port
			+ "&sessionid=" + sessionid;
	$('#download').attr('src', url);
}
function reloadTree() {
	projecttitle = getProjectTitle();
	$('#home').tree('reload');
}
function reloadTreeWB() {
	projecttitle = getProjectTitle();
	$('#home').tree({
		url : HOME + ":" + proxy_port + "/load_tree_wb?port=" + port
	});
}
function getFileTitle(cwd, filename) {
	var tabid = cwd + "/" + filename;
	var rootlen = root.length;
	var cwdlen = tabid.length;
	var filetitle = tabid.substring(rootlen + 1, cwdlen);
	return filetitle;
}
function getTabIndex(tabid) {
	var tabindex = -1;
	var tabs = $('#codebox').tabs('tabs');
	for (var i = 0; i < tabs.length; i++) {
		var tab = tabs[i];
		if (tab.panel('options').id === tabid) {
			tabindex = $('#codebox').tabs('getTabIndex', tab);
		}
	}
	return tabindex;
}
function addNewTab(cwd, filename, ifNew, mode) {
	var tabid = cwd + "/" + filename;
	var tabtitle = filename;
	var tabindex = getTabIndex(tabid);
	if ($('#codebox').tabs('exists', tabindex)) {
		$('#codebox').tabs('select', tabindex);
		return true;
	} else {
		var content;
		if (ifNew) {
			$('#codebox')
					.tabs(
							'add',
							{
								title : tabtitle,
								id : tabid,
								closable : true,
								href : HOME + ":" + proxy_port
										+ "/load_file?port=" + port,
								extractor : function(data) {
									return data;
								},
								onLoad : function(panel) {
									editors[tabid] = new ace.edit(tabid);
									editors[tabid].setTheme("ace/theme/"
											+ editor_theme);
									editors[tabid]
											.setFontSize(editor_font_size);
									editors[tabid].getSession().setTabSize(
											editor_tab_size);
									editors[tabid].getSession().setMode(
											"ace/mode/" + mode);
									editors[tabid]
											.setShowInvisibles(editor_invisible);
									editors[tabid].renderer
											.setShowGutter(editor_gutter);
									if (editor_type === "vim") {
										editors[tabid]
												.setKeyboardHandler(require("ace/keyboard/vim").handler);
									} else if (editor_type === "emacs") {
										editors[tabid]
												.setKeyboardHandler(require("ace/keyboard/emacs").handler);
									} else {
										editors[tabid].setKeyboardHandler(null);
									}
									if (editor_soft_wrap === "true") {
										editors[tabid].getSession()
												.setUseWrapMode(true);
									} else if (editor_soft_wrap === "false") {
										editors[tabid].getSession()
												.setUseWrapMode(false);
									} else {
										editors[tabid].getSession()
												.setUseWrapMode(true);
										editors[tabid]
												.getSession()
												.setWrapLimitRange(
														parseInt(editor_soft_wrap),
														parseInt(editor_soft_wrap));
									}
									editors[tabid].getSession().on('change',
											function() {
												editors[tabid].resize(true);
											});
									editors[tabid].focus();
								}
							});
		} else {
			$('#codebox')
					.tabs(
							'add',
							{
								title : tabtitle,
								id : tabid,
								closable : true,
								href : HOME + ":" + proxy_port
										+ "/load_file?port=" + port + '&id='
										+ tabid,
								extractor : function(data) {
									return data;
								},
								onLoad : function(panel) {
									editors[tabid] = new ace.edit(tabid);
									editors[tabid].setTheme("ace/theme/"
											+ editor_theme);
									editors[tabid]
											.setFontSize(editor_font_size);
									editors[tabid].getSession().setTabSize(
											editor_tab_size);
									editors[tabid].getSession().setMode(
											"ace/mode/" + mode);
									editors[tabid]
											.setShowInvisibles(editor_invisible);
									editors[tabid].renderer
											.setShowGutter(editor_gutter);
									if (editor_type === "vim") {
										editors[tabid]
												.setKeyboardHandler(require("ace/keyboard/vim").handler);
									} else if (editor_type === "emacs") {
										editors[tabid]
												.setKeyboardHandler(require("ace/keyboard/emacs").handler);
									} else {
										editors[tabid].setKeyboardHandler(null);
									}
									if (editor_soft_wrap === "true") {
										editors[tabid].getSession()
												.setUseWrapMode(true);
									} else if (editor_soft_wrap === "false") {
										editors[tabid].getSession()
												.setUseWrapMode(false);
									} else {
										editors[tabid].getSession()
												.setUseWrapMode(true);
										editors[tabid]
												.getSession()
												.setWrapLimitRange(
														parseInt(editor_soft_wrap),
														parseInt(editor_soft_wrap));
									}
									editors[tabid].getSession().on('change',
											function() {
												editors[tabid].resize(true);
											});
									editors[tabid].focus();
								}
							});
		}
	}
	return true;
}
function addNewGoogleTab(cwd, filename, ifNew) {
	var tabid = cwd + "/" + filename;
	var tabtitle = filename;
	var tabindex = getTabIndex(tabid);
	if ($('#codebox').tabs('exists', tabindex)) {
		$('#codebox').tabs('select', tabindex);
		return true;
	} else {
		var content;
		var url = HOME + ':' + port + tabid + "/?port=" + port;
		$('#codebox')
				.tabs(
						'add',
						{
							title : tabtitle,
							id : tabid,
							closable : true,
							href : HOME + ":" + proxy_port + "/load_file?port="
									+ port,
							extractor : function(data) {
								return '<iframe width="100%" height="100%" src="http://docs.google.com/viewer?url='
										+ url
										+ '&amp;embedded=true"  frameborder="0"></iframe>';
							}
						});
	}
	return true;
}
function addNewImageTab(cwd, filename, ifNew) {
	var tabid = cwd + "/" + filename;
	var tabtitle = filename;
	var tabindex = getTabIndex(tabid);
	if ($('#codebox').tabs('exists', tabindex)) {
		$('#codebox').tabs('select', tabindex);
		return true;
	} else {
		var content;
		var codebox_w = $('#codebox').width();
		var codebox_h = $('#codebox').height();
		var url = HOME + ':' + port + tabid + "/?port=" + port;
		$('#codebox').tabs(
				'add',
				{
					title : tabtitle,
					id : tabid,
					closable : true,
					href : HOME + ":" + proxy_port + "/load_file?port=" + port,
					extractor : function(data) {
						return '<iframe width="100%" height="100%" src=\"'
								+ url + '\" frameborder="0"></iframe>';
					}
				});
	}
	return true;
}
function refreshTab(cwd, oldfilename, newfilename, mode) {
	var newid = cwd + "/" + newfilename;
	var oldid = cwd + "/" + oldfilename;
	var oldtabtitle = oldfilename;
	var newtabtitle = newfilename;
	var newtabindex = getTabIndex(newid);
	var oldtabindex = getTabIndex(oldid);
	if ($('#codebox').tabs('exists', oldtabindex)) {
		var ctab = $('#codebox').tabs('getTab', oldtabindex);
		$('#codebox').tabs('update', {
			tab : ctab,
			options : {
				title : newtabtitle,
				id : newid,
				href : null
			}
		});
		if (editors[oldid]) {
			editors[oldid].destroy();
			var content = editors[oldid].getValue();
			delete editors[oldid];
			editors[newid] = new ace.edit(newid);
			editors[newid].setValue(content, -1);
			editors[newid].setTheme("ace/theme/" + editor_theme);
			editors[newid].setFontSize(editor_font_size);
			editors[newid].getSession().setTabSize(editor_tab_size);
			editors[newid].getSession().setMode("ace/mode/" + mode);
			if (editor_type === "vim") {
				editors[newid]
						.setKeyboardHandler(require("ace/keyboard/vim").handler);
			} else if (editor_type === "emacs") {
				editors[newid]
						.setKeyboardHandler(require("ace/keyboard/emacs").handler);
			} else {
				editors[newid].setKeyboardHandler(null);
			}
			if (editor_soft_wrap === "true") {
				editors[newid].getSession().setUseWrapMode(true);
			} else if (editor_soft_wrap === "false") {
				editors[newid].getSession().setUseWrapMode(false);
			} else {
				editors[newid].getSession().setUseWrapMode(true);
				editors[newid].getSession().setWrapLimitRange(
						parseInt(editor_soft_wrap), parseInt(editor_soft_wrap));
			}
			editors[newid].getSession().on('change', function() {
				editors[newid].resize(true);
			});
			editors[newid].resize(true);
			editors[newid].getSession().getUndoManager().dirtyCounter = 1;
			editors[newid].focus();
		}
	}
}
function saveFiles(callback) {
	var tobesaved = false;
	for ( var key in editors) {
		if (!editors[key].getSession().getUndoManager().isClean()) {
			tobesaved = true;
		}
	}
	if (!tobesaved) {
		callback(true);
	}
	for ( var key in editors) {
		if (!editors[key].getSession().getUndoManager().isClean()) {
			var filename = key;
			var content = editors[key].getValue();
			var url = HOME + ":" + proxy_port + "/save_file?port=" + port + "&sessionid=" + sessionid;
			var inputs = {
				"file" : filename,
				"content" : content
			};
			editors[key].getSession().getUndoManager().markClean();
			$.ajax({
				type : "POST",
				url : url,
				data : inputs,
				dataType : 'json',
				beforeSend : function() {
					$("#loading").css({
						"visibility" : "visible"
					});
				},
				success : function(data) {
					if (data.status) {
						$.messager
								.alert('Error Message', data.message, 'error');
					}
					$("#loading").css({
						"visibility" : "hidden"
					});
					callback(true);
				}
			});
		}
	}
}
function loadFile(node, bypass) {
	if (!node) {
		node = $('#home').tree('getSelected');
	}
	if (node.type === 'D') {
		return false;
	}
	var index = node.id.lastIndexOf("/");
	var cwd = node.id.substring(0, index);
	var filename = node.id.substring(index + 1, node.id.length);
	var inputs = {
		"cwd" : cwd,
		"file" : filename
	};
	var url = HOME + ":" + proxy_port + "/get_mime_type?port=" + port;
	$
			.ajax({
				type : "POST",
				url : url,
				data : inputs,
				dataType : 'json',
				beforeSend : function() {
					$("#loading").css({
						"visibility" : "visible"
					});
				},
				success : function(data) {
					if (!data.status && data.loadable === 'T'
							&& data.filetype === "text") {
						addNewTab(cwd, node.text, false, data.mode);
					} else if (!data.status && data.loadable === 'T'
							&& data.filetype === "google") {
						addNewGoogleTab(cwd, node.text, false);
					} else if (!data.status && data.loadable === 'T'
							&& data.filetype === "image") {
						addNewImageTab(cwd, node.text, false);
					} else if (!data.status && data.loadable === 'F' && !bypass) {
						$.messager.defaults.ok = "Yes";
						$.messager.defaults.cancel = "No";
						$.messager
								.confirm(
										'Confirmation',
										'File does not look editable, still you want to open it?',
										function(r) {
											if (r) {
												addNewTab(cwd, node.text,
														false, data.mode);
											}
										});
					} else if (data.status) {
						$.messager
								.alert('Error Message', data.message, 'error');
					}
					$('#home').tree('update', {
						target : node.target,
						iconCls : data.icon
					});
					$("#loading").css({
						"visibility" : "hidden"
					});
				}
			});
	return true;
}
var deleting = false;
function deleteFile() {
	var selected = $('#home').tree('getSelected');
	if (!selected || selected.type === 'D') {
		$.messager.alert('Message', 'Select a file to be deleted', 'info');
		return false;
	}
	var index = selected.id.lastIndexOf("/");
	var cwd = selected.id.substring(0, index);
	var filetitle = getFileTitle(cwd, selected.text);
	var filename = selected.id.substring(index + 1, selected.id.length);
	$.messager.defaults.ok = "Yes";
	$.messager.defaults.cancel = "No";
	$.messager.confirm('Confirmation', 'Do you really want to delete file '
			+ filetitle, function(r) {
		deleting = true;
		if (r) {
			var url = HOME + ":" + proxy_port + "/delete_file?port=" + port
					+ "&sessionid=" + sessionid;
			var inputs = {
				"cwd" : cwd,
				"file" : filename
			};
			$.ajax({
				type : "POST",
				url : url,
				data : inputs,
				dataType : 'json',
				beforeSend : function() {
					$("#loading").css({
						"visibility" : "visible"
					});
				},
				success : function(data) {
					if (data.status) {
						$.messager
								.alert('Error Message', data.message, 'error');
					} else {
						var tabid = cwd + "/" + filename;
						var tabindex = getTabIndex(tabid);
						if ($('#codebox').tabs('exists', tabindex)) {
							if (editors[selected.id]) {
								editors[selected.id].getSession()
										.getUndoManager().markClean();
							}
							$('#codebox').tabs('close', tabindex);
						}
						$('#home').tree('remove', selected.target);
					}
					$("#loading").css({
						"visibility" : "hidden"
					});
					deleting = false;
				}
			});
		}
	});
}
function deleteDir() {
	var selected = $('#home').tree('getSelected');
	var title = selected.text;
	if (!selected) {
		$.messager.alert("Select a file or directory to be deleted", "Info");
		return false;
	}
	var cwd = selected.id;
	var children = $('#home').tree('getChildren', selected.target);
	if (children.length > 0) {
		$.messager.alert('Message', title + ' directory is not empty', 'info');
		return false;
	}
	$.messager.defaults.ok = "Yes";
	$.messager.defaults.cancel = "No";
	$.messager.confirm('Confirmation',
			'Do you really want to delete directory ' + title, function(r) {
				if (r) {
					var url = HOME + ":" + proxy_port + "/delete_dir?port="
							+ port + "&sessionid=" + sessionid;
					var inputs = {
						"cwd" : cwd,
						"file" : title
					};
					var retVal = false;
					$.ajax({
						type : "POST",
						url : url,
						data : inputs,
						dataType : 'json',
						beforeSend : function() {
							$("#loading").css({
								"visibility" : "visible"
							});
						},
						success : function(data) {
							if (data.status) {
								$.messager.alert('Error Message', data.message,
										'error');
							} else {
								$('#home').tree('remove', selected.target);
							}
							$("#loading").css({
								"visibility" : "hidden"
							});
						}
					});
				}
			});
}
function renameFile() {
	if ($("#cc").layout('panel', 'west').panel('options').collapsed) {
		$("#cc").layout('expand', 'west');
	}
	var selected = $('#home').tree('getSelected');
	if (!selected) {
		$.messager.alert('Alert Message',
				'Select a file or directory to rename', 'info');
		return false;
	}
	$('#home').tree('beginEdit', selected.target);
	return true;
}
function newFile() {
	if ($("#cc").layout('panel', 'east').panel('options').collapsed) {
		$("#cc").layout('expand', 'east');
	}
	var selected = $('#home').tree('getSelected');
	$('#wait').show();
	if (!selected) {
		var toproot = $('#home').tree('getRoot');
		$('#home').tree('select', toproot.target);
		selected = $('#home').tree('getSelected');
	}
	$('#home').tree('expand', selected.target);
	if ($('#home').tree('isLeaf', selected.target) && selected.type !== "D") {
		var father = $('#home').tree('getParent', selected.target);
		$('#home').tree('select', father.target);
		selected = $('#home').tree('getSelected');
	}
	var children = $('#home').tree('getChildren', selected.target);
	var retVal = true;
	var cwd = selected.id;
	var filename = "Newfile." + ext;
	var newfile = cwd + "/" + filename;
	var count = 1;
	while (retVal) {
		$.each(children, function(index, node) {
			if (node.id === newfile) {
				filename = "Newfile(" + count + ")." + ext;
				newfile = cwd + "/" + filename;
				retVal = false;
				return false;
			}
		});
		if (!retVal) {
			retVal = true;
			count = count + 1;
			continue;
		} else {
			$('#wait').hide();
			break;
		}
	}
	var url = HOME + ":" + proxy_port + "/add_file?port=" + port
			+ "&sessionid=" + sessionid;
	var inputs = {
		"cwd" : cwd,
		"file" : filename
	};
	$.ajax({
		type : "POST",
		url : url,
		data : inputs,
		dataType : 'json',
		beforeSend : function() {
			$("#loading").css({
				"visibility" : "visible"
			});
		},
		success : function(data) {
			if (data.status) {
				$.messager.alert('Error Message', data.message, 'error');
			} else {
				$('#home').tree('append', {
					parent : selected.target,
					data : [ {
						id : newfile,
						type : 'F',
						text : filename
					} ]
				});
				var node = $('#home').tree('find', newfile);
				$('#home').tree('select', node.target);
				addNewTab(cwd, filename, true, "text");
			}
			$("#loading").css({
				"visibility" : "hidden"
			});
		}
	});
}
function newDir() {
	if ($("#cc").layout('panel', 'west').panel('options').collapsed) {
		$("#cc").layout('expand', 'west');
	}
	var selected = $('#home').tree('getSelected');
	$('#wait').show();
	if (!selected) {
		var toproot = $('#home').tree('getRoot');
		$('#home').tree('select', toproot.target);
		selected = $('#home').tree('getSelected');
	}
	$('#home').tree('expand', selected.target);
	if ($('#home').tree('isLeaf', selected.target) && selected.type !== "D") {
		var father = $('#home').tree('getParent', selected.target);
		$('#home').tree('select', father.target);
		selected = $('#home').tree('getSelected');
	}
	var children = $('#home').tree('getChildren', selected.target);
	var retVal = true;
	var cwd = selected.id;
	var dirname = "Newfolder"
	var newdir = cwd + "/" + dirname;
	var count = 1;
	while (retVal) {
		$.each(children, function(index, node) {
			if (node.id === newdir) {
				dirname = "Newfolder(" + count + ")";
				newdir = cwd + "/" + dirname;
				retVal = false;
				return false;
			}
		});
		if (!retVal) {
			retVal = true;
			count = count + 1;
			continue;
		} else {
			$('#wait').hide();
			break;
		}
	}
	var url = HOME + ":" + proxy_port + "/add_dir?port=" + port + "&sessionid="
			+ sessionid;
	var inputs = {
		"port" : port,
		"cwd" : cwd,
		"dir" : dirname
	};
	$.ajax({
		type : "POST",
		url : url,
		data : inputs,
		dataType : 'json',
		beforeSend : function() {
			$("#loading").css({
				"visibility" : "visible"
			});
		},
		success : function(data) {
			if (data.status) {
				$.messager.alert('Error Message', data.message, 'error');
			} else {
				$('#home').tree('append', {
					parent : selected.target,
					data : [ {
						iconCls : 'icon-folder',
						id : newdir,
						type : 'D',
						state : 'open',
						children : [],
						text : dirname
					} ]
				});
				var node = $('#home').tree('find', newdir);
				$('#home').tree('select', node.target);
			}
			$("#loading").css({
				"visibility" : "hidden"
			});
		}
	});
}
function setEditorTheme(theme) {
	editor_theme = theme;
	for ( var key in editors) {
		editors[key].setTheme("ace/theme/" + editor_theme);
	}
	setCookie("editor_theme", editor_theme);
}
function setEditorType(type) {
	editor_type = type;
	var handler;
	if (editor_type === "vim") {
		handler = require("ace/keyboard/vim").handler;
	}
	if (editor_type === "emacs") {
		handler = require("ace/keyboard/emacs").handler;
	}
	if (editor_type === "ace") {
		handler = null;
	}
	for ( var key in editors) {
		editors[key].setKeyboardHandler(handler);
	}
	setCookie("editor_type", editor_type);
}
function setEditorSoftWrap(mode) {
	editor_soft_wrap = mode;
	if (editor_soft_wrap === "true") {
		for ( var key in editors) {
			editors[key].getSession().setUseWrapMode(true);
		}
	} else if (editor_soft_wrap === "false") {
		for ( var key in editors) {
			editors[key].getSession().setUseWrapMode(false);
		}
	} else {
		for ( var key in editors) {
			editors[key].getSession().setUseWrapMode(true);
			editors[key].getSession().setWrapLimitRange(
					parseInt(editor_soft_wrap), parseInt(editor_soft_wrap));
		}
	}
	setCookie("editor_soft_wrap", editor_soft_wrap);
}
function setEditorFontSize(size) {
	editor_font_size = parseInt(size);
	for ( var key in editors) {
		editors[key].setFontSize(editor_font_size);
	}
	$('.terminal').css('font-size', editor_font_size);
	terminal_color = getCookie("terminal_color");
	if (terminal > 0) {
		terminal_color = '#2e3436';
	}
	$('.terminal').css('background-color', terminal_color);
	$('#terminal').css('background-color', terminal_color);
	if (term) {
		$('#terminal').css('background-color', terminal_color);
		$('.terminal').css('background-color', terminal_color);
		term.focus();
	}
	setCookie("editor_font_size", size);
}
function setEditorTabSize(size) {
	editor_tab_size = parseInt(size);
	for ( var key in editors) {
		editors[key].getSession().setTabSize(editor_tab_size);
	}
	setCookie("editor_tab_size", size);
}
function setEditorInvisible(flag) {
	editor_invisible = flag;
	for ( var key in editors) {
		editors[key].setShowInvisibles(flag);
	}
	setCookie("editor_invisible", flag);
}
function setEditorGutter(flag) {
	editor_gutter = flag;
	for ( var key in editors) {
		editors[key].renderer.setShowGutter(flag);
	}
	setCookie("editor_gutter", flag);
}
function setProjectTitle(title) {
	projecttitle = title;
	var west = $('#cc').layout('panel', 'west');
	west.panel('setTitle', projecttitle);
}
function getProjectTitle() {
	var url = HOME + ":" + proxy_port + "/api/get_project_title?port=" + port;
	var inputs = {
		'hello' : 'bye'
	};
	$.ajax({
		type : "GET",
		url : url,
		data : inputs,
		dataType : 'json',
		beforeSend : function() {
			$(".loading").css({
				"visibility" : "visible"
			});
		},
		success : function(data) {
			projecttitle = data.projecttitle;
			setProjectTitle(projecttitle);
		}
	});
}
function setSpectrum() {
	$('#spectrum').spectrum('toggle');
	var offset = $('.icon-color').offset();
	$('.sp-container').css('top', offset.top + 25);
	$('.sp-container').css('left', offset.left - 180);
}
function setTerminalMode(mode) {
	$('#spectrum').spectrum('hide');
	if (mode == terminal_mode) {
		return;
	}
}
doVertical = function() {
	var opts = $(this).panel('options');
	var layout = $(this).closest('.layout');
	var region = opts.region;
	var p = layout.layout('panel', 'expand' + region.substr(0, 1).toUpperCase()
			+ region.substr(1));
	var style = '';
	if (region == 'east' || region == 'west') {
		style = 'position:relative; top:5px; white-space:nowrap; font-size:14px; font-weight: bold;  transform:rotate(90deg);-ms-transform:rotate(90deg);-moz-transform:rotate(90deg);-webkit-transform:rotate(90deg);-o-transform:rotate(90deg);';
	}
	p.html('<div style="' + style + '">' + opts.title + '</div>');
}
