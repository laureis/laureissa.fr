var currentPage = "main_page";
var titleVisible = 1;

window.onload = function() {

	initialisation();
	navigation.start();
	document.onmousewheel=stop;
}

function initialisation() {

	currentPage = "main_page";
	titleVisible = 1;
	var ww = $(window).width();
	ww = ww - 440;
	var wh = $(window).height();
	wh = wh - 300;
	$('p').css("width",ww+"px");
	document.getElementById('console_resume').setAttribute("style","width:"+ww+"px;height:"+wh+"px");
	document.getElementById('console_projects').setAttribute("style","width:"+ww+"px;height:"+wh+"px");
	$("html , body").animate({
		scrollTop : $("#"+currentPage).offset().top
	},400);
	$("#input_resume").bind("keypress", {}, keypress_resume);
	$("#input_project").bind("keypress", {}, keypress_projects);
	changeTheme();
}

function hideTitle() {

	document.getElementById("name_title").style.display = "none";
}

function showTitle() {
	
	document.getElementById("name_title").style.display = "block";
}

function goUpDown() {

	document.addEventListener("keyup", function(e) {

		$("li.active").removeClass('active');
		if (e.which == 40) {
				
			if (currentPage == "main_page") {
				
				currentPage = "resume";
				hideTitle();
			}
			else if (currentPage == "resume") currentPage = "projects";
			ballAnimation();
		}
		
		if (e.which == 38) {
			
			if (currentPage == "resume") {
				
				showTitle();
				currentPage = "main_page";
			}
			else if (currentPage == "projects") currentPage = "resume";
			ballAnimation();
		}
		
		console.log(currentPage);
		$("html , body").animate({
			scrollTop : $("#"+currentPage).offset().top
		},400);
		titleAnimation();
		$("li."+currentPage).addClass('active');
	});
	
}

function ballAnimation() {
	

	$('#black').animate({top:'80%'},400);	
	$('#yellow').animate({top:'80%'},500);	
	$('#blue').animate({top:'80%'},600);
	$('#green').animate({top:'80%'},700);
	
	$('#black').animate({top:'90%'},400);
	$('#yellow').animate({top:'90%'},500);	
	$('#blue').animate({top:'90%'}, 600);
	$('#green').animate({top:'90%'},700);		
}

function titleAnimation() {
	
	var n;
	if ((currentPage == "main_page") && (titleVisible == false)) n = 2;
	if ((currentPage != "main_page") && (titleVisible == true)) n = 1;
	
	if (n == 1) {
			
		$('#main_title').animate({left:'-50%'},700);
		$('#main_title_2').animate({left:'-49%'},800);
		$('#main_title_3').animate({left:'-49.4%'},900);
		$('#main_title_4').animate({left:'-49.7%'},1000);
		$('#nm').animate({left:'150%'},700);
		$('#nm_2').animate({left:'149%'},800);
		$('#nm_3').animate({left:'149.4%'},900);
		$('#nm_4').animate({left:'149.7%'},1000);
		titleVisible = false;
	}
		
	if (n == 2) {
			
		$('#main_title').animate({left:'50%'},700);
		$('#main_title_2').animate({left:'49%'},800);
		$('#main_title_3').animate({left:'49.4%'},900);
		$('#main_title_4').animate({left:'49.7%'},1000);						
		$('#nm').animate({left:'50%'},700);
		$('#nm_2').animate({left:'49%'},800);
		$('#nm_3').animate({left:'49.4%'},900);
		$('#nm_4').animate({left:'49.7%'},1000);
		titleVisible = true;
	}
}

var id_resume = 0;

function keypress_resume(e) {
	
	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) { 				
		e.preventDefault();
		if (id_resume!=0) str='input_resume'+id_resume.toString();
		else str='input_resume';
		var reponse = document.getElementById(str).value;
		$("#"+str).prop('disabled', true);
		$("#"+str).prop('placeholder', reponse);
		var val = reponse;
		afficher_cv(val);
	}
}

function afficher_cv(val) {
	
	id_resume++;
	var color1 = Math.floor((Math.random() * 3) + 1);
	var sc1 = color1.toString();
	var strcolor1 = "color_"+sc1;
	
	var color2 = Math.floor((Math.random() * 3) + 1);
	while (color1 == color2) color2 = Math.floor((Math.random() * 3) + 1);
	var sc2 = color2.toString();
	var strcolor2 = "color_"+sc2;
	
	var console_resume = document.getElementById("console_resume");
	var titles_resume = [ "EDUCATION", "SKILLS" ];
	var str= "input_resume"+id_resume.toString();
	
	var extra = "";
	if (theme == 1) extra = "class = 'black_text'";
	val = val.toLowerCase();
	if ((val!="who are you?") && (val!="education") && (val!="skills")) console_resume.innerHTML+="<span class='"+strcolor1+"'>~/resume/ </span>"+randomAnswer()+"<br/>";
	else { 
	
		console_resume.innerHTML+="<span class='"+strcolor1+"'>~/resume/ </span> "+val+"<br/>";
		console_resume.innerHTML+=afficher_infos_cv(val);
	}
	console_resume.innerHTML+="<span class='"+strcolor2+"'>~/resume/ </span><input "+extra+"type='text' placeholder='type here' id='"+str+"'/><br />";
	$("#"+str).bind("keypress", {}, keypress_resume);
	$("#"+str).focus();	
	console_resume.scrollTop = console_resume.scrollHeight;
}

function afficher_infos_cv(id_resume) {

	if (id_resume=="who are you?") {
		var str = "<br /><br />I love combining arts and science.";
	}	
	if (id_resume=="education") {
		var str = "<table>";
		var dates = [ "2016 - today", "2014 - 2016", "june 2014" ];
		var titres = [ "IMAC engineering school", "DEUG MPCIE", "baccalauréat scientifique général"];
		var lieu = [ "image, multimédia, audiovisuel, communicaton", "computer science", "option SVT" ];
		var i;
		for (i=0; i<dates.length; i++) {
			
			str+="<tr>";
			str+="<td rowspan='2' class='color_"+(i+1)+"'>"+dates[i]+"</td>";
			str+="<td class='max'>"+titres[i]+"</td></tr>";
			str+="<tr><td class='max color_0'>"+lieu[i]+"</td>";
			str+="</tr>";
		}
		
		str+="</table>";
	}
	if (id_resume=="skills") {
		
		var titres = [ "programming", "graphic design" ];
		var graphisme = [ "photoshop", "indesign", "illustrator", "premiere", "after effects", "3D Studio Max", "", "", "", "", "","","","","","","","","","" ];
		var prog = [ "JAVA", "C++", "Ruby on Rails", "OpenGL", "GLSL", "HTML, CSS", "PHP, SQL", "JavaScript", "Processing", "Unity" ];
		var tab = [ prog, graphisme ];
		var i;
		var str="";
		for (i=0; i<titres.length; i++) {
		
			str+= "<table>";
			str+= "<th colspan='3' class='max color_"+(i+1)+"'>" +titres[i]+"</th><tr><td></td><td></td></tr>";
			for (var j=0; j<tab[i].length; j+=2) {
				
				str+= "<tr><td>";
				str+=(tab[i])[j];
				str+= "</td>";
				if (i==2) str+= "<td class='color_0'>";
				else str+="<td>";
				str+=(tab[i])[j+1];
				str+= "</td></tr>";
			}
			str+="</table>";
		}
	}
	return str+"<br /><br />";
}

function randomAnswer() {
	
	var answers = [ "oops... check if there's a typo!", "There was an error, type again!", "A typo maybe ?" ]
	var r = Math.floor((Math.random() * 3));
	return answers[r];
}

var id_project = 0;

function keypress_projects(e) {

	var code = (e.keyCode ? e.keyCode : e.which);
	if (code == 13) {
	
		e.preventDefault();
		if (id_project!=0) str='input_project'+id_project.toString();
		else str='input_project';
		$("#"+str).prop('disabled', true);
		if (id_project<8) {
				
			if (id_project == 0) $("#"+str).prop('placeholder', "here it is!");
			else $("#"+str).prop('placeholder', "here's more...");
			afficher_projets(id_project);
		}
		else $("#"+str).prop('placeholder', "nothing more to show!");
	}
}

function afficher_projets(val) {
	
	
	var color1 = Math.floor((Math.random() * 3) + 1);
	var sc1 = color1.toString();
	var strcolor1 = "color_"+sc1;
	
	var color2 = Math.floor((Math.random() * 3) + 1);
	while (color1 == color2) color2 = Math.floor((Math.random() * 3) + 1);
	var sc2 = color2.toString();
	var strcolor2 = "color_"+sc2;
	
	var console_projects = document.getElementById("console_projects");
	var i = id_project + 1;
	var str= "input_project"+i.toString();
	
	var extra = "";
	if (theme == 1) extra = "class = 'black_text'";
	console_projects.innerHTML+=afficher_infos_projets(val);
	console_projects.innerHTML+="<span class='"+strcolor2+"'>~/projects/ </span><input type='text' "+extra+" placeholder='press enter to see more projects' id='"+str+"'/><br />";
	$("#"+str).bind("keypress", {}, keypress_projects);
	$("#"+str).focus();	
	console_projects.scrollTop = console_projects.scrollHeight;
	id_project++;
	
}

function afficher_infos_projets(val) {
	
	var couleur = val+1;
	if (val+1>3) couleur = Math.floor((Math.random() * 3) + 1);
	var titre = [ "MAGMAN", "Beepiano", "Spotify Jingle",  "The Witness", "Tula" , "7 secondes", "The Challenger", "Mood'sic"];
	var type = [ "game", "console app", "3D", "game", "website", "short film", "website", "motion design"];
	var pro = [ "C++, OpenGL", "C++", "3D Studio Max", "JAVA", "HTML, CSS, JavaScript", "", "backend PHP/SQL", "after effects"];
	var description= [ "3D pacman game", "console piano application", "short jingle for Spotify", "minimalist game inspired by The Witness, mixing puzzles and mazes", "non official Tula's website","short film about chronophobia, it questions time and the way people deal with it ","social website where you can artistically challenge others", "fake ad of a streaming plateform that creates a music playlist depending on the user's mood" ];
	var date = [ "january 2018", "december 2017", "december 2017", "april 2016", "december 2016", "january 2017",  "march 2017", "june 2017" ];
	var links = [ "https://github.com/Davdouv/IMACMAN", "https://github.com/laureis/beepiano", "https://laureissa.fr/jingle/", "https://github.com/laureis/thewitness", "http://perso-etudiant.u-pem.fr/~lissa/tula", "http://youtu.be/24_541G6t00", "http://yorka-design.fr/thechallenger" ];
	var str = "<table><th colspan='3' class='color_"+couleur+"'>";
	str += titre[val]+"</th><tr class = 'color_0'><td>"+type[val]+"</td><td class='center'>"+pro[val]+"</td><td class='right'>"+date[val]+"</td></tr><tr><td colspan='3' class='justify'>"+description[val]+"</td></tr>"
	str +="<tr><td colspan='3' class='right'><a href='"+links[val]+"' target='_blank'>view</a></td></tr></table><br />";
	return str;
	
}

function stop() {
	
	return false;
}
		
var theme = 0;
function changeTheme() {
	
	var black_bg_div = [".console", "#black","input"];
	var black = document.getElementById('black');
	var i;
	black.addEventListener("click", function() {
		
		ballAnimation();
		if (theme == 0) {
			
			for (i=0; i<black_bg_div.length; i++) {
				
				$(black_bg_div[i]).css('background-color','#F2F2F2');
				$(black_bg_div[i]).css('color','black');
			}
				
			$('body').css('background-color','black');
			$('body').css('color','#F2F2F2');
			
			theme = 1;
		}
		
		else if (theme == 1) {
			
			for (i=0; i<black_bg_div.length; i++) {
				
				$(black_bg_div[i]).css('background-color','black');
				$(black_bg_div[i]).css('color','white');
			}
			
			$('body').css('background-color','#F2F2F2');
			$('body').css('color','black');
			
			theme = 0;
		}
	}, false);
	
}
	
function Navigation() {

	var me = this;
	var menus = document.getElementsByTagName("li");
	
	me.start = function() {
		
		goUpDown();
		for (var i = 0; i<menus.length; i++) {
	
			menus[i].addEventListener("click", function() {
				
				ballAnimation();
				$("li.active").removeClass('active');
				$(this).addClass('active');
				currentPage = $(this).attr('rel');
				
				console.log(currentPage);
				 $("html , body").animate({
					scrollTop : $('#'+currentPage).offset().top
				},400);
				
				titleAnimation();
				if (currentPage == "main_page") showTitle();
				else hideTitle();
			}, false);
		}
	}
}

var navigation = new Navigation();