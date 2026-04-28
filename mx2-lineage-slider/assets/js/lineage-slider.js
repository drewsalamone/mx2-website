/**
 * MX2 Lineage Slider — front-end behavior.
 *
 * The shortcode renders one (or more) `<section class="mx2-lineage">` shells.
 * This script populates each instance, wires controls, fullscreen, autoplay,
 * keyboard nav and touch swipe.
 */
( function () {
	'use strict';

	var FIGURES = [
		{
			ord: 'I',
			portrait: '01_cosimo_duo.png',
			role: '19th Great-Grandfather',
			name: 'Cosimo de’ Medici',
			epithet: 'pater patriae',
			dates: '1389 — 1464  ·  Florence',
			where: 'Florence  ·  Republic of Florence',
			story: 'Banker, statesman, and the original patron of the Renaissance. Engineered the Medici Bank into the most powerful financial house in Europe — then quietly used the leverage to bankroll Donatello, Brunelleschi, and Fra Angelico. The blueprint for taste as a discipline.',
			quote: '“The Medicis didn’t buy art. They commissioned it.”',
			attribution: 'Portrait attributed to Jacopo Pontormo',
			year: '1389',
			gen: '19th great-grandfather'
		},
		{
			ord: 'II',
			portrait: '02_piero_duo.png',
			role: '18th Great-Grandfather',
			name: 'Piero de’ Medici',
			epithet: 'il gottoso',
			dates: '1416 — 1469  ·  Florence',
			where: 'Florence  ·  Renaissance Court',
			story: 'Cosimo’s son. Inherited the bank, the city, and the gout. Held the line during a crisis of succession and commissioned the Chapel of the Magi by Benozzo Gozzoli — a private fresco no outsider was meant to see.',
			quote: '“He held what his father built. That is its own art.”',
			attribution: 'Portrait by Agnolo Bronzino',
			year: '1450',
			gen: '18th great-grandfather'
		},
		{
			ord: 'III',
			portrait: '03_lorenzo_duo.png',
			role: '17th Great-Grandfather',
			name: 'Lorenzo de’ Medici',
			epithet: 'il magnifico',
			dates: '1449 — 1492  ·  Florence',
			where: 'Florence  ·  the High Renaissance',
			story: 'Piero’s son. Diplomat, poet, ruler in all but name. Hosted Botticelli, Michelangelo, and Leonardo at the family table. Codified the Medici doctrine: a great firm is a workshop, not an office.',
			quote: '“He gave artists the room to be unreasonable. They paid him back in masterpieces.”',
			attribution: 'Portrait by Giorgio Vasari',
			year: '1469',
			gen: '17th great-grandfather'
		},
		{
			ord: 'IV',
			portrait: '04_lucrezia_duo.png',
			role: '15th Great-Grandmother',
			name: 'Lucrezia de’ Medici',
			epithet: 'la dolce',
			dates: '1470 — 1550  ·  Florence',
			where: 'Florence  ·  House of Salviati',
			story: 'Daughter of Lorenzo il Magnifico. Married Jacopo Salviati and bridged two of Florence’s most powerful houses. Mother of Maria Salviati — and through her, the line continues into the Grand Duchy.',
			quote: '“She lived eighty years and saw three Medici popes. The family memory.”',
			attribution: 'Portrait, Florentine school',
			year: '1490',
			gen: '15th great-grandmother'
		},
		{
			ord: 'V',
			portrait: '05_maria_duo.png',
			role: '14th Great-Grandmother',
			name: 'Maria Salviati',
			epithet: 'la sentinella',
			dates: '1499 — 1543  ·  Florence',
			where: 'Florence  ·  the Salviati Branch',
			story: 'Daughter of Lucrezia. Widowed young, she raised her son Cosimo I in mourning veils and steel resolve — then handed him a duchy. Pontormo painted her in black; her gaze did the rest.',
			quote: '“She outlasted everyone who underestimated her.”',
			attribution: 'Portrait by Jacopo Pontormo',
			year: '1537',
			gen: '14th great-grandmother'
		},
		{
			ord: 'VI',
			portrait: '06_cosimoI_duo.png',
			role: '13th Great-Grandfather',
			name: 'Cosimo I de’ Medici',
			epithet: 'grand duke',
			dates: '1519 — 1574  ·  Florence',
			where: 'Florence  ·  Grand Duchy of Tuscany',
			story: 'Maria’s son. Took a fractured city at seventeen and welded it into the Grand Duchy of Tuscany. Founded the Uffizi, the Accademia delle Arti del Disegno, and — in armor — sat for Bronzino seven times.',
			quote: '“The second act of the Medici. He built the architecture.”',
			attribution: 'Portrait by Agnolo Bronzino',
			year: '1545',
			gen: '13th great-grandfather'
		},
		{
			ord: 'VII',
			portrait: '07_isabella_duo.png',
			role: '12th Great-Grandmother',
			name: 'Isabella de’ Medici',
			epithet: 'la stella',
			dates: '1542 — 1576  ·  Florence  →  Rome',
			where: 'Rome  ·  House of Orsini',
			story: 'Cosimo I’s daughter. Married into the Orsini and ran a literary salon that doubled as the Medici embassy in Rome — a brokerage of taste, music, and intelligence. Her end was tragic; her influence outlived it.',
			quote: '“She taught Rome that Florence had read more.”',
			attribution: 'Portrait by Alessandro Allori',
			year: '1565',
			gen: '12th great-grandmother'
		},
		{
			ord: 'VIII',
			portrait: '08_virginio_duo.png',
			role: '11th Great-Grandfather',
			name: 'Virginio Orsini',
			epithet: 'il duca di bracciano',
			dates: '1572 — 1615  ·  Bracciano',
			where: 'Bracciano  ·  Duchy of Bracciano',
			story: 'Isabella’s son. Soldier, courtier, godson of Philip II of Spain. Sailed to Elizabeth I’s London in 1601 — the visit Shakespeare almost certainly worked into Twelfth Night. The Medici fingerprint on the English stage.',
			quote: '“The family carried the name into rooms it had no right to be in.”',
			attribution: 'Portrait, 16th c. Italian school',
			year: '1601',
			gen: '11th great-grandfather'
		},
		{
			ord: 'IX',
			portrait: null,
			role: '10th Great-Grandmother',
			name: 'Camilla Orsini',
			epithet: 'la principessa',
			dates: '1603 — 1685  ·  Rome',
			where: 'Rome  ·  House of Borghese',
			story: 'Virginio’s daughter. Married Marcantonio II Borghese; the Orsini line marries into the rising Borghese, who hold the papal throne and the keys to Roman taste. Lived eighty-two years — long enough to watch the Baroque become its own century.',
			quote: '“The alliance that turned the family Roman.”',
			attribution: 'No portrait survives',
			year: '1620',
			gen: '10th great-grandmother'
		},
		{
			ord: 'X',
			portrait: '10_paolo_duo.png',
			role: '9th Great-Grandfather',
			name: 'Paolo Borghese',
			epithet: 'il principe',
			dates: '1624 — 1646  ·  Rome',
			where: 'Rome  ·  Papal States',
			story: 'Camilla’s son. Heir to Borghese fortune and a papal name. Died at twenty-two; survived in the family portrait that hangs in this slide — his children grouped in red, his widow in pearls.',
			quote: '“He lived twenty-two years. The line lived through him.”',
			attribution: 'Borghese family portrait, c. 1645',
			year: '1645',
			gen: '9th great-grandfather'
		},
		{
			ord: 'XI',
			portrait: '11_giovannib_duo.png',
			role: '8th Great-Grandfather',
			name: 'Giovanni Battista Borghese',
			epithet: 'il barocco',
			dates: '1639 — 1717  ·  Rome',
			where: 'Rome  ·  Papal States',
			story: 'Came of age in the Rome of Bernini and Borromini and bought accordingly. In 1664 staged the legendary carnival cavalcade designed by Johann Paul Schor — the Borghese as theatre. The wig got bigger; the standard held.',
			quote: '“Every generation gets the Baroque it deserves.”',
			attribution: 'Portrait, late 17th c. Roman school',
			year: '1664',
			gen: '8th great-grandfather'
		},
		{
			ord: 'XII',
			portrait: null,
			role: '7th Great-Grandfather',
			name: 'Marcantonio Borghese',
			epithet: 'il prudente',
			dates: '1660 — 1729  ·  Rome',
			where: 'Rome  ·  Papal States',
			story: 'Inherited the gallery, the villa, and the obligation. Sat for the late-Baroque masters and consolidated the Borghese collection that the Galleria still bears his family’s name for.',
			quote: '“You inherit the rooms. You earn the right to keep them.”',
			attribution: 'No portrait identified',
			year: '1700',
			gen: '7th great-grandfather'
		},
		{
			ord: 'XIII',
			portrait: null,
			role: '6th Great-Grandmother',
			name: 'Flaminia Borghese',
			epithet: 'la breve',
			dates: '1692 — 1718  ·  Rome',
			where: 'Rome  ·  House of Orsini',
			story: 'Married back into the Orsini and gave the family one daughter — Ana Paula — before dying at twenty-six. The Borghese name yields back to Orsini through her.',
			quote: '“Twenty-six years. One daughter. The line continues.”',
			attribution: 'No portrait survives',
			year: '1715',
			gen: '6th great-grandmother'
		},
		{
			ord: 'XIV',
			portrait: null,
			role: '5th Great-Grandmother',
			name: 'Ana Paula Flaminia Orsini',
			epithet: 'l’erede',
			dates: '1722 — 1742  ·  Rome',
			where: 'Rome  ·  Papal States',
			story: 'Born to a mother who died young; lived twenty years. Bore Filippo Bernualdo before her own life ended — the Orsini name now carried entirely through her son.',
			quote: '“She gave the family its next century. Then she went.”',
			attribution: 'No portrait survives',
			year: '1740',
			gen: '5th great-grandmother'
		},
		{
			ord: 'XV',
			portrait: '15_filippo_duo.png',
			role: '4th Great-Grandfather',
			name: 'Filippo Bernualdo Orsini',
			epithet: '16th Duke of Gravina',
			dates: '1742 — 1824  ·  Rome',
			where: 'Gravina  ·  Kingdom of Naples',
			story: 'Lived eighty-two years across the Enlightenment, the French Revolution, Napoleon, and the Restoration. Held the Duchy of Gravina through every regime — the family’s deepest southern root.',
			quote: '“He outlasted three empires. The land stayed the land.”',
			attribution: 'Portrait recreation',
			year: '1790',
			gen: '4th great-grandfather'
		},
		{
			ord: 'XVI',
			portrait: null,
			role: '3rd Great-Grandfather',
			name: 'Don Benedetto Orsini',
			epithet: 'il giovane',
			dates: '1773 — 1805  ·  Rome',
			where: 'Rome  ·  Bourbon Court',
			story: 'Son of the duke. Lived thirty-two years through the upheaval that ended the old Italian order — the Parthenopean Republic, the Bourbons returning, Napoleon’s shadow lengthening. Died young; the title moved on.',
			quote: '“Thirty-two years inside the storm.”',
			attribution: 'No portrait survives',
			year: '1800',
			gen: '3rd great-grandfather'
		},
		{
			ord: 'XVII',
			portrait: null,
			role: '2nd Great-Grandfather',
			name: 'Fillippo Orsini',
			epithet: 'l’ottocento',
			dates: '1795 — 1854  ·  Southern Italy',
			where: 'Southern Italy  ·  the Risorgimento’s eve',
			story: 'Born under Napoleon, died on the eve of unification. Lived through the long collapse of the Bourbon order; the family is no longer at court but still on the land.',
			quote: '“The century when the names mattered less and the work mattered more.”',
			attribution: 'No portrait survives',
			year: '1830',
			gen: '2nd great-grandfather'
		},
		{
			ord: 'XVIII',
			portrait: null,
			role: 'Great-Great-Grandfather',
			name: 'Antonio Orsini',
			epithet: 'il padre',
			dates: '1849 — 1903  ·  Southern Italy',
			where: 'Southern Italy  ·  Kingdom of Italy',
			story: 'Born the year Rome rose and fell again; died with the new Italian century. The family is now of southern Italy — land, work, music, the long quiet inheritance.',
			quote: '“The quiet generations are how a family survives.”',
			attribution: 'No photograph survives',
			year: '1880',
			gen: '2nd great-grandfather'
		},
		{
			ord: 'XIX',
			portrait: '19_lupangelo_duo.png',
			role: 'Great-Grandfather',
			name: 'Lupangelo Orsini',
			epithet: 'l’immigrante',
			dates: 'b. 1873  ·  San Lupo, Italy  →  America',
			where: 'San Lupo, Italy  ·  the crossing',
			story: 'Antonio’s son. His daughter Rosina would come to America and carry an ancient legacy into the twentieth century. The middle name John, the father of our founder, bears today is his.',
			quote: '“Strong and mighty, he gave his family to foreign lands for a better life.”',
			attribution: 'Family photo',
			year: '1900',
			gen: 'great-grandfather'
		},
		{
			ord: 'XX',
			portrait: '20_rosina_duo.png',
			role: 'Grandmother',
			name: 'Rosina Orsini',
			epithet: 'the keeper',
			dates: '1906 — 1997  ·  San Lupo, Italy  →  Philadelphia',
			where: 'San Lupo, Italy  →  South Philadelphia  ·  the family table',
			story: 'Lupangelo’s daughter. Carried the Orsini name across the ocean; took Salamone by marriage but kept everything else. Always said her family was from royalty, but nobody believed her — until now.',
			quote: '“You inherit the name. You earn the standard.”',
			attribution: 'Family photograph, c. 1948',
			year: '1940',
			gen: 'grandmother'
		},
		{
			ord: 'XXI',
			portrait: '21_john_duo.png',
			role: 'Father',
			name: 'John Lupangelo Salamone',
			epithet: 'il maestro',
			dates: 'b. 1948  ·  Norristown, PA',
			where: 'Norristown, PA  ·  the family band',
			story: 'Rosina’s son. Musician, singer, and DJ for forty years and counting. Fronted the band, ran the business, read the room — every wedding, every dance floor, every restless Saturday night. Carries Lupangelo’s name in his middle.',
			quote: '“You don’t pick the song. You read the room.”',
			attribution: 'Family photo',
			year: '1972',
			gen: 'father'
		},
		{
			ord: 'XXII',
			portrait: '16_drew_duo.png',
			role: 'Master of Ventures',
			name: 'Drew Salamone',
			epithet: 'old soul, new tricks',
			dates: 'b. 1974  ·  Norristown, PA',
			where: 'MEDICI + MAESTRO  ·  Mx2 Global',
			story: 'Twenty-second in the line. Founder of MEDICI + MAESTRO and Mx2 Global. Picked up where the family left off — strategy, taste, and craft as the inheritance. Builds brands the way Cosimo built workshops: with patience and the right people.',
			quote: '“Old souls. New tricks.”',
			attribution: 'Present day',
			year: '2025',
			gen: 'present day'
		}
	];

	function escapeHtml( str ) {
		return String( str ).replace( /[&<>"']/g, function ( c ) {
			return ( {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				'\'': '&#39;'
			} )[ c ];
		} );
	}

	function initSlider( root ) {
		if ( root.dataset.mx2LineageInit === '1' ) {
			return;
		}
		root.dataset.mx2LineageInit = '1';

		var config = window.MX2LineageSliderConfig || {};
		var portraitsUrl = config.portraitsUrl || '';

		var slidesEl = root.querySelector( '[data-mx2-lineage-slides]' );
		var ticksEl = root.querySelector( '[data-mx2-lineage-ticks]' );
		var curEl = root.querySelector( '[data-mx2-lineage-cur]' );
		var totEl = root.querySelector( '[data-mx2-lineage-tot]' );
		var yearEl = root.querySelector( '[data-mx2-lineage-year]' );
		var genEl = root.querySelector( '[data-mx2-lineage-gen]' );
		var prevBtn = root.querySelector( '[data-mx2-lineage-prev]' );
		var nextBtn = root.querySelector( '[data-mx2-lineage-next]' );
		var fsBtn = root.querySelector( '[data-mx2-lineage-fullscreen]' );

		if ( ! slidesEl ) {
			return;
		}

		totEl.textContent = String( FIGURES.length ).padStart( 2, '0' );

		FIGURES.forEach( function ( f, i ) {
			var slide = document.createElement( 'div' );
			slide.className = 'mx2-lineage__slide' + ( i === 0 ? ' is-active' : '' );

			var portraitInner;
			if ( f.portrait ) {
				portraitInner =
					'<img class="mx2-lineage__portrait-img" src="' +
					escapeHtml( portraitsUrl + f.portrait ) +
					'" alt="' + escapeHtml( f.name ) +
					'" loading="' + ( i < 2 ? 'eager' : 'lazy' ) + '" />';
			} else {
				portraitInner =
					'<div class="mx2-lineage__portrait-placeholder">' +
						'<div class="mx2-lineage__placeholder-mark">' + escapeHtml( f.ord ) + '.</div>' +
						'<div class="mx2-lineage__placeholder-rule"></div>' +
						'<div class="mx2-lineage__placeholder-label">No portrait survives.<br/>The name does.</div>' +
					'</div>';
			}

			slide.innerHTML =
				'<div class="mx2-lineage__century" aria-hidden="true">' + escapeHtml( String( f.year ).slice( 0, 2 ) ) + '</div>' +
				'<div class="mx2-lineage__slide-grid">' +
					'<aside class="mx2-lineage__id-card">' +
						'<div class="mx2-lineage__ord"><em>' + escapeHtml( f.ord ) + '.</em></div>' +
						'<div class="mx2-lineage__role">' + escapeHtml( f.role ) + '</div>' +
						'<h2 class="mx2-lineage__name">' + escapeHtml( f.name ) + '</h2>' +
						'<div class="mx2-lineage__epithet">' + escapeHtml( f.epithet ) + '</div>' +
						'<div class="mx2-lineage__id-rule"></div>' +
						'<div class="mx2-lineage__dates">' + escapeHtml( f.dates ) + '</div>' +
					'</aside>' +
					'<div class="mx2-lineage__portrait-wrap">' +
						'<div class="mx2-lineage__portrait-halo"></div>' +
						'<span class="mx2-lineage__portrait-bracket mx2-lineage__portrait-bracket--tl"></span>' +
						'<span class="mx2-lineage__portrait-bracket mx2-lineage__portrait-bracket--tr"></span>' +
						'<span class="mx2-lineage__portrait-bracket mx2-lineage__portrait-bracket--bl"></span>' +
						'<span class="mx2-lineage__portrait-bracket mx2-lineage__portrait-bracket--br"></span>' +
						'<div class="mx2-lineage__portrait-img-wrap">' + portraitInner + '</div>' +
					'</div>' +
					'<aside class="mx2-lineage__story">' +
						'<div class="mx2-lineage__where">' + escapeHtml( f.where ) + '</div>' +
						'<p>' + escapeHtml( f.story ) + '</p>' +
						'<div class="mx2-lineage__quote">' + escapeHtml( f.quote ) + '</div>' +
						'<div class="mx2-lineage__attribution">' + escapeHtml( f.attribution ) + '</div>' +
					'</aside>' +
				'</div>';

			slidesEl.appendChild( slide );

			var tick = document.createElement( 'button' );
			tick.type = 'button';
			tick.className = 'mx2-lineage__tick' + ( i === 0 ? ' is-active' : '' );
			tick.setAttribute( 'aria-label', 'Go to ' + f.name );
			tick.addEventListener( 'click', function () { go( i ); } );
			ticksEl.appendChild( tick );
		} );

		var idx = 0;
		var slides = slidesEl.querySelectorAll( '.mx2-lineage__slide' );
		var ticks = ticksEl.querySelectorAll( '.mx2-lineage__tick' );

		function go( n ) {
			var next = ( ( n % FIGURES.length ) + FIGURES.length ) % FIGURES.length;
			if ( next === idx ) {
				return;
			}
			slides[ idx ].classList.remove( 'is-active' );
			ticks[ idx ].classList.remove( 'is-active' );
			idx = next;
			slides[ idx ].classList.add( 'is-active' );
			ticks[ idx ].classList.add( 'is-active' );
			curEl.textContent = String( idx + 1 ).padStart( 2, '0' );
			yearEl.textContent = FIGURES[ idx ].year;
			genEl.textContent = FIGURES[ idx ].gen;
		}

		if ( prevBtn ) prevBtn.addEventListener( 'click', function () { go( idx - 1 ); } );
		if ( nextBtn ) nextBtn.addEventListener( 'click', function () { go( idx + 1 ); } );

		// Keyboard nav — only when this slider is in viewport and target is not
		// a form field, so we don't hijack typing in the page or the WP admin.
		document.addEventListener( 'keydown', function ( e ) {
			if ( ! isFocusable( e.target ) && isInView( root ) ) {
				if ( e.key === 'ArrowRight' ) { go( idx + 1 ); }
				if ( e.key === 'ArrowLeft' ) { go( idx - 1 ); }
				if ( e.key === 'f' || e.key === 'F' ) { toggleFs(); }
			}
		} );

		function isFocusable( el ) {
			if ( ! el || ! el.tagName ) return false;
			var t = el.tagName.toLowerCase();
			return t === 'input' || t === 'textarea' || t === 'select' || el.isContentEditable;
		}

		function isInView( el ) {
			var r = el.getBoundingClientRect();
			var vh = window.innerHeight || document.documentElement.clientHeight;
			return r.top < vh && r.bottom > 0;
		}

		// Fullscreen
		function toggleFs() {
			var d = document;
			if ( ! d.fullscreenElement && ! d.webkitFullscreenElement ) {
				var req = root.requestFullscreen || root.webkitRequestFullscreen;
				if ( req ) { req.call( root ); }
			} else {
				var exit = d.exitFullscreen || d.webkitExitFullscreen;
				if ( exit ) { exit.call( d ); }
			}
		}
		if ( fsBtn ) fsBtn.addEventListener( 'click', toggleFs );

		// Autoplay
		var interval = parseInt( root.getAttribute( 'data-interval' ), 10 ) || 8000;
		var autoplay = root.getAttribute( 'data-autoplay' ) !== 'false';
		var timer = null;

		function start() {
			if ( ! autoplay ) return;
			stop();
			timer = setInterval( function () { go( idx + 1 ); }, interval );
		}
		function stop() {
			if ( timer ) {
				clearInterval( timer );
				timer = null;
			}
		}

		root.addEventListener( 'mouseenter', stop );
		root.addEventListener( 'mouseleave', start );
		document.addEventListener( 'visibilitychange', function () {
			if ( document.hidden ) { stop(); } else { start(); }
		} );

		// Touch swipe
		var touchStartX = 0;
		var touchStartY = 0;
		var touchActive = false;
		root.addEventListener( 'touchstart', function ( e ) {
			if ( e.touches.length !== 1 ) return;
			touchStartX = e.touches[ 0 ].clientX;
			touchStartY = e.touches[ 0 ].clientY;
			touchActive = true;
			stop();
		}, { passive: true } );
		root.addEventListener( 'touchend', function ( e ) {
			if ( ! touchActive ) return;
			touchActive = false;
			var t = e.changedTouches[ 0 ];
			var dx = t.clientX - touchStartX;
			var dy = t.clientY - touchStartY;
			if ( Math.abs( dx ) > 50 && Math.abs( dx ) > Math.abs( dy ) ) {
				go( idx + ( dx < 0 ? 1 : -1 ) );
			}
			start();
		}, { passive: true } );

		start();
	}

	function bootstrap() {
		var roots = document.querySelectorAll( '[data-mx2-lineage-slider]' );
		roots.forEach( initSlider );
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', bootstrap );
	} else {
		bootstrap();
	}
} )();
