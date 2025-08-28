<script type="module">
import * as Tone from "https://cdn.skypack.dev/tone";

// === ORION'S RANGI HIGH VOLTAGE SONIC ENGINE === //

// Base hum @ 432Hz (subtle cosmic drone)
const base = new Tone.Oscillator(432, "sine").toDestination();
base.volume.value = -20; 
base.start();

// === ENGINES === //

// Bass Engine: Kick/Sub tied to SSS
const bass = new Tone.MembraneSynth({
  pitchDecay: 0.05,
  octaves: 6,
  oscillator: { type: "sine" },
  envelope: { attack: 0.001, decay: 0.4, sustain: 0.01, release: 1.4 }
}).toDestination();

// Harmony Engine: Poly chords tied to HRI
const harmony = new Tone.PolySynth(Tone.Synth, {
  oscillator: { type: "triangle" },
  envelope: { attack: 0.02, decay: 0.1, sustain: 0.4, release: 1.2 }
}).toDestination();

// Spark Engine: Bright zap on price tick
const spark = new Tone.Synth({
  oscillator: { type: "square" },
  envelope: { attack: 0.001, decay: 0.2, sustain: 0, release: 0.1 }
}).toDestination();

// === MAP TO DATA === //

// Notes pool for harmony (C major cosmic scale)
const notes = ["C3", "E3", "G3", "B3", "C4", "E4", "G4"];

function playHRI(hriValue) {
  const index = Math.floor((hriValue / 100) * (notes.length - 1));
  const chord = [notes[index], notes[(index+2)%notes.length], notes[(index+4)%notes.length]];
  harmony.triggerAttackRelease(chord, "2n");
}

function playSSS(sssValue) {
  const freq = 40 + (sssValue / 100) * 100; 
  Tone.Transport.bpm.value = freq; 
  bass.triggerAttackRelease("C1", "8n");
}

function playSpark(priceChange) {
  if (priceChange > 0) spark.triggerAttackRelease("A5", "16n"); // bright up zap
  else spark.triggerAttackRelease("F2", "16n"); // deep down zap
}

// === MASTER TRIGGER === //
export function sonicUpdate(hri, sss, priceChange) {
  playHRI(hri);
  playSSS(sss);
  playSpark(priceChange);
}
</script>
