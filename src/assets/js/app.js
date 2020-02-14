
$(document).ready(function(){
	$(".manage-notes").click(function(){
		$("#manageDropdown").fadeToggle();
	});

	/*$(".note-actions, addNote-field").click(function(){
		$("#actionsDropdown").fadeToggle();
	});*/

	$(".addNote").click(function(){
		$("#addNote-field").fadeToggle();
		$(".savedNote").toggle();
    $(".noteSearch").toggle();
	});
});
