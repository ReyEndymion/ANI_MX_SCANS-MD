import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
let handler = async (m, {conn, text, usedPrefix, command, db, userdb, senderJid}) => {
if (/^(phmaker|phmarker|phmarke|phmake)list$/i.test(command)) {
let resp = `*[❗INFO❗] COMO USAR ESTE COMANDO:*
—◉ ${usedPrefix + command.replace(/list$/, '')} (opcion) <responder / etiquetar a una imagen>

*EJEMPLO:*
—◉ ${usedPrefix + command.replace(/list$/, '')} artist_in_the_dark <responder / etiquetar a una imagen>

*< LISTA DE OPCIONES />*
° ඬ⃟💫 ${usedPrefix + command} 2colors-canvas
° ඬ⃟💫 ${usedPrefix + command} 3d-wall
° ඬ⃟💫 ${usedPrefix + command} 100_dollars
° ඬ⃟💫 ${usedPrefix + command} abstract-rays
° ඬ⃟💫 ${usedPrefix + command} airbrush
° ඬ⃟💫 ${usedPrefix + command} angry_granny
° ඬ⃟💫 ${usedPrefix + command} apples
° ඬ⃟💫 ${usedPrefix + command} applying_makeup
° ඬ⃟💫 ${usedPrefix + command} aqua
° ඬ⃟💫 ${usedPrefix + command} art-admirer
° ඬ⃟💫 ${usedPrefix + command} art-experts
° ඬ⃟💫 ${usedPrefix + command} artist
° ඬ⃟💫 ${usedPrefix + command} artistic-filter
° ඬ⃟💫 ${usedPrefix + command} artist_in_the_dark
° ඬ⃟💫 ${usedPrefix + command} art_exhibition
° ඬ⃟💫 ${usedPrefix + command} art_gallery
° ඬ⃟💫 ${usedPrefix + command} art_painting
° ඬ⃟💫 ${usedPrefix + command} aruga
° ඬ⃟💫 ${usedPrefix + command} at-the-beach
° ඬ⃟💫 ${usedPrefix + command} at-the-gallery
° ඬ⃟💫 ${usedPrefix + command} aurora
° ඬ⃟💫 ${usedPrefix + command} auto-enhance
° ඬ⃟💫 ${usedPrefix + command} autumn-frame
° ඬ⃟💫 ${usedPrefix + command} ax
° ඬ⃟💫 ${usedPrefix + command} bad_santa
° ඬ⃟💫 ${usedPrefix + command} bathe
° ඬ⃟💫 ${usedPrefix + command} beauty-boost
° ඬ⃟💫 ${usedPrefix + command} behind_the_fence
° ඬ⃟💫 ${usedPrefix + command} bicycle
° ඬ⃟💫 ${usedPrefix + command} biker
° ඬ⃟💫 ${usedPrefix + command} billboard
° ඬ⃟💫 ${usedPrefix + command} billboard_workers
° ඬ⃟💫 ${usedPrefix + command} black-and-white-mural
° ඬ⃟💫 ${usedPrefix + command} black-mamba
° ඬ⃟💫 ${usedPrefix + command} black-pen
° ඬ⃟💫 ${usedPrefix + command} black-pencils
° ඬ⃟💫 ${usedPrefix + command} blueprint
° ඬ⃟💫 ${usedPrefix + command} boardings
° ඬ⃟💫 ${usedPrefix + command} bodybuilder
° ඬ⃟💫 ${usedPrefix + command} brass-frame
° ඬ⃟💫 ${usedPrefix + command} bricks
° ඬ⃟💫 ${usedPrefix + command} bride
° ඬ⃟💫 ${usedPrefix + command} bride_in_grass
° ඬ⃟💫 ${usedPrefix + command} broadway
° ඬ⃟💫 ${usedPrefix + command} brugge
° ඬ⃟💫 ${usedPrefix + command} brush-strokes
° ඬ⃟💫 ${usedPrefix + command} bubbles
° ඬ⃟💫 ${usedPrefix + command} building_painters
° ඬ⃟💫 ${usedPrefix + command} bunnies
° ඬ⃟💫 ${usedPrefix + command} bunny_ears
° ඬ⃟💫 ${usedPrefix + command} burned-bread
° ඬ⃟💫 ${usedPrefix + command} burning-fire
° ඬ⃟💫 ${usedPrefix + command} cafe
° ඬ⃟💫 ${usedPrefix + command} canvas
° ඬ⃟💫 ${usedPrefix + command} cappuccino
° ඬ⃟💫 ${usedPrefix + command} captivity
° ඬ⃟💫 ${usedPrefix + command} card-with-flowers
° ඬ⃟💫 ${usedPrefix + command} cartoon
° ඬ⃟💫 ${usedPrefix + command} cartoonizer
° ඬ⃟💫 ${usedPrefix + command} castle
° ඬ⃟💫 ${usedPrefix + command} champagne
° ඬ⃟💫 ${usedPrefix + command} che-guevara
° ඬ⃟💫 ${usedPrefix + command} chinese_opera
° ඬ⃟💫 ${usedPrefix + command} christmass_tree_balls
° ඬ⃟💫 ${usedPrefix + command} chris_pirillo
° ඬ⃟💫 ${usedPrefix + command} cinema
° ඬ⃟💫 ${usedPrefix + command} circle-of-colors
° ඬ⃟💫 ${usedPrefix + command} city-billboard
° ඬ⃟💫 ${usedPrefix + command} city
° ඬ⃟💫 ${usedPrefix + command} citylight
° ඬ⃟💫 ${usedPrefix + command} clasiketch
° ඬ⃟💫 ${usedPrefix + command} classic-art
° ඬ⃟💫 ${usedPrefix + command} coal-sketch
° ඬ⃟💫 ${usedPrefix + command} coffee_break
° ඬ⃟💫 ${usedPrefix + command} color-checkers
° ඬ⃟💫 ${usedPrefix + command} colored-pencils
° ඬ⃟💫 ${usedPrefix + command} colored-pens
° ඬ⃟💫 ${usedPrefix + command} colored-sketch
° ඬ⃟💫 ${usedPrefix + command} colored-squares
° ඬ⃟💫 ${usedPrefix + command} colored-texture
° ඬ⃟💫 ${usedPrefix + command} colorful-tiles
° ඬ⃟💫 ${usedPrefix + command} colorful-wood
° ඬ⃟💫 ${usedPrefix + command} coloring-book
° ඬ⃟💫 ${usedPrefix + command} coloured-pencils
° ඬ⃟💫 ${usedPrefix + command} comic-book
° ඬ⃟💫 ${usedPrefix + command} comics!-boom
° ඬ⃟💫 ${usedPrefix + command} concrete-jungle
° ඬ⃟💫 ${usedPrefix + command} cotton-candy
° ඬ⃟💫 ${usedPrefix + command} crayola
° ඬ⃟💫 ${usedPrefix + command} crooked_gambler
° ඬ⃟💫 ${usedPrefix + command} crown
° ඬ⃟💫 ${usedPrefix + command} cupid
° ඬ⃟💫 ${usedPrefix + command} cutout
° ඬ⃟💫 ${usedPrefix + command} death_proof
° ඬ⃟💫 ${usedPrefix + command} deep-blue
° ඬ⃟💫 ${usedPrefix + command} dj
° ඬ⃟💫 ${usedPrefix + command} dollar
° ඬ⃟💫 ${usedPrefix + command} doodle-sketch
° ඬ⃟💫 ${usedPrefix + command} dots
° ඬ⃟💫 ${usedPrefix + command} draft
° ඬ⃟💫 ${usedPrefix + command} drawing-photo
° ඬ⃟💫 ${usedPrefix + command} drawing
° ඬ⃟💫 ${usedPrefix + command} drawing_near_the_sea
° ඬ⃟💫 ${usedPrefix + command} dreamy-sky
° ඬ⃟💫 ${usedPrefix + command} drizzle
° ඬ⃟💫 ${usedPrefix + command} drops
° ඬ⃟💫 ${usedPrefix + command} easter-flowers
° ඬ⃟💫 ${usedPrefix + command} easter-frame
° ඬ⃟💫 ${usedPrefix + command} easter
° ඬ⃟💫 ${usedPrefix + command} equestrienne
° ඬ⃟💫 ${usedPrefix + command} esquire
° ඬ⃟💫 ${usedPrefix + command} ethanol
° ඬ⃟💫 ${usedPrefix + command} etude
° ඬ⃟💫 ${usedPrefix + command} evening-billboard
° ඬ⃟💫 ${usedPrefix + command} explorer-drawing
° ඬ⃟💫 ${usedPrefix + command} eye
° ඬ⃟💫 ${usedPrefix + command} family_in_museum
° ඬ⃟💫 ${usedPrefix + command} famous-gallery
° ඬ⃟💫 ${usedPrefix + command} female_gambler
° ඬ⃟💫 ${usedPrefix + command} female_soldier
° ඬ⃟💫 ${usedPrefix + command} film-strip
° ඬ⃟💫 ${usedPrefix + command} film_scan
° ඬ⃟💫 ${usedPrefix + command} fire
° ඬ⃟💫 ${usedPrefix + command} fireplace
° ඬ⃟💫 ${usedPrefix + command} flood
° ඬ⃟💫 ${usedPrefix + command} flower_frame
° ඬ⃟💫 ${usedPrefix + command} football-field
° ඬ⃟💫 ${usedPrefix + command} frame
° ඬ⃟💫 ${usedPrefix + command} frame_and_roses
° ඬ⃟💫 ${usedPrefix + command} frankenstein-monster
° ඬ⃟💫 ${usedPrefix + command} frosty_window
° ඬ⃟💫 ${usedPrefix + command} galatea
° ඬ⃟💫 ${usedPrefix + command} galaxy
° ඬ⃟💫 ${usedPrefix + command} galeries_lafayette
° ඬ⃟💫 ${usedPrefix + command} gallery-visitor
° ඬ⃟💫 ${usedPrefix + command} gas_mask_freaks
° ඬ⃟💫 ${usedPrefix + command} gentle-painting
° ඬ⃟💫 ${usedPrefix + command} ghostwood
° ඬ⃟💫 ${usedPrefix + command} giant-artwork
° ඬ⃟💫 ${usedPrefix + command} girl-with-bicycle
° ඬ⃟💫 ${usedPrefix + command} girls_with_poster
° ඬ⃟💫 ${usedPrefix + command} glamour
° ඬ⃟💫 ${usedPrefix + command} glass
° ඬ⃟💫 ${usedPrefix + command} glossy-cartoon
° ඬ⃟💫 ${usedPrefix + command} glowing-circles
° ඬ⃟💫 ${usedPrefix + command} goalkeeper
° ඬ⃟💫 ${usedPrefix + command} goats
° ඬ⃟💫 ${usedPrefix + command} godfather
° ඬ⃟💫 ${usedPrefix + command} golden-brown
° ඬ⃟💫 ${usedPrefix + command} golden_valentine
° ඬ⃟💫 ${usedPrefix + command} good_luck_chuck
° ඬ⃟💫 ${usedPrefix + command} graffiti
° ඬ⃟💫 ${usedPrefix + command} graffiti_artist
° ඬ⃟💫 ${usedPrefix + command} graffiti_billboard
° ඬ⃟💫 ${usedPrefix + command} graffiti_wall
° ඬ⃟💫 ${usedPrefix + command} greenwich
° ඬ⃟💫 ${usedPrefix + command} halloween-pumpkins
° ඬ⃟💫 ${usedPrefix + command} halo
° ඬ⃟💫 ${usedPrefix + command} hammock
° ඬ⃟💫 ${usedPrefix + command} harley-davidson
° ඬ⃟💫 ${usedPrefix + command} heart_locket
° ඬ⃟💫 ${usedPrefix + command} hockey
° ඬ⃟💫 ${usedPrefix + command} hockey_team
° ඬ⃟💫 ${usedPrefix + command} huge_billboard
° ඬ⃟💫 ${usedPrefix + command} icecream
° ඬ⃟💫 ${usedPrefix + command} impressionists
° ඬ⃟💫 ${usedPrefix + command} in-the-cinema
° ඬ⃟💫 ${usedPrefix + command} in-the-woods
° ඬ⃟💫 ${usedPrefix + command} indian_beauty
° ඬ⃟💫 ${usedPrefix + command} ink-pen
° ඬ⃟💫 ${usedPrefix + command} ink-portrait
° ඬ⃟💫 ${usedPrefix + command} ink-wash
° ඬ⃟💫 ${usedPrefix + command} jigsaw_puzzle
° ඬ⃟💫 ${usedPrefix + command} juice
° ඬ⃟💫 ${usedPrefix + command} kitty-and-frame
° ඬ⃟💫 ${usedPrefix + command} kitty
° ඬ⃟💫 ${usedPrefix + command} knight-with-sword
° ඬ⃟💫 ${usedPrefix + command} knight
° ඬ⃟💫 ${usedPrefix + command} lake
° ඬ⃟💫 ${usedPrefix + command} large_painting
° ඬ⃟💫 ${usedPrefix + command} last_advert
° ඬ⃟💫 ${usedPrefix + command} late_autumn
° ඬ⃟💫 ${usedPrefix + command} latte-art
° ඬ⃟💫 ${usedPrefix + command} lavander
° ඬ⃟💫 ${usedPrefix + command} leftfield
° ඬ⃟💫 ${usedPrefix + command} lego
° ඬ⃟💫 ${usedPrefix + command} lego_portrait
° ඬ⃟💫 ${usedPrefix + command} lemon-tree
° ඬ⃟💫 ${usedPrefix + command} lenin
° ඬ⃟💫 ${usedPrefix + command} library
° ඬ⃟💫 ${usedPrefix + command} local_shop
° ඬ⃟💫 ${usedPrefix + command} london_calling
° ඬ⃟💫 ${usedPrefix + command} louvre
° ඬ⃟💫 ${usedPrefix + command} love-letter
° ඬ⃟💫 ${usedPrefix + command} mac-solarize
° ඬ⃟💫 ${usedPrefix + command} madonna
° ඬ⃟💫 ${usedPrefix + command} magazine-comics
° ඬ⃟💫 ${usedPrefix + command} magic-stars
° ඬ⃟💫 ${usedPrefix + command} magnetic-sketchpad
° ඬ⃟💫 ${usedPrefix + command} male_gambler
° ඬ⃟💫 ${usedPrefix + command} marilyn_autograph
° ඬ⃟💫 ${usedPrefix + command} marilyn_monroe
° ඬ⃟💫 ${usedPrefix + command} master-sketch
° ඬ⃟💫 ${usedPrefix + command} medieval_art
° ඬ⃟💫 ${usedPrefix + command} melbourne-gallery
° ඬ⃟💫 ${usedPrefix + command} memories
° ඬ⃟💫 ${usedPrefix + command} mermaid
° ඬ⃟💫 ${usedPrefix + command} metalic-grain
° ඬ⃟💫 ${usedPrefix + command} midnight_billboard
° ඬ⃟💫 ${usedPrefix + command} mini_cooper
° ඬ⃟💫 ${usedPrefix + command} mint_frame
° ඬ⃟💫 ${usedPrefix + command} mirror
° ඬ⃟💫 ${usedPrefix + command} modern_art_exhibition
° ඬ⃟💫 ${usedPrefix + command} moist
° ඬ⃟💫 ${usedPrefix + command} mona_lisa
° ඬ⃟💫 ${usedPrefix + command} mosaic-sketch
° ඬ⃟💫 ${usedPrefix + command} mount_rushmore
° ඬ⃟💫 ${usedPrefix + command} museum
° ඬ⃟💫 ${usedPrefix + command} museum_kid
° ඬ⃟💫 ${usedPrefix + command} mysterious_painting
° ඬ⃟💫 ${usedPrefix + command} napkine
° ඬ⃟💫 ${usedPrefix + command} national-gallery-in-london
° ඬ⃟💫 ${usedPrefix + command} negative-smoke
° ඬ⃟💫 ${usedPrefix + command} new-year-frames
° ඬ⃟💫 ${usedPrefix + command} new-york-street
° ඬ⃟💫 ${usedPrefix + command} newspaper
° ඬ⃟💫 ${usedPrefix + command} new_york
° ඬ⃟💫 ${usedPrefix + command} night
° ඬ⃟💫 ${usedPrefix + command} night_city
° ඬ⃟💫 ${usedPrefix + command} night_ride
° ඬ⃟💫 ${usedPrefix + command} night_street
° ඬ⃟💫 ${usedPrefix + command} night_walk
° ඬ⃟💫 ${usedPrefix + command} nostalgic-frame
° ඬ⃟💫 ${usedPrefix + command} notebook
° ඬ⃟💫 ${usedPrefix + command} nyc
° ඬ⃟💫 ${usedPrefix + command} ny_taxis
° ඬ⃟💫 ${usedPrefix + command} obama
° ඬ⃟💫 ${usedPrefix + command} ocean
° ඬ⃟💫 ${usedPrefix + command} odessa_opera_house
° ඬ⃟💫 ${usedPrefix + command} oil_painting
° ඬ⃟💫 ${usedPrefix + command} old-camera
° ඬ⃟💫 ${usedPrefix + command} old-dream
° ඬ⃟💫 ${usedPrefix + command} old-letter
° ඬ⃟💫 ${usedPrefix + command} old-photo
° ඬ⃟💫 ${usedPrefix + command} old-screen
° ඬ⃟💫 ${usedPrefix + command} old_book
° ඬ⃟💫 ${usedPrefix + command} on_the_moon
° ඬ⃟💫 ${usedPrefix + command} on_the_mountain
° ඬ⃟💫 ${usedPrefix + command} ophelia
° ඬ⃟💫 ${usedPrefix + command} orion
° ඬ⃟💫 ${usedPrefix + command} ornament
° ඬ⃟💫 ${usedPrefix + command} osaka
° ඬ⃟💫 ${usedPrefix + command} oxford
° ඬ⃟💫 ${usedPrefix + command} paint-brush
° ඬ⃟💫 ${usedPrefix + command} painter_at_work
° ඬ⃟💫 ${usedPrefix + command} painting-and-sketches
° ඬ⃟💫 ${usedPrefix + command} paints-crafts
° ඬ⃟💫 ${usedPrefix + command} paintwash
° ඬ⃟💫 ${usedPrefix + command} parchment
° ඬ⃟💫 ${usedPrefix + command} paris_hilton
° ඬ⃟💫 ${usedPrefix + command} passage
° ඬ⃟💫 ${usedPrefix + command} passing-by-the-painting
° ඬ⃟💫 ${usedPrefix + command} pastel
° ඬ⃟💫 ${usedPrefix + command} pavement_art
° ඬ⃟💫 ${usedPrefix + command} pavement_artist
° ඬ⃟💫 ${usedPrefix + command} pavement_drawing
° ඬ⃟💫 ${usedPrefix + command} pedestrian-crossing
° ඬ⃟💫 ${usedPrefix + command} peeling
° ඬ⃟💫 ${usedPrefix + command} pencil-sketch
° ඬ⃟💫 ${usedPrefix + command} pencils-canvas
° ඬ⃟💫 ${usedPrefix + command} perfume_shop
° ඬ⃟💫 ${usedPrefix + command} picadilly_circus
° ඬ⃟💫 ${usedPrefix + command} piccadilly-arcade
° ඬ⃟💫 ${usedPrefix + command} pictures_sale
° ඬ⃟💫 ${usedPrefix + command} picture_at_the_gallery
° ඬ⃟💫 ${usedPrefix + command} pilot
° ඬ⃟💫 ${usedPrefix + command} pink-panther
° ඬ⃟💫 ${usedPrefix + command} pinkify
° ඬ⃟💫 ${usedPrefix + command} pisa_street
° ඬ⃟💫 ${usedPrefix + command} playful-cat
° ඬ⃟💫 ${usedPrefix + command} polaroid_dress
° ඬ⃟💫 ${usedPrefix + command} portrait
° ඬ⃟💫 ${usedPrefix + command} portrait_on_the_wall
° ඬ⃟💫 ${usedPrefix + command} posterize
° ඬ⃟💫 ${usedPrefix + command} posters
° ඬ⃟💫 ${usedPrefix + command} press-comics
° ඬ⃟💫 ${usedPrefix + command} press_conference
° ඬ⃟💫 ${usedPrefix + command} prince_of_wales_theatre
° ඬ⃟💫 ${usedPrefix + command} pumpkins
° ඬ⃟💫 ${usedPrefix + command} puppy-with-frame
° ඬ⃟💫 ${usedPrefix + command} purple-haze
° ඬ⃟💫 ${usedPrefix + command} purple_sky
° ඬ⃟💫 ${usedPrefix + command} putin
° ඬ⃟💫 ${usedPrefix + command} puzzle
° ඬ⃟💫 ${usedPrefix + command} rainbow
° ඬ⃟💫 ${usedPrefix + command} rainwater
° ඬ⃟💫 ${usedPrefix + command} rainy-night
° ඬ⃟💫 ${usedPrefix + command} rainy_day
° ඬ⃟💫 ${usedPrefix + command} reconstruction
° ඬ⃟💫 ${usedPrefix + command} red-and-blue
° ඬ⃟💫 ${usedPrefix + command} red-lights
° ඬ⃟💫 ${usedPrefix + command} red-wine
° ඬ⃟💫 ${usedPrefix + command} reflection
° ඬ⃟💫 ${usedPrefix + command} replacing_billboard_advert
° ඬ⃟💫 ${usedPrefix + command} reproduction
° ඬ⃟💫 ${usedPrefix + command} retail_park
° ඬ⃟💫 ${usedPrefix + command} retro-black
° ඬ⃟💫 ${usedPrefix + command} retro-comic
° ඬ⃟💫 ${usedPrefix + command} rinse
° ඬ⃟💫 ${usedPrefix + command} riverside_billboard
° ඬ⃟💫 ${usedPrefix + command} romantic_etude
° ඬ⃟💫 ${usedPrefix + command} roses-and-marshmallows
° ඬ⃟💫 ${usedPrefix + command} roses
° ඬ⃟💫 ${usedPrefix + command} scratched-photo
° ඬ⃟💫 ${usedPrefix + command} scribble
° ඬ⃟💫 ${usedPrefix + command} scroll
° ඬ⃟💫 ${usedPrefix + command} sharp-paint
° ඬ⃟💫 ${usedPrefix + command} shine-stripes
° ඬ⃟💫 ${usedPrefix + command} shiny-color
° ඬ⃟💫 ${usedPrefix + command} shooting-stars
° ඬ⃟💫 ${usedPrefix + command} shopping-arcade
° ඬ⃟💫 ${usedPrefix + command} shopping_center
° ඬ⃟💫 ${usedPrefix + command} shop_poster
° ඬ⃟💫 ${usedPrefix + command} sidewalk
° ඬ⃟💫 ${usedPrefix + command} singer
° ඬ⃟💫 ${usedPrefix + command} sip
° ඬ⃟💫 ${usedPrefix + command} sketch-practicing
° ඬ⃟💫 ${usedPrefix + command} skydiver
° ඬ⃟💫 ${usedPrefix + command} snowboard
° ඬ⃟💫 ${usedPrefix + command} snow_in_london
° ඬ⃟💫 ${usedPrefix + command} soak
° ඬ⃟💫 ${usedPrefix + command} soda
° ඬ⃟💫 ${usedPrefix + command} solarization
° ඬ⃟💫 ${usedPrefix + command} soppy
° ඬ⃟💫 ${usedPrefix + command} sparklers
° ඬ⃟💫 ${usedPrefix + command} sparkles
° ඬ⃟💫 ${usedPrefix + command} sparkling-snow
° ඬ⃟💫 ${usedPrefix + command} special_billboard
° ඬ⃟💫 ${usedPrefix + command} sphinx
° ඬ⃟💫 ${usedPrefix + command} spray
° ඬ⃟💫 ${usedPrefix + command} spring-flowers
° ඬ⃟💫 ${usedPrefix + command} spring_memories
° ඬ⃟💫 ${usedPrefix + command} stacco
° ඬ⃟💫 ${usedPrefix + command} stadium
° ඬ⃟💫 ${usedPrefix + command} stardust
° ඬ⃟💫 ${usedPrefix + command} stars
° ඬ⃟💫 ${usedPrefix + command} static-noise
° ඬ⃟💫 ${usedPrefix + command} stencil
° ඬ⃟💫 ${usedPrefix + command} stone-age
° ඬ⃟💫 ${usedPrefix + command} street_artist
° ඬ⃟💫 ${usedPrefix + command} street_exhibition
° ඬ⃟💫 ${usedPrefix + command} striped-jeans
° ඬ⃟💫 ${usedPrefix + command} summer-dust
° ඬ⃟💫 ${usedPrefix + command} summoning-spirits
° ඬ⃟💫 ${usedPrefix + command} sunburst
° ඬ⃟💫 ${usedPrefix + command} sunray
° ඬ⃟💫 ${usedPrefix + command} superman
° ඬ⃟💫 ${usedPrefix + command} supernova
° ඬ⃟💫 ${usedPrefix + command} surfer
° ඬ⃟💫 ${usedPrefix + command} swedish_billboard
° ඬ⃟💫 ${usedPrefix + command} tablet
° ඬ⃟💫 ${usedPrefix + command} taipei
° ඬ⃟💫 ${usedPrefix + command} the-frame
° ඬ⃟💫 ${usedPrefix + command} the_gun
° ඬ⃟💫 ${usedPrefix + command} the_kiss
° ඬ⃟💫 ${usedPrefix + command} tintbrush
° ඬ⃟💫 ${usedPrefix + command} tokyo-crossing
° ඬ⃟💫 ${usedPrefix + command} toonic
° ඬ⃟💫 ${usedPrefix + command} torn_billboard
° ඬ⃟💫 ${usedPrefix + command} traffic-lights
° ඬ⃟💫 ${usedPrefix + command} train-station-poster
° ඬ⃟💫 ${usedPrefix + command} train_station
° ඬ⃟💫 ${usedPrefix + command} tram
° ඬ⃟💫 ${usedPrefix + command} travellers-sketch
° ඬ⃟💫 ${usedPrefix + command} triangular
° ඬ⃟💫 ${usedPrefix + command} truck-advert
° ඬ⃟💫 ${usedPrefix + command} truck
° ඬ⃟💫 ${usedPrefix + command} tub
° ඬ⃟💫 ${usedPrefix + command} tulips
° ඬ⃟💫 ${usedPrefix + command} tv_girl
° ඬ⃟💫 ${usedPrefix + command} twilight
° ඬ⃟💫 ${usedPrefix + command} two_cats
° ඬ⃟💫 ${usedPrefix + command} two_female_fans
° ඬ⃟💫 ${usedPrefix + command} ultra-paint
° ඬ⃟💫 ${usedPrefix + command} underground-poster
° ඬ⃟💫 ${usedPrefix + command} urban
° ඬ⃟💫 ${usedPrefix + command} urban_billboard
° ඬ⃟💫 ${usedPrefix + command} vhs
° ඬ⃟💫 ${usedPrefix + command} vibration
° ඬ⃟💫 ${usedPrefix + command} victoria_beckham
° ඬ⃟💫 ${usedPrefix + command} video-game
° ඬ⃟💫 ${usedPrefix + command} vintage-photos
° ඬ⃟💫 ${usedPrefix + command} vintage-scooter
° ඬ⃟💫 ${usedPrefix + command} vintage_frame
° ඬ⃟💫 ${usedPrefix + command} vintage_table
° ඬ⃟💫 ${usedPrefix + command} vitrage-window
° ඬ⃟💫 ${usedPrefix + command} vogue
° ඬ⃟💫 ${usedPrefix + command} wall-mural
° ඬ⃟💫 ${usedPrefix + command} wall-painting
° ඬ⃟💫 ${usedPrefix + command} wall-poster
° ඬ⃟💫 ${usedPrefix + command} wall
° ඬ⃟💫 ${usedPrefix + command} wall_banner
° ඬ⃟💫 ${usedPrefix + command} wall_painting
° ඬ⃟💫 ${usedPrefix + command} wanted_wizard
° ඬ⃟💫 ${usedPrefix + command} warhol-dots
° ඬ⃟💫 ${usedPrefix + command} warhol
° ඬ⃟💫 ${usedPrefix + command} warrior
° ඬ⃟💫 ${usedPrefix + command} watchinng
° ඬ⃟💫 ${usedPrefix + command} watercolor
° ඬ⃟💫 ${usedPrefix + command} watercolour-painting
° ඬ⃟💫 ${usedPrefix + command} watercolours
° ඬ⃟💫 ${usedPrefix + command} waterway
° ඬ⃟💫 ${usedPrefix + command} waves
° ඬ⃟💫 ${usedPrefix + command} wayback
° ඬ⃟💫 ${usedPrefix + command} weave
° ඬ⃟💫 ${usedPrefix + command} wedding-day
° ඬ⃟💫 ${usedPrefix + command} wet
° ඬ⃟💫 ${usedPrefix + command} wild-brush
° ඬ⃟💫 ${usedPrefix + command} wine-label
° ඬ⃟💫 ${usedPrefix + command} winter-princess
° ඬ⃟💫 ${usedPrefix + command} witch
° ඬ⃟💫 ${usedPrefix + command} woman_pilot
° ඬ⃟💫 ${usedPrefix + command} wood
° ඬ⃟💫 ${usedPrefix + command} worker-by-the-billboard
° ඬ⃟💫 ${usedPrefix + command} woven-sketch
° ඬ⃟💫 ${usedPrefix + command} xmas_tree
° ඬ⃟💫 ${usedPrefix + command} yellow_wall`.trim()
return conn.sendWritingText(m.chat, resp, userdb, m);
}
if (/^phmaker|phmarker|phmarke|phmake$/i.test(command)) {
let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!mime) return conn.sendWritingText(m.chat, `*[❗] RESPONDA / ETIQUETE A UNA IMAGEN*`, userdb, m)
if (!/image\/(jpe?g|png)/.test(mime)) return conn.sendWritingText(m.chat, `*[❗] EL TIPO DE ARCHIVO ${mime} NO ES CORRECTO, RECUERDE QUE DEBE SER IMAGEN, JPG, JPEG O PNG*`, m)
if (!text) {
let resp = `*[❗INFO❗] ¿COMO USAR ESTE COMANDO?*
—◉ #phmaker (opcion) <responder / etiquetar a una imagen>

*EJEMPLO:*
—◉ ${usedPrefix + command} artist_in_the_dark <responder / etiquetar a una imagen>
Consulte la lista de efectos disponibles con el comando *${usedPrefix + command}list*`.trim()  
if (!mime) return conn.sendWritingText(m.chat, resp, userdb, m)
} else {
await conn.sendWritingText(m.chat, `*[❗] REALIZANDO DISEÑO, AGUARDE UN MOMENTO...*`, m)
let img = await q.download?.()
let url = await uploadImage(img)
let images = `https://violetics.pw/api/photomaker/${encodeURIComponent(text)}?apikey=beta&image=${encodeURIComponent(url)}`
let caption = `*⎔┉━「 PHMAKER 」━┉⎔*
*💟 EFECTO:* ${text}\n\n[['💫 MAS OPCIONES 💫 usa el comando *${usedPrefix}phmakerlist*]]`.trim()
return conn.sendImageWriting(m.chat, images, caption, userdb, m)
}
}
}
handler.command = /^(phmaker|phmarker|phmarke|phmake)(list)?$/i
handler.help = [];
handler.tags = [];
handler.menu = [
{title: 'phmaker', description: 'Crea un diseño con el efecto seleccionado.', id: 'phmaker'},
{title: 'phmakerlist', description: 'Lista de efectos disponibles para PHMAKER.', id: 'phmakerlist'}
];
handler.type = "logosefectos";
handler.disabled = false;

export default handler
const isUrl = (text) => {
return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))}
