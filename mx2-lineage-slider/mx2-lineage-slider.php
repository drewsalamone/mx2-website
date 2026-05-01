<?php
/**
 * Plugin Name:       MX2 Lineage Slider
 * Plugin URI:        https://www.mx2.agency/
 * Description:       Renders the MEDICI + MAESTRO lineage slider via the [mx2_lineage_slider] shortcode. Drop the shortcode into any page or post.
 * Version:           1.0.9
 * Author:            Mx2 Global
 * License:           GPL-2.0-or-later
 * Text Domain:       mx2-lineage-slider
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MX2_LINEAGE_SLIDER_VERSION', '1.0.9' );
define( 'MX2_LINEAGE_SLIDER_PATH', plugin_dir_path( __FILE__ ) );
define( 'MX2_LINEAGE_SLIDER_URL', plugin_dir_url( __FILE__ ) );

/**
 * Register CSS and JS so they can be enqueued on demand by the shortcode.
 */
function mx2_lineage_slider_register_assets() {
	wp_register_style(
		'mx2-lineage-slider-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Josefin+Sans:ital,wght@0,400;0,600;0,700;1,400&display=swap',
		array(),
		null
	);

	wp_register_style(
		'mx2-lineage-slider',
		MX2_LINEAGE_SLIDER_URL . 'assets/css/lineage-slider.css',
		array( 'mx2-lineage-slider-fonts' ),
		MX2_LINEAGE_SLIDER_VERSION
	);

	wp_register_script(
		'mx2-lineage-slider',
		MX2_LINEAGE_SLIDER_URL . 'assets/js/lineage-slider.js',
		array(),
		MX2_LINEAGE_SLIDER_VERSION,
		true
	);

	wp_localize_script(
		'mx2-lineage-slider',
		'MX2LineageSliderConfig',
		array(
			'portraitsUrl' => MX2_LINEAGE_SLIDER_URL . 'assets/portraits/',
			'imagesUrl'    => MX2_LINEAGE_SLIDER_URL . 'assets/images/',
			'version'      => MX2_LINEAGE_SLIDER_VERSION,
		)
	);
}
add_action( 'wp_enqueue_scripts', 'mx2_lineage_slider_register_assets' );

/**
 * [mx2_lineage_slider] shortcode.
 *
 * Attributes:
 *   height    Stage height (CSS value). Default "100vh".
 *   autoplay  "yes" | "no". Default "yes".
 *   interval  Auto-advance ms. Default "8000".
 */
function mx2_lineage_slider_shortcode( $atts ) {
	$atts = shortcode_atts(
		array(
			'height'   => '100vh',
			'autoplay' => 'yes',
			'interval' => '8000',
		),
		$atts,
		'mx2_lineage_slider'
	);

	wp_enqueue_style( 'mx2-lineage-slider' );
	wp_enqueue_script( 'mx2-lineage-slider' );

	$height   = esc_attr( $atts['height'] );
	$autoplay = ( strtolower( $atts['autoplay'] ) === 'no' ) ? 'false' : 'true';
	$interval = (int) $atts['interval'];
	if ( $interval < 1500 ) {
		$interval = 8000;
	}

	$instance_id = 'mx2-lineage-' . wp_generate_uuid4();

	ob_start();
	?>
	<section
		class="mx2-lineage"
		id="<?php echo esc_attr( $instance_id ); ?>"
		data-mx2-lineage-slider
		data-autoplay="<?php echo esc_attr( $autoplay ); ?>"
		data-interval="<?php echo esc_attr( $interval ); ?>"
		style="--mx2-lineage-height: <?php echo $height; ?>;"
		aria-label="MEDICI + MAESTRO lineage slider"
	>
		<div class="mx2-lineage__fs-cluster">
			<button class="mx2-lineage__fs-btn" data-mx2-lineage-fullscreen aria-label="Toggle fullscreen" title="Fullscreen (F)">
				<svg class="mx2-lineage__ico-enter" viewBox="0 0 16 16" aria-hidden="true"><path d="M2 6V2h4M14 6V2h-4M2 10v4h4M14 10v4h-4"/></svg>
				<svg class="mx2-lineage__ico-exit" viewBox="0 0 16 16" aria-hidden="true"><path d="M6 2v4H2M10 2v4h4M6 14v-4H2M10 14v-4h4"/></svg>
			</button>
		</div>

		<div class="mx2-lineage__topbar">
			<div class="mx2-lineage__eyebrow">Six Centuries Of Taste</div>
			<div class="mx2-lineage__title-row">
				<span class="mx2-lineage__ornament">+</span>
				<span class="mx2-lineage__rule"></span>
				<span class="mx2-lineage__h2">The <em>Lineage</em></span>
				<span class="mx2-lineage__rule"></span>
				<span class="mx2-lineage__ornament">+</span>
			</div>
			<div class="mx2-lineage__eyebrow">Medici &rarr; Salamone</div>
		</div>

		<span class="mx2-lineage__corner mx2-lineage__corner--tl"></span>
		<span class="mx2-lineage__corner mx2-lineage__corner--tr"></span>
		<span class="mx2-lineage__corner mx2-lineage__corner--bl"></span>
		<span class="mx2-lineage__corner mx2-lineage__corner--br"></span>

		<div class="mx2-lineage__slides" data-mx2-lineage-slides>
			<?php // Cover slide (Figure 0) — rendered statically; figure slides are appended by JS. ?>
			<div class="mx2-lineage__slide mx2-lineage__slide--cover is-active" data-mx2-lineage-cover>
				<div class="mx2-lineage__cover-frieze mx2-lineage__cover-frieze--left">
					<div class="mx2-lineage__frieze-track" data-mx2-lineage-frieze-left></div>
				</div>
				<div class="mx2-lineage__cover-frieze mx2-lineage__cover-frieze--right">
					<div class="mx2-lineage__frieze-track" data-mx2-lineage-frieze-right></div>
				</div>
				<div class="mx2-lineage__cover-layout">
					<div class="mx2-lineage__cover-mark">
						<img src="<?php echo esc_url( MX2_LINEAGE_SLIDER_URL . 'assets/images/cover-mark.png?ver=' . MX2_LINEAGE_SLIDER_VERSION ); ?>" alt="Mx2" loading="eager" />
					</div>
					<div class="mx2-lineage__cover-eyebrow">Before the Work</div>
					<h2 class="mx2-lineage__cover-title">The <em>Bloodline</em></h2>
					<div class="mx2-lineage__cover-tag">Not a brand story. A lineage.</div>
					<div class="mx2-lineage__cover-rule"></div>
					<div class="mx2-lineage__cover-route">
						<span>Florence</span><span class="mx2-lineage__cover-arrow">&rarr;</span>
						<span>Rome</span><span class="mx2-lineage__cover-arrow">&rarr;</span>
						<span>San Lupo</span><span class="mx2-lineage__cover-arrow">&rarr;</span>
						<span>America</span>
					</div>
					<div class="mx2-lineage__cover-stats">
						<div class="mx2-lineage__cover-stat"><div class="mx2-lineage__cover-num">22</div><div class="mx2-lineage__cover-lbl">Names</div></div>
						<div class="mx2-lineage__cover-stat"><div class="mx2-lineage__cover-num">5</div><div class="mx2-lineage__cover-lbl">Centuries</div></div>
						<div class="mx2-lineage__cover-stat"><div class="mx2-lineage__cover-num">1</div><div class="mx2-lineage__cover-lbl">Unbroken Line</div></div>
					</div>
					<div class="mx2-lineage__cover-quote">&ldquo;You don&rsquo;t build a brand. You inherit a standard.&rdquo;</div>
				</div>
			</div>
		</div>

		<div class="mx2-lineage__controls">
			<div class="mx2-lineage__progress">
				<span class="mx2-lineage__count">
					<span data-mx2-lineage-cur>00</span><em>/</em><span data-mx2-lineage-tot>22</span>
				</span>
				<div class="mx2-lineage__ticks" data-mx2-lineage-ticks></div>
				<span class="mx2-lineage__scrub-meta">
					<span class="mx2-lineage__scrub-gold" data-mx2-lineage-year>&mdash;</span>
					&middot;
					<span data-mx2-lineage-gen>before the work</span>
				</span>
			</div>
		</div>

		<?php // Nav arrows are siblings of .controls so they can be repositioned at the slider's left/right edges on mobile. ?>
		<button class="mx2-lineage__arrow mx2-lineage__arrow--prev" data-mx2-lineage-prev aria-label="Previous">&lsaquo;</button>
		<button class="mx2-lineage__arrow mx2-lineage__arrow--next" data-mx2-lineage-next aria-label="Next">&rsaquo;</button>
	</section>
	<?php
	return ob_get_clean();
}
add_shortcode( 'mx2_lineage_slider', 'mx2_lineage_slider_shortcode' );
