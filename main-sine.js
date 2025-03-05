window.addEventListener('load', init);

function init() {
    let freqSlider = document.getElementById('freqSlider');
    let btn = document.querySelector('button');
    btn.addEventListener('click', play);

    async function play() {
        let audioContext = new AudioContext();
        await audioContext.audioWorklet.addModule('sine-generator.js');

        let sineNode = new AudioWorkletNode(audioContext, 'sine-generator');

        sineNode.connect(audioContext.destination);

        freqSlider.removeAttribute('disabled');
        freqSlider.addEventListener('change', (e) => {
            let v = Number(e.target.value);
            sineNode.port.postMessage({ frequency: v });
        });
    }
}