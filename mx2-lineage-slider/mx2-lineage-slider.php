<?php
/**
 * Plugin Name:       MX2 Lineage Slider
 * Plugin URI:        https://www.mx2.agency/
 * Description:       Renders the MEDICI + MAESTRO lineage slider via the [mx2_lineage_slider] shortcode. Drop the shortcode into any page or post.
 * Version:           1.0.0
 * Author:            Mx2 Global
 * License:           GPL-2.0-or-later
 * Text Domain:       mx2-lineage-slider
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'MX2_LINEAGE_SLIDER_VERSION', '1.0.0' );
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

		<div class="mx2-lineage__slides" data-mx2-lineage-slides></div>

		<div class="mx2-lineage__controls">
			<button class="mx2-lineage__arrow" data-mx2-lineage-prev aria-label="Previous">&lsaquo;</button>
			<div class="mx2-lineage__progress">
				<span class="mx2-lineage__count">
					<span data-mx2-lineage-cur>01</span><em>/</em><span data-mx2-lineage-tot>22</span>
				</span>
				<div class="mx2-lineage__ticks" data-mx2-lineage-ticks></div>
				<span class="mx2-lineage__scrub-meta">
					<span class="mx2-lineage__scrub-gold" data-mx2-lineage-year>1389</span>
					&middot;
					<span data-mx2-lineage-gen>19th great-grandfather</span>
				</span>
			</div>
			<button class="mx2-lineage__arrow" data-mx2-lineage-next aria-label="Next">&rsaquo;</button>
		</div>
	</section>
	<?php
	return ob_get_clean();
}
add_shortcode( 'mx2_lineage_slider', 'mx2_lineage_slider_shortcode' );
