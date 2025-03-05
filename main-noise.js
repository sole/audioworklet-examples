window.addEventListener('load', init);

function init() {
    let btn = document.querySelector('button');
    btn.addEventListener('click', playNoise);

    async function playNoise() {
        let audioContext = new AudioContext();
        await audioContext.audioWorklet.addModule('noise-generator.js');

        let noiseNode = new AudioWorkletNode(audioContext, 'noise-generator');
        noiseNode.connect(audioContext.destination);

    }
}