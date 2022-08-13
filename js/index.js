document.getElementById("btn1").addEventListener("click", function(e) {
	Tone.context.resume().then(() => {
		Tone.Transport.start("+0.1");
	});
	document.getElementById('title').remove()
});

Tone.Transport.bpm.value = 200;
Tone.Transport.loop = true;
Tone.Transport.loopEnd = "4m";

var chordsarray = [
	{ n1 : "C", n2 : "E", n3 : "G", dir : "u", scale : { s1 : 'CX', s2 : 'DX', s3 : 'EX', s4 : 'FX', s5 : 'GX', s6 : 'AY', s7 : 'BY', s8 : 'CY' } },
	{ n1 : "C#", n2 : "F", n3 : "G#", dir : "u", scale : { s1 : 'C#X', s2 : 'D#X', s3 : 'FX', s4 : 'F#X', s5 : 'G#X', s6 : 'A#X', s7 : 'CY', s8 : 'C#Y' }  },
	{ n1 : "D", n2 : "F#", n3 : "A", dir : "d1", scale : { s1 : 'DX', s2 : 'EX', s3 : 'F#X', s4 : 'GX', s5 : 'AX', s6 : 'BX', s7 : 'C#Y', s8 : 'DY' } },
	{ n1 : "D#", n2 : "G", n3 : "B#", dir : "d1", scale : { s1 : 'D#X', s2 : 'FX', s3 : 'GX', s4 : 'G#X', s5 : 'A#X', s6 : 'CY', s7 : 'DY', s8 : 'D#Y' } },
	{ n1 : "E", n2 : "G#", n3 : "B", dir : "d1", scale : { s1 : 'EX', s2 : 'F#X', s3 : 'G#X', s4 : 'AX', s5 : 'BX', s6 : 'C#Y', s7 : 'D#Y', s8 : 'EY' } },
	{ n1 : "F", n2 : "A", n3 : "C", dir : "d2", scale : { s1 : 'FX', s2 : 'GX', s3 : 'AX', s4 : 'A#X', s5 : 'CY', s6 : 'DY', s7 : 'EY', s8 : 'FY' } },
	{ n1 : "F#", n2 : "A#", n3 : "C#", dir : "d2", scale : { s1 : 'F#X', s2 : 'G#X', s3 : 'A#X', s4 : 'BX', s5 : 'C#Y', s6 : 'D#Y', s7 : 'FY', s8 : 'F#Y' } },
	{ n1 : "G", n2 : "B", n3 : "D", dir : "d2", scale : { s1 : 'GX', s2 : 'AX', s3 : 'BX', s4 : 'CY', s5 : 'DY', s6 : 'EY', s7 : 'F#Y', s8 : 'GY' } },
	{ n1 : "G#", n2 : "C", n3 : "D#", dir : "d2", scale : { s1 : 'G#X', s2 : 'A#X', s3 : 'CY', s4 : 'C#Y', s5 : 'D#Y', s6 : 'FY', s7 : 'GY', s8 : 'G#Y' } },
	{ n1 : "A", n2 : "C#", n3 : "E", dir : "u", scale : { s1 : 'AX', s2 : 'BX', s3 : 'C#Y', s4 : 'DY', s5 : 'EY', s6 : 'F#Y', s7 : 'G#Y', s8 : 'AY' } },
	{ n1 : "A#", n2 : "D", n3 : "F", dir : "u", scale : { s1 : 'A#X', s2 : 'CY', s3 : 'DY', s4 : 'D#Y', s5 : 'FY', s6 : 'GY', s7 : 'AY', s8 : 'A#Y' } },
	{ n1 : "B", n2 : "D#", n3 : "F#", dir : "u", scale : { s1 : 'BX', s2 : 'C#Y', s3 : 'D#Y', s4 : 'EY', s5 : 'F#Y', s6 : 'G#Y', s7 : 'A#Y', s8 : 'BY' } },
];

var rndNote = 0;
var rndPhil = 0;
var barcounter = 0;
var loopcounter = 0;

let bassviz = false;
let pianoviz = false;
let vibesviz = false;
let fluteviz = false;

Tone.Transport.schedule(function(time) {
	if (barcounter % 4 === 0) {
		piano.volume.rampTo(-Infinity, 0.01);
		piano2.volume.rampTo(-Infinity, 0.01);
		vibes.volume.rampTo(-Infinity, 0.01);
		flute.volume.rampTo(-Infinity,0.01);

		bassviz = false
		pianoviz = false
		vibesviz = false
		fluteviz = false	

		if (loopcounter != 4) {
			bass.volume.value = -1;
			tompart.start(0);
	    	hatpart.start(0);
			openhatpart.start(0);
			cymbalpart.start(0);
			kickpart.start(0);
			rimshotpart.start(0);
			snarepart.start(0);
			snare2part.start(0);
			kick2part.start(0);

			tomsolopart.stop();
			tom2solopart.stop();
			tom3solopart.stop();
			kicksolopart.stop();
			hatsolopart.stop();
			openhatsolopart.stop();
			snaresolopart.stop();
			snare2solopart.stop();
			rimshotsolopart.stop();
			cymbalsolopart.stop();

			bassviz = true;
		} else {
			bassviz = false;
		}

		Tone.Transport.schedule(function(time) {
			rndPhil = Math.floor(Math.random() * 4);
			bigphil();
		},'2m');


		if (loopcounter == 5) {
			loopcounter = 1;
		}

		console.log('LOOP COUNTER : ' + loopcounter);

		if (loopcounter == 0) {
			console.log('Just Bass...')
			Tone.Draw.schedule(function(){
				drawText('Bass');
			}, time)
		}
		if (loopcounter == 1) {
			redonotes('piano')
			pianoviz = true
			Tone.Draw.schedule(function(){
				drawText('Piano');
			}, time)
		}
		if (loopcounter == 2) {
			redonotes('flute')
			fluteviz = true
			Tone.Draw.schedule(function(){
				drawText('Flute');
			}, time)
		}
		if (loopcounter == 3) {
			redonotes('vibes')
			vibesviz = true
			Tone.Draw.schedule(function(){
				drawText('Vibes');
			}, time)
		}
		if (loopcounter == 4) {
			redonotes('drums')
			Tone.Draw.schedule(function(){
				drawText('Drums');
			}, time)
		}
		
		loopcounter++;
	}

	rndNote = Math.floor(Math.random() * 12);
	barcounter++;

	Tone.Draw.schedule(function(){
		$('section#photos').children().remove()
	}, time)
},0);


this.bass = new Tone.Sampler({
	"A1" : "bass_A1.wav",
}, { 'baseUrl': 'instruments/', }).toMaster();

var basspart = new Tone.Part(function(time, note){
	bass.triggerAttackRelease((chordsarray[rndNote].scale[note.noteNum]).replace('X','1').replace('Y','2').replace('Z','3'), time);
	Tone.Draw.schedule(function(){
		if (bassviz == true) {
			drawathing('bass',note)
		}
	}, time);
}, [
	{
		"time": "0",
		"noteNum": 's1',
	},
	{
		"time": "4n",
		"noteNum": 's2',
	},
	{
		"time": "2n",
		"noteNum": 's3',
	},
	{
		"time": "2n + 4n",
		"noteNum": 's4',
	},
	{
		"time": "1m",
		"noteNum": 's5',
	},
	{
		"time": "1m + 4n",
		"noteNum": 's4',
	},
	{
		"time": "1m + 2n",
		"noteNum": 's3',
	},
	{
		"time": "1m + 2n + 4n",
		"noteNum": 's2',
	},
]).start(0);
basspart.loop = true;
basspart.loopEnd = "2m";

//Sax
/*
this.sax = new Tone.Sampler({
	"C#3" : "sax_Csharp3.wav",
}, { 'baseUrl': 'instruments/', }).toMaster();
sax.volume.value = -Infinity;
var saxpart = new Tone.Part(function(time, note){
	sax.triggerAttackRelease((chordsarray[rndNote].scale[note.noteNum]).replace('X','2').replace('Y','3').replace('Z','4'), note.duration, time);
}, [
	{
		"time": "0",
		"noteNum": 's1',
		'duration': '1m'
	},
	{
		"time": "1m",
		"noteNum": 's2',
		'duration': '1m'
	},
	{
		"time": "2m",
		"noteNum": 's5',
		'duration': '2n'
	},
	{
		"time": "2m + 2n",
		"noteNum": 's1',
		'duration': '2n'
	},
	{
		"time": "3m",
		"noteNum": 's2',
		'duration': '2n'
	},
	{
		"time": "3m + 2n",
		"noteNum": 's3',
		'duration': '2n'
	},
]).start(0);
saxpart.loop = true;
saxpart.loopEnd = "4m";
*/


//piano notes
this.piano2 = new Tone.Sampler({
	"C5" : "pianoC5.wav",
}, { 'baseUrl': 'instruments/', }).toMaster();


var pianopart = new Tone.Part(function(time, note){
	piano2.triggerAttackRelease((chordsarray[rndNote].scale[note.noteNum]).replace('X','4').replace('Y','5').replace('Z','6'), '4n', time);
	Tone.Draw.schedule(function(){
		if (pianoviz == true) {
			drawathing('piano',note)
		}
	}, time)
}, [
	{
		"time": "2m",
		"noteNum": 's6',
	}
]).start(0);
pianopart.loop = true;
pianopart.loopEnd = "4m";



//piano chord
this.piano = new Tone.Sampler({
	"C4" : "pianoC4.mp3",
}, { 'baseUrl': 'instruments/', }).toMaster();

var chordpart = new Tone.Part(function(time, note){
	piano.triggerAttackRelease(chordsarray[rndNote].n1 + '3', '2m', time, note.velocity);
	piano.triggerAttackRelease(chordsarray[rndNote].n2 + '3', '2m', time, note.velocity);
	piano.triggerAttackRelease(chordsarray[rndNote].n3 + '3', '2m', time, note.velocity);
	Tone.Draw.schedule(function(){
		if (pianoviz == true) {
			drawathing('chord')
		}
	}, time);
}, [
	{
		"time": "0",
		"velocity": "0.6",
	}
]).start(0);
chordpart.loop = true;
chordpart.loopEnd = "4m";



//flute
this.flute = new Tone.Sampler({
	//"A3" : "t_a3.wav",
	//"A#4" : "t_asharp4.wav",
	"D2" : "flute.wav",
}, { 'baseUrl': 'instruments/', }).toMaster();

var flutepart = new Tone.Part(function(time, note){
	flute.triggerAttackRelease((chordsarray[rndNote].scale[note.noteNum]).replace('X','1').replace('Y','2').replace('Z','3'), note.duration, time);
	Tone.Draw.schedule(function(){
		if (fluteviz == true) {
			drawathing('flute',note)
		}
	}, time);
}, [
	{
		"time": "8n",
		"noteNum": 's3',
		'duration' : '8n'
	},
	{
		"time": "4n",
		"noteNum": 's5',
		'duration' : '8n'
	},
	{
		"time": "4n + 8n",
		"noteNum": 's7',
		'duration' : '8n'
	},
	{
		"time": "2n",
		"noteNum": 's8',
		'duration' : '8n'
	},
	{
		"time": "2n + 8n",
		"noteNum": 's6',
		'duration' : '8n'
	},
	{
		"time": "2n + 4n",
		"noteNum": 's4',
		'duration' : '8n'
	},
	{
		"time": "2n + 4n + 8n",
		"noteNum": 's2',
		'duration' : '8n'
	},
]).start(0);
flutepart.loop = true;
flutepart.loopEnd = "1m";

//vibes
this.vibes = new Tone.Sampler({
	"F4" : "vibes_F4.wav",
}, { 'baseUrl': 'instruments/', }).toMaster();

var vibespart = new Tone.Part(function(time, note){
	vibes.triggerAttackRelease((chordsarray[rndNote].scale[note.noteNum]).replace('X','4').replace('Y','5').replace('Z','6'), note.duration, time);
	Tone.Draw.schedule(function(){
		if (vibesviz == true) {
			drawathing('vibes',note)
		}
	}, time);
}, [
	{
		"time": "4n",
		"noteNum": 's1',
		'duration': '2n'
	}
]).start(0);
vibespart.loop = true;
vibespart.loopEnd = "4m";
vibes.volume.value = -3;





//DRUMS//
var openhat = new Tone.Player("instruments/openhat.wav").toMaster();
var openhatpart = new Tone.Part(function(time, note){
	openhat.start(time)
}, [ "0", "2n" ]).start(0);
openhatpart.loop = true;
openhatpart.loopEnd = "1m";

var hat = new Tone.Player("instruments/hat.wav").toMaster();
var hatpart = new Tone.Part(function(time, note){
	hat.start(time);
}, [ "4n", "4n + 6n", "2n + 4n" ]).start(0);
hatpart.loop = true;
hatpart.loopEnd = "1m";

var cymbal = new Tone.Player("instruments/cymbal.wav").toMaster();
var cymbalpart = new Tone.Part(function(time, note){
	cymbal.start(time);
}, [ "0" ]).start(0);
cymbalpart.loop = true;
cymbalpart.loopEnd = "4m";

var kick = new Tone.Player("instruments/kick.wav").toMaster();
var kickpart = new Tone.Part(function(time, note){
	kick.start(time)
	Tone.Draw.schedule(function(){
		if (bassviz == true) {
			drawathing('kick')
		}
	}, time)
}, [ "0", "2m", "2m + 2n + 6n", "3m" ]).start(0);
kickpart.loop = true;
kickpart.loopEnd = "4m";



//FILLS
var tom = new Tone.Player("instruments/tom.wav").toMaster();
var tompart = new Tone.Part(function(time, note){
	tom.start(time);
	Tone.Draw.schedule(function(){
		if (rndPhil == 0) {
			staticdraw('tom')
		}
	}, time)
}, [ "3m + 4n", "3m + 2n + 4n" ]).start(0);
tompart.loop = true;
tompart.loopEnd = "4m";

var rimshot = new Tone.Player("instruments/rimshot.wav").toMaster();
var rimshotpart = new Tone.Part(function(time, note){
	Tone.Draw.schedule(function(){
		if (rndPhil == 1) {
			staticdraw('rimshot')
		}
	}, time)
	rimshot.start(time)
}, [ "3m + 8n", "3m + 4n + 8n", "3m + 2n + 8n", "3m + 2n + 4n + 8n" ]).start(0);
rimshotpart.loop = true;
rimshotpart.loopEnd = "4m";

var snare = new Tone.Player("instruments/snare.wav").toMaster();
var snarepart = new Tone.Part(function(time, note){
	Tone.Draw.schedule(function(){
		if (rndPhil == 2) {
			staticdraw('snare')
		}
	}, time)
	snare.start(time)
}, [ "3m + 12n", "3m + 6n", "3m + 3n", "3m + 3n + 12n", "3m + 3n + 6n + 12n", "3m + 3n + 3n", "3m + 3n + 3n + 6n", "3m + 3n + 3n + 6n + 12n" ]).start(0);
snarepart.loop = true;
snarepart.loopEnd = "4m";

var snare2 = new Tone.Player("instruments/snare.wav").toMaster();
var snare2part = new Tone.Part(function(time, note){
	Tone.Draw.schedule(function(){
		if (rndPhil == 2) {
			staticdraw('snare')
		}
	}, time)
	snare2.start(time);
}, [ "3m", "3m + 6n + 12n", "3m + 3n + 6n", "3m + 3n + 3n + 12n" ]).start(0);
snare2part.loop = true;
snare2part.loopEnd = "4m";

var kick2 = new Tone.Player("instruments/kick.wav").toMaster();
var kick2part = new Tone.Part(function(time, note){
	Tone.Draw.schedule(function(){
		if (rndPhil == 3) {
			drawathing('kick')
		}
	}, time)
	kick2.start(time)
}, [ "2m + 2n + 6n + 12n", "3m + 2n + 6n", "3m + 2n + 6n + 12n + 12n + 12n" ]).start(0);
kick2part.loop = true;
kick2part.loopEnd = "4m";







//Drum solo
var tomsolopart = new Tone.Part(function(time, note){
	tom.start(time);
	Tone.Draw.schedule(function(){
		drawathing('solo','tom')
	})
}, []).start(0);
tomsolopart.loop = true;
tomsolopart.loopEnd = "2m";

var tom2 = new Tone.Player("instruments/tom2.wav").toMaster();
var tom2solopart = new Tone.Part(function(time, note){
	tom2.start(time);
	Tone.Draw.schedule(function(){
		//drawathing('solo','tom2')
		staticdraw()
	})
}, []).start(0);
tom2solopart.loop = true;
tom2solopart.loopEnd = "2m";

var tom3 = new Tone.Player("instruments/tom3.wav").toMaster();
var tom3solopart = new Tone.Part(function(time, note){
	tom3.start(time);
	Tone.Draw.schedule(function(){
		staticdraw()
	})
}, []).start(0);
tom3solopart.loop = true;
tom3solopart.loopEnd = "2m";

var kicksolopart = new Tone.Part(function(time, note){
	kick.start(time)
	Tone.Draw.schedule(function(){
		drawathing('solo','kick')
	})
}, [ "0", "4n", "2n", "2n + 4n", "1m", "1m + 4n", "1m + 2n", "1m + 2n + 4n" ]).start(0);
kicksolopart.loop = true;
kicksolopart.loopEnd = "2m";

var hatsolopart = new Tone.Part(function(time, note){
	hat.start(time)
	Tone.Draw.schedule(function(){
		drawathing('solo','hat')
	})
}, []).start(0);
hatsolopart.loop = true;
hatsolopart.loopEnd = "2m";

var rimshotsolopart = new Tone.Part(function(time, note){
	rimshot.start(time)
	Tone.Draw.schedule(function(){
		//drawathing('solo','rimshot')
		staticdraw()
	})
}, []).start(0);
rimshotsolopart.loop = true;
rimshotsolopart.loopEnd = "2m";

var snaresolopart = new Tone.Part(function(time, note){
	snare2.start(time)
	Tone.Draw.schedule(function(){
		//drawathing('solo','snare2')
		staticdraw()
	})
}, []).start(0);
snaresolopart.loop = true;
snaresolopart.loopEnd = "2m";

var snare2solopart = new Tone.Part(function(time, note){
	snare.start(time)
	Tone.Draw.schedule(function(){
		drawathing('solo','snare')
	})
}, [ /* "0 + 12n", "0 + 6n", "4n + 12n", "4n + 6n", "2n + 12n", "2n + 6n", "2n + 4n + 12n", "2n + 4n + 6n", "1m + 12n", "1m + 6n", "1m + 4n + 12n", "1m + 4n + 6n", "1m + 2n + 12n", "1m + 2n + 6n, "1m + 2n + 4n + 12n", "1m + 2n + 4n + 6n", */ ]).start(0);
snare2solopart.loop = true;
snare2solopart.loopEnd = "2m";

var openhatsolopart = new Tone.Part(function(time, note){
	openhat.start(time)
	Tone.Draw.schedule(function(){
		drawathing('solo','openhat')
	})
}, []).start(0);
openhatsolopart.loop = true;
openhatsolopart.loopEnd = "2m";

var cymbalsolopart = new Tone.Part(function(time, note){
	cymbal.start(time)
	Tone.Draw.schedule(function(){
		drawathing('solo','cymbal')
	})
}, []).start(0);
cymbalsolopart.loop = true;
cymbalsolopart.loopEnd = "2m";








var quarternotes = [
	'4n',
	'2n + 4n',
	'1m + 4n',
	'1m + 2n + 4n',
	'2m + 4n',
	'2m + 2n + 4n',
	'3m + 4n',
	'3m + 2n + 4n',
];

var drumsolos = [
	{'name' : 'tom', 'num' : 2, 'hits' : ["0", "4n + 8n", "2n + 4n", "1m + 8n", "1m + 2n"] },
	{'name' : 'tom2', 'num' : 1, 'hits' : ["3n + 3n", "1m + 3n"] },
	{'name' : 'tom3', 'num' : 1, 'hits' : ["2n + 4n + 8n", "1m + 2n + 4n + 8n"] },
	//{'name' : 'kick', 'num' : 3, 'hits' : ["6n", "2n + 6n", "1m + 6n", "1m + 2n + 6n"] },
	{'name' : 'hat', 'num' : 5, 'hits' : ["0", "10n", "5n", "10n + 5n", "5n + 5n", "2n", "2n + 10n", "2n + 5n", "2n + 10n + 5n", "2n + 5n + 5n", "0", "10n", "5n", "10n + 5n", "5n + 5n", "2n", "2n + 10n", "2n + 5n", "2n + 10n + 5n", "2n + 5n + 5n"] },
	{'name' : 'rimshot', 'num' : 1, 'hits' : ["6n", "2n + 6n", "1m + 6n", "1m + 2n + 6n"] },
	{'name' : 'snare', 'num' : 2, 'hits' : ["0", "4n", "2n", "2n + 4n", "1m", "1m + 4n", "1m + 2n", "1m + 2n + 4n"] },
	{'name' : 'openhat', 'num' : 3,  'hits' : ["8n", "4n + 8n", "2n + 8n", "2n + 4n + 8n", "1m + 8n", "1m + 4n + 8n", "1m + 2n + 8n", "1m + 2n + 4n + 8n"]},
	{'name' : 'cymbal', 'num' : 1, 'hits' : ["0", "2n", "1m", "1m + 2n"] },
];

//var hitsarray = [];

function drumsolo() {
	for (d=0;d<drumsolos.length;d++) {
		var thispart = eval(drumsolos[d].name + 'solopart');
		var hitsnum = drumsolos[d].num;
		var hits = drumsolos[d].hits;
		var hitsarray = [];

		for(var i = 0; i < hitsnum; i++) {
		    var numberIsInArray = false;
		    var rand = Math.floor(Math.random() * hits.length);
		    for(var j = 0; j < hitsarray.length; j++){
		        if(rand === hitsarray[j]) {
		            numberIsInArray = true;
		            i--;
		        }
		    }
		    if(!numberIsInArray){
		       hitsarray.push(hits[rand]);
		    }
		}

		for (let h=0; h<hitsarray.length; h++) {
			var thishit = hitsarray[h];
			thispart.add({ "time": thishit, })
			if (thispart == snaresolopart) {
				snare2solopart.add({ "time" : thishit + ' + 12n', })
				snare2solopart.add({ "time" : thishit + ' + 6n', })
			}
		}
	}
}

function redonotes(instr) {
	switch(instr) {
	    case 'piano':
	    	piano.volume.rampTo(-4, 0.01);
			piano2.volume.rampTo(-4, 0.3);

	        //PIANO SOLO
			var biab = Math.floor(Math.random() * 3) + 2;
			var notesNum = biab * 4;
			var notesDiv = biab * 2;
			var barsNum = notesDiv * 3;
			
			pianopart.removeAll();
			var pianoArray = [];
			for(var i = 0; i < notesNum; i++) {
			    var numberIsInArray = false;
			    var rand = Math.floor(Math.random() * barsNum);
			    for(var j = 0; j < pianoArray.length; j++){
			        if(rand === pianoArray[j]) {
			            numberIsInArray = true;
			            i--;
			        }
			    }
			    if(!numberIsInArray){
			       pianoArray.push(rand);
			    }
			}
			for (i=0;i<pianoArray.length;i++) {
				var notePlace = pianoArray[i]
				var string = '1m';
				
				for (j=0;j<notePlace;j++) {
					string += ' + ' + notesDiv + 'n';
				}

				var rndNote = Math.floor(Math.random() * 8) + 1;
				pianopart.add({
					"time": string,
					"noteNum": 's' + rndNote,
				})
			}
			break;
	    case 'flute':
	    	flute.volume.rampTo(-4, 0.0001);
	    	//flute
	        Tone.Transport.scheduleRepeat(function(time) {
				flutepart.removeAll();
				var biab = (Math.floor(Math.random() * 2) + 3) * 2;
				var string = '0m';
				for (i=1;i<biab;i++) {
					string += ' + ' + biab + 'n';
					flutepart.add({
						"time": string,
						"noteNum": 's' + (Math.floor(Math.random() * 8) + 1),
						'duration' : biab + 'n'
					})
				}
			},'1m');
	        break;
	    case 'vibes':
	    	vibes.volume.rampTo(-1, 0.01);
	        //VIBES
			vibespart.removeAll();
			var vibesArray = [];
			for(var i = 0; i < 4; i++) {
			    var numberIsInArray = false;
			    var rand = Math.floor(Math.random() * 8);
			    for(var j = 0; j < vibesArray.length; j++){
			        if(rand === vibesArray[j]) {
			            numberIsInArray = true;
			            i--;
			        }
			    }
			    if(!numberIsInArray){
			       vibesArray.push(rand);
			    }
			}
			for (i=0;i<vibesArray.length;i++) {
				var thisnum = vibesArray[i]
				var rndNote = Math.floor(Math.random() * 6) + 1;
				vibespart.add({
					"time": quarternotes[thisnum],
					"noteNum": 's' + rndNote,
					'duration' : '2n',
				})
				vibespart.add({
					"time": quarternotes[thisnum],
					"noteNum": 's' + (rndNote + 2),
					'duration' : '2n',
				})
			}

			var vibesArray2 = [];
			for(var i = 0; i < 12; i++) {
			    var numberIsInArray = false;
			    var rand = Math.floor(Math.random() * 24);
			    for(var j = 0; j < vibesArray2.length; j++){
			        if(rand === vibesArray2[j]) {
			            numberIsInArray = true;
			            i--;
			        }
			    }
			    if(!numberIsInArray){
			       vibesArray2.push(rand);
			    }
			}

			for (v2=0;v2<vibesArray2.length;v2++) {
				var string = '0m';
				var thisnum = vibesArray2[v2];

				for (i=0;i<thisnum;i++) {
					string += ' + ' + '8n';
				}

				var rndNote = Math.floor(Math.random() * 8) + 1;
				vibespart.add({
					"time": string,
					"noteNum": 's' + rndNote,
					'duration' : '4n'
				})
			}
	        break;
	    case 'drums':
	    	//drums
	    	bass.volume.value = -Infinity;

	    	kick2.volume.value = -2;
			snare.volume.value = -12;
			snare2.volume.value = -3;
			rimshot.volume.value = -15;
			tom.volume.value = -2;

	    	tompart.stop();
	    	hatpart.stop();
			openhatpart.stop();
			//cymbalpart.stop();
			//kickpart.stop();
			rimshotpart.stop();
			snarepart.stop();
			snare2part.stop();
			kick2part.stop();

			tomsolopart.removeAll().start(0);
			tom2solopart.removeAll().start(0);
			tom3solopart.removeAll().start(0);
			hatsolopart.removeAll().start(0);
			openhatsolopart.removeAll().start(0);
			snaresolopart.removeAll().start(0);
			snare2solopart.removeAll().start(0);
			rimshotsolopart.removeAll().start(0);
			cymbalsolopart.removeAll().start(0);
			kicksolopart.start(0);
			

			drumsolo();
			Tone.Transport.schedule(function(time) {
				drumsolo();
			},'2m');

	        break;
	    default:
	}
}


function bigphil() {
	tom.volume.value = -Infinity;
	rimshot.volume.value = -Infinity;
	snare.volume.value = -Infinity;
	snare2.volume.value = -Infinity;
	kick2.volume.value = -Infinity;
	switch(rndPhil) {
		case 0:
			tom.volume.value = -2;
			break;
		case 1:
			rimshot.volume.value = -15;
			break;
		case 2:
			snare.volume.value = -12;
			snare2.volume.value = -3;
			break;
		case 3:
			kick2.volume.value = -2;
			break;
		default:
			//NOTHING
	}
}






//* ---- VOLUMES --- *///

hat.volume.value = -8;
openhat.volume.value = -11;
cymbal.volume.value = -4;
kick.volume.value = 2;


bass.volume.value = -1;






/*/  ----  Visuals ----  /*/

const canvas = document.querySelector('canvas')
const w = window.innerWidth
const h = window.innerHeight
const ctx = canvas.getContext('2d')
const setupCanvas = function() {
	const dpi = window.devicePixelRatio
	canvas.width = w * dpi
	canvas.height = h * dpi
	canvas.style.width = w + "px"
	canvas.style.height = h + "px"

	ctx.scale(dpi, dpi)
  	ctx.lineCap = 'round'
	ctx.lineJoin = 'round'
}
setupCanvas()
window.addEventListener('resize', function() {
	setupCanvas()
	sizetext()
})

function rndNum(min,rng) {
	let rnd = min + Math.floor(Math.random() * rng)
	return rnd
}


var shapes=[];
requestAnimationFrame(animate);
function animate(time){
	for(var i=0;i<shapes.length;i++){
		shapes[i].p1y+= -5
		shapes[i].p2y+= -5
		shapes[i].p3y+= -5
		shapes[i].p4y+= -5
	}
	draw();
	requestAnimationFrame(animate);
}

function draw(){
	ctx.clearRect(0,0,w,h);
	for(var i=0;i<shapes.length;i++){
		var s=shapes[i]
		if (s.p3y < -120) {
			//DO NOT DRAW
			//shapes.splice(i, 1);
		} else {
			ctx.fillStyle = s.fillStyle
			ctx.beginPath()
			ctx.moveTo(s.p1x, s.p1y)
			ctx.lineTo(s.p2x, s.p2y)
			ctx.lineTo(s.p3x, s.p3y)
			ctx.lineTo(s.p4x, s.p4y)
			ctx.closePath()
			ctx.fill()
		}
	}
}

function drawathing(inst,thing) {
	let rect1 = {}
	if (inst == 'bass') {
		let note = thing.noteNum.replace('s','')
		let col = 255 / 11 * (rndNote - 1)
		rect1 = {
			inst: 'bass',
			fillStyle: 'rgba(' + col + ',' + col + ',' + col + ',0.8)',
			p1x: 0,
			p1y: rndNum(h - 60, 20),
			p2x: rndNum(w/7 * note, 10),
			p2y: rndNum(h - 60, 20),
			p3x: rndNum(w/7 * note, 10),
			p3y: rndNum(h + 40, 20),
			p4x: 0,
			p4y: rndNum(h + 40, 20)
		}
	} else if(inst == 'kick') {
		let rnd1 = rndNum(20, w - 40)
		let rnd2 = rndNum(20, h - 40)
		rect1 = {
			inst: 'kick',
			fillStyle: '#ee4',
			p1x: rndNum(rnd1 - 24, 8),
			p1y: rndNum(rnd2 - 24, 8),
			p2x: rndNum(rnd1 + 24, 8),
			p2y: rndNum(rnd2 - 24, 8),
			p3x: rndNum(rnd1 + 24, 8),
			p3y: rndNum(rnd2 + 24, 8),
			p4x: rndNum(rnd1 - 24, 8),
			p4y: rndNum(rnd2 + 24, 8)
		}
	} else if (inst == 'piano') {
		let note = thing.noteNum.replace('s','')
		rect1 = {
			inst: 'piano',
			fillStyle: '#e44',
			p1x: rndNum(w/8 * (note - 0.5) - 40, 10),
			p1y: rndNum(h - 60, 20),
			p2x: rndNum(w/8 * (note - 0.5) + 40, 10),
			p2y: rndNum(h - 60, 20),
			p3x: rndNum(w/8 * (note - 0.5) + 40, 10),
			p3y: rndNum(h + 40, 20),
			p4x: rndNum(w/8 * (note - 0.5) - 40, 10),
			p4y: rndNum(h + 40, 20)
		}
	} else if (inst == 'chord') {
		let col = rndNote / 12
		rect1 = {
			inst: 'chord',
			fillStyle: 'rgb(' + (238 * col) + ',' + (68 * col) + ',' + (68 * col) + ')',
			p1x: rndNum(w, 10),
			p1y: rndNum(h - 80, 20),
			p2x: rndNum(w/2, 10),
			p2y: rndNum(h - 80, 20),
			p3x: rndNum(w/2, 10),
			p3y: rndNum(h + 80, 20),
			p4x: rndNum(w, 10),
			p4y: rndNum(h + 80, 20)
		}
	} else if (inst == 'flute') {
		let note = thing.noteNum.replace('s','')
		rect1 = {
			inst: 'flute',
			fillStyle: '#ea4',
			p1x: rndNum(w/8 * (note - 0.5) - 120, 50),
			p1y: rndNum(h - 120, 50),
			p2x: rndNum(w/8 * (note - 0.5) + 120, 50),
			p2y: rndNum(h - 120, 50),
			p3x: rndNum(w/8 * (note - 0.5) + 120, 50),
			p3y: rndNum(h + 120, 50),
			p4x: rndNum(w/8 * (note - 0.5) - 120, 50),
			p4y: rndNum(h + 120, 50)
		}
	} else if (inst == 'vibes') {
		let note = thing.noteNum.replace('s','')
		rect1 = {
			inst: 'vibes',
			fillStyle: '#48d',
			p1x: rndNum(w/8 * (note - 0.5) - 12, 10),
			p1y: rndNum(h - 24, 10),
			p2x: rndNum(w/8 * (note - 0.5) + 12, 10),
			p2y: rndNum(h - 24, 10),
			p3x: rndNum(w/8 * (note - 0.5) + 12, 10),
			p3y: rndNum(h, 10),
			p4x: rndNum(w/8 * (note - 0.5) - 12, 10),
			p4y: rndNum(h, 10)
		}
	} else if (inst == 'solo') {
		let rnd1 = rndNum(20, w - 40)
		let rnd2 = rndNum(20, h - 40)
		let size = 20

		if (thing == 'kick') {
			size = 24
		} else if (thing == 'snare') {
			size = 60
		} else if (thing == 'snare2') {
			size = 20
		} else if (thing == 'tom') {
			size = 44
		} else if (thing == 'tom2') {
			size = 44
		} else if (thing == 'tom3') {
			size = 44
		} else if (thing == 'rimshot') {
			size = 68
		} else if (thing == 'hat') {
			size = 16
		} else if (thing == 'openhat') {
			size = 40
		} else if (thing == 'cymbal') {
			size = 120
		}

		rect1 = {
			inst: 'solo',
			fillStyle: '#000',
			p1x: rndNum(rnd1 - size, (size / 4)),
			p1y: rndNum(rnd2 - size, (size / 4)),
			p2x: rndNum(rnd1 + size, (size / 4)),
			p2y: rndNum(rnd2 - size, (size / 4)),
			p3x: rndNum(rnd1 + size, (size / 4)),
			p3y: rndNum(rnd2 + size, (size / 4)),
			p4x: rndNum(rnd1 - size, (size / 4)),
			p4y: rndNum(rnd2 + size, (size / 4))
		}
	}

	shapes.push(rect1)
}

function staticdraw(inst) {
	let thissrc = imgs[rndNum(0, 18)]
	let thisimg = '<div class="imgwrap" style="top:' + rndNum(0, 60) + '%; left:' + rndNum(0, 60) + '%; background-color:rgb(' + rndNum(100, 100) + ',' + rndNum(100, 100) + ',' + rndNum(100, 100) + ')"><img src="' + thissrc + '" /></div>'
	$(thisimg).appendTo('section#photos')
}

function drawText(text) {
	let thistxt = $('<h2>' + text + '</h2>')
	$(thistxt).appendTo('section#text')
	setTimeout(function() {
		$(thistxt).addClass('on')
	}, 1)

	setTimeout(function() {
		$(thistxt).remove()
	}, 20000)
}

$(document).ready(function() {
	sizetext()
	coltext()
})


function sizetext() {
	$('h2').each(function() {
		let topth = $(window).innerHeight() * 1.5
		let bottomth = $(window).innerHeight() * 0.5
		let diff = topth - bottomth
		let thingwdth = Math.min(1000,  (Math.max($(window).innerWidth(), bottomth) - bottomth) / diff * 1000)

		let topth2 = topth * 1.3137
		let ltrspc = (0.5 * (Math.max($(window).innerWidth(), topth2) - topth2))

		$(this).css({
			'font-variation-settings' : "'wdth' " + thingwdth,
			'letter-spacing' : ltrspc + 'px'
		})
	})
}

function coltext() {
	$('h1 span').each(function() {
		$(this).css('color', 'rgb(' + rndNum(100, 100) + ',' + rndNum(100, 100) + ',' + rndNum(100, 100) + ')' )
	})

	setTimeout(function() {
		$('#title').addClass('on')
	}, 100)
}